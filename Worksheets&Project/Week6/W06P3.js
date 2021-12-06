function init() {

    canvas = document.getElementById("gl-canvas3");
    gl3 = WebGLUtils.setupWebGL(canvas);

    if (!gl3) {
        alert("WebGL isnï¿½t available");
    }

    gl3.viewport(0, 0, canvas.width, canvas.height);
    gl3.clearColor(0.0, 0.0, 0.0, 1.0);
    gl3.clear(gl3.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl3, "vertex-shader-3", "fragment-shader-3");
    gl3.useProgram(program);

    gl3.enable(gl3.DEPTH_TEST);
    gl3.enable(gl3.CULL_FACE);
    gl3.cullFace(gl3.BACK); // Changing this changes the color FRONT VS BACK

    function tetrahedron(a, b, c, d, n) {
        divideTriangl3e(a, b, c, n);
        divideTriangl3e(d, c, b, n);
        divideTriangl3e(a, d, b, n);
        divideTriangl3e(a, c, d, n);
    }

    function divideTriangl3e(a, b, c, count) {
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangl3e(a, ab, ac, count - 1);
            divideTriangl3e(ab, b, bc, count - 1);
            divideTriangl3e(bc, c, ac, count - 1);
            divideTriangl3e(ab, bc, ac, count - 1);
        } else {
            triangl3e(a, b, c);
        }
    }

    function triangl3e(a, b, c) {
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

    var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);

    var materialDiffuse = vec4(1.0, 1.0, 1.0, 1.0); //white

    var lightPosition = vec4(0.0, 0.0, 1.0, 0.0); //if last  value is zero, becomes a directional source in the direction (0, 0, -1)
    var lightEmission = vec4(1.0, 1.0, 1.0, 1.0); //le

    gl3.p_buffer = null;
    gl3.n_buffer = null;

    function main1() {

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        console.log(pointsArray);
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

    main1();

    var diffuseProduct = mult(lightDiffuse, materialDiffuse);

    gl3.uniform4fv(gl3.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl3.uniform4fv(gl3.getUniformLocation(program, "lightPosition"), flatten(lightPosition));
    gl3.uniform4fv(gl3.getUniformLocation(program, "lightEmission"), flatten(lightEmission));

    var fovy = 15.0; //angl3es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 100.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 5.0);


    var projectMatrix = gl3.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl3.getUniformLocation(program, "modelViewMatrix");

    var animate = true;

    var theta = 0;

    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        // Insert WebGL texture initialization her

        var texture = gl3.createTexture();
        gl3.bindTexture(gl3.TEXTURE_2D, texture);

        gl3.uniform1i(gl3.getUniformLocation(program, "texMap"), 0);
        

        //gl3.pixelStorei(gl3.UNPACK_FLIP_Y_WEBGL, true);
        gl3.texImage2D(gl3.TEXTURE_2D, 0, gl3.RGB, gl3.RGB, gl3.UNSIGNED_BYTE, image);

        gl3.generateMipmap(gl3.TEXTURE_2D);

        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_WRAP_S, gl3.REPEAT);
        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_WRAP_T, gl3.REPEAT);

        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);
        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);
        // Insert WebGL texture initialization here
    };
    image.src = 'earth.jpg';

    function render() {
        if (animate)
            theta += 0.005;
        eye = vec3(10.0 * Math.sin(theta), 2.0, 10.0 * Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl3.clear(gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);
        for (var i = 0; i < index; i += 3)
            gl3.drawArrays(gl3.TRIANGLES, i, 3);

        window.requestAnimFrame(render);
    }

    render();

    var increment = document.getElementById("increment3");

    var decrement = document.getElementById("decrement3");

    var animation = document.getElementById("animation3");


    increment.addEventListener("click", function () {
        if (numTimesToSubdivide < 7) {
            numTimesToSubdivide++;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    decrement.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            numTimesToSubdivide--;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    animation.addEventListener("click", function () {
        if (animate)
            animate = false;
        else animate = true;
    });

    var filterM2 = document.getElementById("filter-M2");
    filterM2.onchange = function () {
        var filter_value = filterM2.options[filterM2.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MAG_FILTER, gl3.NEAREST);
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);
            console.log("LINEAR");
        }
    }

    var filterm2 = document.getElementById("filter-m2");
    filterm2.onchange = function () {
        var filter_value = filterm2.options[filterm2.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.NEAREST);;
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);
            console.log("LINEAR");
        } else if (filter_value == 2) {
            //MIPMAP
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.NEAREST_MIPMAP_NEAREST); 
            console.log("MIPMAP1");
        } else if (filter_value == 3) {
            //MIPMAP
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR_MIPMAP_NEAREST); 
            console.log("MIPMAP2");
        } else if (filter_value == 4) {
            //MIPMAP
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.NEAREST_MIPMAP_LINEAR); 
            console.log("MIPMAP3");
        }else if (filter_value == 5) {
            //MIPMAP
            gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR_MIPMAP_LINEAR); 
            console.log("MIPMAP4");
        }
    }

}

init();