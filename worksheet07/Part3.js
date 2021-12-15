function init() {
    //Init the canvas
    canvas = document.getElementById("gl-canvas3");
    gl3 = WebGLUtils.setupWebGL(canvas);

    //Set the viewport
    gl3.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl3.clear(gl3.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl3, "vertex-shader-3", "fragment-shader-3");
    gl3.useProgram(program);

    //Enable a depth test
    gl3.enable(gl3.DEPTH_TEST);
    gl3.enable(gl3.CULL_FACE);//Enable back face culling, The initial value of glCullFace is GL_BACK.
    gl3.frontFace(gl3.CCW); // Passing GL_CCW to mode selects counterclockwise polygons as front-facing 

    //Approximation of a sphere by recursive subdivision algorithm
    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    function tetrahedron(a, b, c, d, n) {
        divideTriangle(a, b, c, n);
        divideTriangle(d, c, b, n);
        divideTriangle(a, d, b, n);
        divideTriangle(a, c, d, n);
    }

    function divideTriangle(a, b, c, count) {
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangle(a, ab, ac, count - 1);
            divideTriangle(ab, b, bc, count - 1);
            divideTriangle(bc, c, ac, count - 1);
            divideTriangle(ab, bc, ac, count - 1);
        } else {
            triangle(a, b, c);
        }
    }

    function triangle(a, b, c) {
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);

        normalsArray.push(vec4(a[0], a[1], a[2], 0.0));
        normalsArray.push(vec4(b[0], b[1], b[2], 0.0));
        normalsArray.push(vec4(c[0], c[1], c[2], 0.0));

        index += 3;
    }

    //Create sphere by using the division algorithm
    var numTimesToSubdivide = 5; //initial values
    var index = 0;
    var pointsArray = [];
    var normalsArray = [];
    gl3.p_buffer = null;
    gl3.n_buffer = null;

    var quadvertices = [vec4(-1.0, -1.0, 0.999, 1), vec4(1, -1, 0.999, 1), vec4(-1, 1, 0.999, 1), vec4(1, 1, 0.999, 1)];
    function drawquad() {
        pointsArray.push(quadvertices[0], quadvertices[1], quadvertices[3],
            quadvertices[3], quadvertices[2], quadvertices[0]);
        normalsArray.push(quadvertices[0], quadvertices[1], quadvertices[3],
            quadvertices[3], quadvertices[2], quadvertices[0]);
        index += 6;
    }

    function createSphere() {

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);
        drawquad();
        //Buffer Creation For Vertices
        gl3.deleteBuffer(gl3.p_buffer);
        gl3.p_buffer = gl3.createBuffer();
        gl3.bindBuffer(gl3.ARRAY_BUFFER, gl3.p_buffer);
        gl3.bufferData(gl3.ARRAY_BUFFER, flatten(pointsArray), gl3.STATIC_DRAW);

        var a_Position = gl3.getAttribLocation(program, "a_Position");
        gl3.vertexAttribPointer(a_Position, 4, gl3.FLOAT, false, 0, 0);
        gl3.enableVertexAttribArray(a_Position);

        gl3.deleteBuffer(gl3.n_buffer);

        gl3.n_buffer = gl3.createBuffer();
        gl3.bindBuffer(gl3.ARRAY_BUFFER, gl3.n_buffer);
        gl3.bufferData(gl3.ARRAY_BUFFER, flatten(normalsArray), gl3.STATIC_DRAW);

        var a_Normal = gl3.getAttribLocation(program, "a_Normal");
        gl3.vertexAttribPointer(a_Normal, 4, gl3.FLOAT, false, 0, 0);
        gl3.enableVertexAttribArray(a_Normal);
    }

    createSphere();//first call

    //projectMatrix & modelViewMatrixLoc
    var fovy = 60.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 100.0;
    const up = vec3(0.0, 1.0, 0.0);
    var at = vec3(0.0, 0.0, 0.0);
    var eye = vec3(0.0, 0.0, 4.9);//is in one-point (front) perspective

    var projectMatrix = gl3.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl3.getUniformLocation(program, "modelViewMatrix");
    var texMatrix = gl3.getUniformLocation(program, 'texMatrix');
    var reflective = gl3.getUniformLocation(program, 'reflective');
    var eye_Position = gl3.getUniformLocation(program, 'eye_Position');
    
    var cubeMap = gl3.createTexture();
    gl3.bindTexture(gl3.TEXTURE_CUBE_MAP, cubeMap);
    gl3.uniform1i(gl3.getUniformLocation(program, "texMap"), 0);

    var cubefiles = ['textures/cm_left.png', // POSITIVE_X
        'textures/cm_right.png', // NEGATIVE_X
        'textures/cm_top.png', // POSITIVE_Y
        'textures/cm_bottom.png', // NEGATIVE_Y
        'textures/cm_back.png', // POSITIVE_Z
        'textures/cm_front.png']; // NEGATIVE_Z

    var j = 0;
    for (var i = 0; i < cubefiles.length; i++) {
        var image = document.createElement('img');
        image.crossorigin = 'anonymous';
        image.onload = function (event) {
            var image = event.target;
            gl3.texImage2D(image.texturetarget, 0, gl3.RGB, gl3.RGB, gl3.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl3.TEXTURE_CUBE_MAP_POSITIVE_X + i;
    }
    gl3.pixelStorei(gl3.UNPACK_FLIP_Y_WEBGL, true);
    gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);
    gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);

    var rotateAroundOrbit = true;
    var theta = 0;

    function render() {
        if (rotateAroundOrbit)
            theta += 0.01;

        eye = vec3(5.0 * Math.sin(theta), 2.0, 5.0 * Math.cos(theta));
        gl3.uniform3fv(eye_Position, flatten(eye));
        modelViewMatrix = lookAt(eye, at, up);
        gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl3.clear(gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);

        //Sphere
        gl3.uniform1i(reflective, true);
        gl3.uniformMatrix4fv(texMatrix, gl3.FALSE, flatten(mat4()));
        gl3.drawArrays(gl3.TRIANGLES, 0, index - 6);// we need to substract 6 for the vertices added for the quad

        //Quad
        var projMatrixInversed = inverse(pj);//the inverse of the projection matrix to go from clip coordinates to camera coordinates
        var modelViewMatrixInversed = inverse(modelViewMatrix);//the inverse of the rotational part of the view matrix (no translation) to get direction vectors in world coordinates
        var finalTex = mult(modelViewMatrixInversed, projMatrixInversed);
        gl3.uniform1i(reflective, false);
        gl3.uniformMatrix4fv(texMatrix, gl3.FALSE, flatten(finalTex));
        gl3.drawArrays(gl3.TRIANGLES, index - 6, 6);

        window.requestAnimFrame(render);
    }
    render();//initial render call

    var increment = document.getElementById("incr_button2");
    var decrement = document.getElementById("decr_button2");
    var animation = document.getElementById("orbit_button2");

    increment.addEventListener("click", function () {
        if (numTimesToSubdivide < 5) {
            index = 0;//reset index
            pointsArray = [];//reset points array 
            normalsArray = [];//reset normals vector
            numTimesToSubdivide++;

            createSphere()//sphere recreation
            //render();//sphere redraw
        }
    });

    decrement.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            index = 0;//reset index
            pointsArray = [];//reset points array 
            normalsArray = [];//reset normals vector
            numTimesToSubdivide--;
            createSphere()//sphere recreation
            //render();//sphere redraw
        }
    });

    animation.addEventListener("click", function () {
        if (rotateAroundOrbit)
            rotateAroundOrbit = false;//stop rotation around orbit
        else
            rotateAroundOrbit = true;//start rotation around orbit
    });

    var filter1 = document.getElementById("filterStyleMag2");
    filter1.onchange = function () {
        var filterStyleMag = filter1.options[filter1.selectedIndex].value;

        if (filterStyleMag == 0) {
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MAG_FILTER, gl3.NEAREST);
        } else if (filterStyleMag == 1) {
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);
        }
    }

    var filter2 = document.getElementById("filterStyleMin2");
    filter2.onchange = function () {
        var filterStyleMin = filter2.options[filter2.selectedIndex].value;

        if (filterStyleMin == 0) {
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MIN_FILTER, gl3.NEAREST);;
        } else if (filterStyleMin == 1) {
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);
        }
    }
}

init();