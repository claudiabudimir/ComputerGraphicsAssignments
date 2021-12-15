function init() {
    //Init the canvas
    canvas = document.getElementById("gl-canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas);

    //Set the viewport
    gl4.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl4.clear(gl4.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl4, "vertex-shader-4", "fragment-shader-4");
    gl4.useProgram(program);

    //Enable a depth test
    gl4.enable(gl4.DEPTH_TEST);
    gl4.enable(gl4.CULL_FACE);//Enable back face culling, The initial value of glCullFace is GL_BACK.
    gl4.frontFace(gl4.CCW); // Passing GL_CCW to mode selects counterclockwise polygons as front-facing 

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
    gl4.p_buffer = null;
    gl4.n_buffer = null;

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
        gl4.deleteBuffer(gl4.p_buffer);
        gl4.p_buffer = gl4.createBuffer();
        gl4.bindBuffer(gl4.ARRAY_BUFFER, gl4.p_buffer);
        gl4.bufferData(gl4.ARRAY_BUFFER, flatten(pointsArray), gl4.STATIC_DRAW);

        var a_Position = gl4.getAttribLocation(program, "a_Position");
        gl4.vertexAttribPointer(a_Position, 4, gl4.FLOAT, false, 0, 0);
        gl4.enableVertexAttribArray(a_Position);

        gl4.deleteBuffer(gl4.n_buffer);

        gl4.n_buffer = gl4.createBuffer();
        gl4.bindBuffer(gl4.ARRAY_BUFFER, gl4.n_buffer);
        gl4.bufferData(gl4.ARRAY_BUFFER, flatten(normalsArray), gl4.STATIC_DRAW);

        var a_Normal = gl4.getAttribLocation(program, "a_Normal");
        gl4.vertexAttribPointer(a_Normal, 4, gl4.FLOAT, false, 0, 0);
        gl4.enableVertexAttribArray(a_Normal);
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

    var projectMatrix = gl4.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl4.uniformMatrix4fv(projectMatrix, gl4.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl4.getUniformLocation(program, "modelViewMatrix");
    var texMatrix = gl4.getUniformLocation(program, 'texMatrix');
    var reflective = gl4.getUniformLocation(program, 'reflective');
    var eye_Position = gl4.getUniformLocation(program, 'eye_Position');
    
    var cubeMap = gl4.createTexture();
    gl4.activeTexture(gl4.TEXTURE0);
    gl4.bindTexture(gl4.TEXTURE_CUBE_MAP, cubeMap);
    gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 0);

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
            gl4.texImage2D(image.texturetarget, 0, gl4.RGB, gl4.RGB, gl4.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl4.TEXTURE_CUBE_MAP_POSITIVE_X + i;
    }
    gl4.pixelStorei(gl4.UNPACK_FLIP_Y_WEBGL, true);
    gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MIN_FILTER, gl4.LINEAR);
    gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MAG_FILTER, gl4.LINEAR);
    
    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        // Insert WebGL texture initialization her

        var texture = gl4.createTexture();
        gl4.activeTexture(gl4.TEXTURE1);
        gl4.bindTexture(gl4.TEXTURE_2D, texture);

        gl4.uniform1i(gl4.getUniformLocation(program, "bumpMap"), 1);
        

        //gl4.pixelStorei(gl4.UNPACK_FLIP_Y_WEBGL, true);
        gl4.texImage2D(gl4.TEXTURE_2D, 0, gl4.RGB, gl4.RGB, gl4.UNSIGNED_BYTE, image);

        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_S, gl4.REPEAT);
        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_T, gl4.REPEAT);

        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MIN_FILTER, gl4.LINEAR);
        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MAG_FILTER, gl4.LINEAR);
        // Insert WebGL texture initialization here
    };
    image.src = 'textures/normalmap.png';
    
    var rotateAroundOrbit = true;
    var theta = 0;

    function render() {
        if (rotateAroundOrbit)
            theta += 0.01;

        eye = vec3(5.0 * Math.sin(theta), 2.0, 5.0 * Math.cos(theta));
        gl4.uniform3fv(eye_Position, flatten(eye));
        modelViewMatrix = lookAt(eye, at, up);
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl4.clear(gl4.COLOR_BUFFER_BIT | gl4.DEPTH_BUFFER_BIT);

        //Sphere
        gl4.uniform1i(reflective, true);
        gl4.uniformMatrix4fv(texMatrix, gl4.FALSE, flatten(mat4()));
        gl4.drawArrays(gl4.TRIANGLES, 0, index - 6);// we need to substract 6 for the vertices added for the quad

        //Quad
        var projMatrixInversed = inverse(pj);//the inverse of the projection matrix to go from clip coordinates to camera coordinates
        var modelViewMatrixInversed = inverse(modelViewMatrix);//the inverse of the rotational part of the view matrix (no translation) to get direction vectors in world coordinates
        var finalTex = mult(modelViewMatrixInversed, projMatrixInversed);
        gl4.uniform1i(reflective, false);
        gl4.uniformMatrix4fv(texMatrix, gl4.FALSE, flatten(finalTex));
        gl4.drawArrays(gl4.TRIANGLES, index - 6, 6);

        window.requestAnimFrame(render);
    }
    render();//initial render call

    var increment = document.getElementById("incr_button3");
    var decrement = document.getElementById("decr_button3");
    var animation = document.getElementById("orbit_button3");

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

    var filter1 = document.getElementById("filterStyleMag3");
    filter1.onchange = function () {
        var filterStyleMag = filter1.options[filter1.selectedIndex].value;

        if (filterStyleMag == 0) {
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MAG_FILTER, gl4.NEAREST);
        } else if (filterStyleMag == 1) {
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MAG_FILTER, gl4.LINEAR);
        }
    }

    var filter2 = document.getElementById("filterStyleMin3");
    filter2.onchange = function () {
        var filterStyleMin = filter2.options[filter2.selectedIndex].value;

        if (filterStyleMin == 0) {
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MIN_FILTER, gl4.NEAREST);;
        } else if (filterStyleMin == 1) {
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MIN_FILTER, gl4.LINEAR);
        }
    }
}

init();