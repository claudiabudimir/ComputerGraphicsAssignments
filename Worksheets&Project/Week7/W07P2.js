function init(){
    canvas = document.getElementById("gl-canvas2");
    gl2 = WebGLUtils.setupWebGL(canvas);

    if (!gl2) {
        alert("WebGL isn�t available");
    }

    gl2.viewport(0, 0, canvas.width, canvas.height);
    gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl2, "vertex-shader-2", "fragment-shader-2");
    gl2.useProgram(program);

    
    //var reflective = gl2.getUniformLocation(program, 'reflective');
    //gl2.uniform1i(reflective, true);
    //gl2.uniform1i(reflective, false);

    //var eye_Position = gl2.getUniformLocation(program, 'eye_Position');
    //gl2.uniform4fv(eye_Position, );

    
    gl2.enable(gl2.DEPTH_TEST);
    gl2.enable(gl2.CULL_FACE);
    gl2.cullFace(gl2.BACK); // Changing this changes the color FRONT VS BACK

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

    gl2.p_buffer = null;
    gl2.n_buffer = null;

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

    main1();

    var animate = false;

    var theta = 0;

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

            // Insert WebGL texture initialization her
            console.log(image);
            console.log(image.texturetarget);
            gl2.texImage2D(image.texturetarget, 0, gl2.RGB, gl2.RGB, gl2.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl2.TEXTURE_CUBE_MAP_POSITIVE_X + i;
        console.log("image name " + cubefiles[i]);
    }
    gl2.pixelStorei(gl2.UNPACK_FLIP_Y_WEBGL, true);
    gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
    gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);


    var fovy = 45.0; //angl1es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 100.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 5.0);


    var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");

    var texMatrix = gl2.getUniformLocation(program, 'texMatrix');
    



    function render() {
        gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(pj));

        if (animate)
            theta += 0.005;
        eye = vec3(7.0 * Math.sin(theta), 0.0, 7.0 * Math.cos(theta));
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

    render();

    var increment2 = document.getElementById("increment2");

    var decrement2 = document.getElementById("decrement2");

    var animation2 = document.getElementById("animation2");


    increment2.addEventListener("click", function () {
        if (numTimesToSubdivide < 7) {
            numTimesToSubdivide++;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    decrement2.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            numTimesToSubdivide--;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    animation2.addEventListener("click", function () {
        if (animate)
            animate = false;
        else animate = true;
    });

    var filterM2 = document.getElementById("filter-M2");
    filterM2.onchange = function () {
        var filter_value = filterM2.options[filterM2.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MAG_FILTER, gl2.NEAREST);
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
            console.log("LINEAR");
        }
    }

    var filterm2 = document.getElementById("filter-m2");
    filterm2.onchange = function () {
        var filter_value = filterm2.options[filterm2.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST);;
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl2.texParameteri(gl2.TEXTURE_CUBE_MAP, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
            console.log("LINEAR");
        }
    }

}


init();