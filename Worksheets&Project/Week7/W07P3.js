function init(){
    canvas = document.getElementById("gl-canvas3");
    gl3 = WebGLUtils.setupWebGL(canvas);

    if (!gl3) {
        alert("WebGL isn�t available");
    }

    gl3.viewport(0, 0, canvas.width, canvas.height);
    gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl3.clear(gl3.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl3, "vertex-shader-3", "fragment-shader-3");
    gl3.useProgram(program);

    
    gl3.enable(gl3.DEPTH_TEST);
    gl3.enable(gl3.CULL_FACE);
    gl3.cullFace(gl3.BACK); // Changing this changes the color FRONT VS BACK

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
        pointsArray.push(a,b,c);
        

        normalsArray.push(vec4(a[0], a[1], a[2], 0.0));
        normalsArray.push(vec4(b[0], b[1], b[2], 0.0));
        normalsArray.push(vec4(c[0], c[1], c[2], 0.0));

        index += 3;
    }

    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    var quadvertices = [vec4(-1.0,-1.0,0.999,1), vec4(1,-1,0.999,1), vec4(-1, 1, 0.999), vec4(1, 1, 0.999) ];

    var index = 0;
    var pointsArray = [];
    var normalsArray = [];
    var numTimesToSubdivide = 5;

    gl3.p_buffer = null;
    gl3.n_buffer = null;

    function drawquad(){
        pointsArray.push(quadvertices[0],quadvertices[1],quadvertices[3],
        quadvertices[3],quadvertices[2],quadvertices[0]);

        normalsArray.push(quadvertices[0],quadvertices[1],quadvertices[3],
            quadvertices[3],quadvertices[2],quadvertices[0]);
            
        index+=6;
    }

    function main1() {

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        drawquad();

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

    var animate = false;

    var theta = 0;

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

            // Insert WebGL texture initialization her
            console.log(image);
            console.log(image.texturetarget);
            gl3.texImage2D(image.texturetarget, 0, gl3.RGB, gl3.RGB, gl3.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl3.TEXTURE_CUBE_MAP_POSITIVE_X + i;
        console.log("image name " + cubefiles[i]);
    }
    gl3.pixelStorei(gl3.UNPACK_FLIP_Y_WEBGL, true);
    gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);
    gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);


    var fovy = 90.0; //angl1es in degrees
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

    var texMatrix = gl3.getUniformLocation(program, 'texMatrix');
    
    var reflective = gl3.getUniformLocation(program, 'reflective');

    var eye_Position = gl3.getUniformLocation(program, 'eye_Position');
    //gl3.uniform4fv(eye_Position, );


    function render() {
        gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(pj));

        if (animate)
            theta += 0.005;
        eye = vec3(3.0 * Math.sin(theta), 0.0, 3.0 * Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl3.uniform3fv(eye_Position, flatten(eye));
        gl3.clear(gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);
        if(j == 6){
            //Ball
            gl3.uniform1i(reflective, true);
            gl3.uniformMatrix4fv(texMatrix, gl3.FALSE, flatten(mat4()));
            gl3.drawArrays(gl3.TRIANGLES, 0, index-6);

            //Background
            var inv_proj = inverse(pj);
            var inv_model = inverse(modelViewMatrix);
            var texfinal = mult(inv_model,inv_proj);
            gl3.uniform1i(reflective, false);


            gl3.uniformMatrix4fv(texMatrix, gl3.FALSE, flatten(texfinal));
            //gl3.uniformMatrix4fv(texMatrix, gl3.FALSE, flatten(mat4()))
            //gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(mat4()));
            //gl3.uniformMatrix4fv(modelViewMatrixLoc, gl3.FALSE, flatten(mat4()));
            gl3.drawArrays(gl3.TRIANGLES, index-6, 6);
        }
       

        window.requestAnimFrame(render);
    }

    render();

    var increment3 = document.getElementById("increment3");

    var decrement3 = document.getElementById("decrement3");

    var animation3 = document.getElementById("animation3");


    increment3.addEventListener("click", function () {
        if (numTimesToSubdivide < 7) {
            numTimesToSubdivide++;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    decrement3.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            numTimesToSubdivide--;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    animation3.addEventListener("click", function () {
        if (animate)
            animate = false;
        else animate = true;
    });

    var filterM3 = document.getElementById("filter-M3");
    filterM3.onchange = function () {
        var filter_value = filterM3.options[filterM3.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MAG_FILTER, gl3.NEAREST);
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);
            console.log("LINEAR");
        }
    }

    var filterm3 = document.getElementById("filter-m3");
    filterm3.onchange = function () {
        var filter_value = filterm3.options[filterm3.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MIN_FILTER, gl3.NEAREST);;
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl3.texParameteri(gl3.TEXTURE_CUBE_MAP, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);
            console.log("LINEAR");
        }
    }

}


init();