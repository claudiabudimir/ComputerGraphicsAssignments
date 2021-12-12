function init() {
    //Init the canvas
    canvas = document.getElementById("gl-canvas1");
    gl = WebGLUtils.setupWebGL(canvas);

    //Set the viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl, "vertex-shader-1", "fragment-shader-1");
    gl.useProgram(program);
    
    //Enable a depth test
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);//Enable back face culling, The initial value of glCullFace is GL_BACK.
    gl.frontFace(gl.CCW); // Passing GL_CCW to mode selects counterclockwise polygons as front-facing 

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
    gl.p_buffer = null;
    gl.n_buffer = null;

    function createSphere() {

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        //Buffer Creation For Vertices
        gl.deleteBuffer(gl.p_buffer);
        gl.p_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.p_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(program, "a_Position");
        gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        gl.deleteBuffer(gl.n_buffer);

        gl.n_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.n_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

        var a_Normal = gl.getAttribLocation(program, "a_Normal");
        gl.vertexAttribPointer(a_Normal, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Normal);
    }

    createSphere();//first call

    //uniform variables transmission
    var materialDiffuse = vec4(1.0, 1.0, 1.0, 1.0);//white
    var lightPosition = vec4(0.0, 0.0, 1.0, 0.0); //fourth component is zero so it becomes a directional light, l=-le
    var lightEmission = vec4(1.0, 1.0, 1.0, 1.0); //Le
    var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);//Ld = Le
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));
    gl.uniform4fv(gl.getUniformLocation(program, "lightEmission"), flatten(lightEmission));

    //projectMatrix & modelViewMatrixLoc
    var fovy = 20.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 100.0;
    const up = vec3(0.0, 1.0, 0.0);
    var at = vec3(0.0, 0.0, 0.0);
    var eye = vec3(0.0, 0.0, 4.9);//is in one-point (front) perspective

    var projectMatrix = gl.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl.uniformMatrix4fv(projectMatrix, gl.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    var cubeMap = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeMap);
    gl.uniform1i(gl.getUniformLocation(program, "texMap"), 0);

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
            gl.texImage2D(image.texturetarget, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i;
    }
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    //gl.generateMipmap(gl.TEXTURE_CUBE_MAP);


    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    
    var rotateAroundOrbit = true;
    var theta = 0;

    function render() {
        if (rotateAroundOrbit)
            theta += 0.01;

        eye = vec3(10.0 * Math.sin(theta), 2.0, 10.0 * Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
       
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (var i = 0; i < index; i += 3)
            gl.drawArrays(gl.TRIANGLES, i, 3);
        window.requestAnimFrame(render);
    }
    render();//initial render call

    var increment = document.getElementById("incr_button");
    var decrement = document.getElementById("decr_button");
    var animation = document.getElementById("orbit_button");

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

    var filter1 = document.getElementById("filterStyleMag");
    filter1.onchange = function () {
        var filterStyleMag = filter1.options[filter1.selectedIndex].value;

        if (filterStyleMag == 0) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        } else if (filterStyleMag == 1) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
    }

    var filter2 = document.getElementById("filterStyleMin");
    filter2.onchange = function () {
        var filterStyleMin = filter2.options[filter2.selectedIndex].value;

        if (filterStyleMin == 0) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);;
        } else if (filterStyleMin == 1) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    }
}

init();