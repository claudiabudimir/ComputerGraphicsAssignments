function init() {
    //Init the canvas
    canvas = document.getElementById("gl-canvas2");
    gl2 = WebGLUtils.setupWebGL(canvas);

    //Set the viewport
    gl2.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl2, "vertex-shader-2", "fragment-shader-2");
    gl2.useProgram(program);
    
    //Enable a depth test
    gl2.enable(gl2.DEPTH_TEST);
    gl2.enable(gl2.CULL_FACE);//Enable back face culling, The initial value of glCullFace is GL_BACK.
    gl2.frontFace(gl2.CCW); // Passing GL_CCW to mode selects counterclockwise polygons as front-facing 

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
    gl2.p_buffer = null;
    gl2.n_buffer = null;

    var quadvertices = [vec4(-1.0,-1.0,0.999,1), vec4(1,-1,0.999,1), vec4(-1, 1, 0.999, 1), vec4(1, 1, 0.999, 1) ];
    function drawquad(){
        pointsArray.push(quadvertices[0],quadvertices[1],quadvertices[3],
        quadvertices[3],quadvertices[2],quadvertices[0]);

        normalsArray.push(quadvertices[0],quadvertices[1],quadvertices[3],
            quadvertices[3],quadvertices[2],quadvertices[0]);
            
        index+=6;
    }

    function createSphere() {

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);
        drawquad();
        //Buffer Creation For Vertices
        gl2.deleteBuffer(gl2.p_buffer);
        gl2.p_buffer = gl2.createBuffer();
        gl2.bindBuffer(gl2.ARRAY_BUFFER, gl2.p_buffer);
        gl2.bufferData(gl2.ARRAY_BUFFER, flatten(pointsArray), gl2.STATIC_DRAW);

        var a_Position = gl2.getAttribLocation(program, "a_Position");
        gl2.vertexAttribPointer(a_Position, 4, gl2.FLOAT, false, 0, 0);
        gl2.enableVertexAttribArray(a_Position);

        gl2.deleteBuffer(gl2.n_buffer);

        gl2.n_buffer = gl2.createBuffer();
        gl2.bindBuffer(gl2.ARRAY_BUFFER, gl2.n_buffer);
        gl2.bufferData(gl2.ARRAY_BUFFER, flatten(normalsArray), gl2.STATIC_DRAW);

        var a_Normal = gl2.getAttribLocation(program, "a_Normal");
        gl2.vertexAttribPointer(a_Normal, 4, gl2.FLOAT, false, 0, 0);
        gl2.enableVertexAttribArray(a_Normal);
    }

    createSphere();//first call

    //projectMatrix & modelViewMatrixLoc
    var fovy = 20.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 100.0;
    const up = vec3(0.0, 1.0, 0.0);
    var at = vec3(0.0, 0.0, 0.0);
    var eye = vec3(0.0, 0.0, 4.9);//is in one-point (front) perspective

    var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");
    var texMatrix = gl2.getUniformLocation(program, 'texMatrix');

    var cubeMap = gl2.createTexture();
    gl2.bindTexture(gl2.TEXTURE_CUBE_MAP, cubeMap);
    gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 0);

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
            gl2.texImage2D(image.texturetarget, 0, gl2.RGB, gl2.RGB, gl2.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl2.TEXTURE_CUBE_MAP_POSITIVE_X + i;
    }
    gl2.pixelStorei(gl2.UNPACK_FLIP_Y_WEBGL, true);
    gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
    gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);

    
    var rotateAroundOrbit = true;
    var theta = 0;

    function render() {
        if (rotateAroundOrbit)
            theta += 0.01;

        eye = vec3(10.0 * Math.sin(theta), 2.0, 10.0 * Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);

        if(j == 6){
            //Ball
            gl2.uniformMatrix4fv(texMatrix, gl2.FALSE, flatten(mat4()));
            gl2.drawArrays(gl2.TRIANGLES, 0, index-6);



            //Background
            var inv_proj = inverse(pj);
            var inv_model = inverse(modelViewMatrix);
            var texfinal = mult(inv_model,inv_proj);


            gl2.uniformMatrix4fv(texMatrix, gl2.FALSE, flatten(texfinal));
            //gl2.uniformMatrix4fv(texMatrix, gl2.FALSE, flatten(mat4()))
            //gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(mat4()));
            //gl2.uniformMatrix4fv(modelViewMatrixLoc, gl2.FALSE, flatten(mat4()));
            gl2.drawArrays(gl2.TRIANGLES, index-6, 6);
        }

        window.requestAnimFrame(render);
    }
    render();//initial render call

    var increment = document.getElementById("incr_button1");
    var decrement = document.getElementById("decr_button1");
    var animation = document.getElementById("orbit_button1");

    increment.addEventListener("click", function () {
        if (numTimesToSubdivide < 5) {
            index = 0;//reset index
            pointsArray = [];//reset points array 
            normalsArray = [];//reset normals vector
            numTimesToSubdivide ++;

            createSphere()//sphere recreation
            //render();//sphere redraw
        }
    });

    decrement.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            index = 0;//reset index
            pointsArray = [];//reset points array 
            normalsArray = [];//reset normals vector
            numTimesToSubdivide --;
            createSphere()//sphere recreation
            //render();//sphere redraw
        }
    });

    animation.addEventListener("click", function () {
        if(rotateAroundOrbit)
            rotateAroundOrbit = false;//stop rotation around orbit
        else
            rotateAroundOrbit = true;//start rotation around orbit
    });

    var filter1 = document.getElementById("filterStyleMag1");
    filter1.onchange = function () {
        var filterStyleMag = filter1.options[filter1.selectedIndex].value;

        if (filterStyleMag == 0) {
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MAG_FILTER, gl2.NEAREST);
        } else if (filterStyleMag == 1) {
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
        }
    }

    var filter2 = document.getElementById("filterStyleMin1");
    filter2.onchange = function () {
        var filterStyleMin = filter2.options[filter2.selectedIndex].value;

        if (filterStyleMin == 0) {
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST);;
        } else if (filterStyleMin == 1) {
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
        }
    }
}

init();