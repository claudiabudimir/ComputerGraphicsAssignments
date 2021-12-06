function init() {

    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    if (!gl1) {
        alert("WebGL isnÃƒÂ¯Ã‚Â¿Ã‚Â½t available");
    }

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(1.0, 1.0, 1.0, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl1, "vertex-shader-1", "fragment-shader-1");
    gl1.useProgram(program);

    gl1.enable(gl1.DEPTH_TEST);
    gl1.enable(gl1.CULL_FACE);
    gl1.cullFace(gl1.BACK); // Changing this changes the color FRONT VS BACK

    function tetrahedron(a, b, c, d, n) {
        divideTriangl1e(a, b, c, n);
        divideTriangl1e(d, c, b, n);
        divideTriangl1e(a, d, b, n);
        divideTriangl1e(a, c, d, n);
    }

    function divideTriangl1e(a, b, c, count) {
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangl1e(a, ab, ac, count - 1);
            divideTriangl1e(ab, b, bc, count - 1);
            divideTriangl1e(bc, c, ac, count - 1);
            divideTriangl1e(ab, bc, ac, count - 1);
        } else {
            triangl1e(a, b, c);
        }
    }

    function triangl1e(a, b, c) {
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);

        normalsArray.push(vec4(a[0], a[1], a[2], 0.0));
        normalsArray.push(vec4(b[0], b[1], b[2], 0.0));
        normalsArray.push(vec4(c[0], c[1], c[2], 0.0));

        index += 3;
    }

    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    var index = 0;
    var pointsArray = [];
    var normalsArray = [];
    var numTimesToSubdivide = 5;

    gl1.p_buffer = null;
    gl1.n_buffer = null;

    function main1() {

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        gl1.deleteBuffer(gl1.p_buffer);
        gl1.p_buffer = gl1.createBuffer();
        gl1.bindBuffer(gl1.ARRAY_BUFFER, gl1.p_buffer);
        gl1.bufferData(gl1.ARRAY_BUFFER, flatten(pointsArray), gl1.STATIC_DRAW);

        var a_Position = gl1.getAttribLocation(program, "a_Position");
        gl1.vertexAttribPointer(a_Position, 4, gl1.FLOAT, false, 0, 0);
        gl1.enableVertexAttribArray(a_Position);

        gl1.deleteBuffer(gl1.n_buffer);

        gl1.n_buffer = gl1.createBuffer();
        gl1.bindBuffer(gl1.ARRAY_BUFFER, gl1.n_buffer);
        gl1.bufferData(gl1.ARRAY_BUFFER, flatten(normalsArray), gl1.STATIC_DRAW);

        var a_Normal = gl1.getAttribLocation(program, "a_Normal");
        gl1.vertexAttribPointer(a_Normal, 4, gl1.FLOAT, false, 0, 0);
        gl1.enableVertexAttribArray(a_Normal);
    }

    main1();

    var fovy = 45.0; //angl1es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 100.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 5.0);


    var projectMatrix = gl1.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl1.uniformMatrix4fv(projectMatrix, gl1.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl1.getUniformLocation(program, "modelViewMatrix");

    var animate = false;

    var theta = 0;

    var cubeMap = gl1.createTexture();
    gl1.bindTexture(gl1.TEXTURE_CUBE_MAP, cubeMap);
    gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 0);

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

            // Insert WebGL texture initialization her
            console.log(image);
            console.log(image.texturetarget);
            gl1.texImage2D(image.texturetarget, 0, gl1.RGB, gl1.RGB, gl1.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl1.TEXTURE_CUBE_MAP_POSITIVE_X + i;
        console.log("image name " + cubefiles[i]);
    }
    gl1.pixelStorei(gl1.UNPACK_FLIP_Y_WEBGL, true);

    //gl1.generateMipmap(gl1.TEXTURE_CUBE_MAP);


    gl1.texParameteri(gl1.TEXTURE_CUBE_MAP, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);
    gl1.texParameteri(gl1.TEXTURE_CUBE_MAP, gl1.TEXTURE_MAG_FILTER, gl1.LINEAR);

    function render() {
        if (animate)
            theta += 0.005;
        eye = vec3(5.0 * Math.sin(theta), 0.0, 5.0 * Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);
        //for (var i = 0; i < index; i += 3)
        //   gl1.drawArrays(gl1.TRIANGLES, i, 3);
        if(j == 6)
        gl1.drawArrays(gl1.TRIANGLES, 0, index);

        window.requestAnimFrame(render);
    }

    render();

    var increment1 = document.getElementById("increment1");

    var decrement1 = document.getElementById("decrement1");

    var animation1 = document.getElementById("animation1");


    increment1.addEventListener("click", function () {
        if (numTimesToSubdivide < 7) {
            numTimesToSubdivide++;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    decrement1.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            numTimesToSubdivide--;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    animation1.addEventListener("click", function () {
        if (animate)
            animate = false;
        else animate = true;
    });

    var filterM1 = document.getElementById("filter-M1");
    filterM1.onchange = function () {
        var filter_value = filterM1.options[filterM1.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl1.texParameteri(gl1.TEXTURE_CUBE_MAP, gl1.TEXTURE_MAG_FILTER, gl1.NEAREST);
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl1.texParameteri(gl1.TEXTURE_CUBE_MAP, gl1.TEXTURE_MAG_FILTER, gl1.LINEAR);
            console.log("LINEAR");
        }
    }

    var filterm1 = document.getElementById("filter-m1");
    filterm1.onchange = function () {
        var filter_value = filterm1.options[filterm1.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl1.texParameteri(gl1.TEXTURE_CUBE_MAP, gl1.TEXTURE_MIN_FILTER, gl1.NEAREST);;
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl1.texParameteri(gl1.TEXTURE_CUBE_MAP, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);
            console.log("LINEAR");
        }
    }

}

init();