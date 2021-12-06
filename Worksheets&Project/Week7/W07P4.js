function init(){
    canvas = document.getElementById("gl-canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas);

    if (!gl4) {
        alert("WebGL isn�t available");
    }

    gl4.viewport(0, 0, canvas.width, canvas.height);
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl4.clear(gl4.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl4, "vertex-shader-4", "fragment-shader-4");
    gl4.useProgram(program);
    
    gl4.enable(gl4.DEPTH_TEST);
    gl4.enable(gl4.CULL_FACE);
    gl4.cullFace(gl4.BACK); // Changing this changes the color FRONT VS BACK

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

    gl4.p_buffer = null;
    gl4.n_buffer = null;

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

    main1();

    var animate = false;

    var theta = 0;

    var cubeMap = gl4.createTexture();
    gl4.activeTexture(gl4.TEXTURE0)
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

            // Insert WebGL texture initialization her
            console.log(image);
            console.log(image.texturetarget);
            gl4.texImage2D(image.texturetarget, 0, gl4.RGB, gl4.RGB, gl4.UNSIGNED_BYTE, image);
            j++;

        }
        image.src = cubefiles[i];
        image.texturetarget = gl4.TEXTURE_CUBE_MAP_POSITIVE_X + i;
        console.log("image name " + cubefiles[i]);
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


    var fovy = 90.0; //angl1es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 100.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 5.0);


    var projectMatrix = gl4.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl4.uniformMatrix4fv(projectMatrix, gl4.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl4.getUniformLocation(program, "modelViewMatrix");

    var texMatrix = gl4.getUniformLocation(program, 'texMatrix');

    var reflective = gl4.getUniformLocation(program, 'reflective');

    var eye_Position = gl4.getUniformLocation(program, 'eye_Position');
    //gl4.uniform4fv(eye_Position, );


    function render() {
        gl4.uniformMatrix4fv(projectMatrix, gl4.FALSE, flatten(pj));

        if (animate)
            theta += 0.005;
        eye = vec3(3.0 * Math.sin(theta), 0.0, 3.0 * Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl4.uniform3fv(eye_Position, flatten(eye));
        gl4.clear(gl4.COLOR_BUFFER_BIT | gl4.DEPTH_BUFFER_BIT);
        if(j == 6){
            //Ball
            gl4.uniform1i(reflective, true);
            gl4.uniformMatrix4fv(texMatrix, gl4.FALSE, flatten(mat4()));
            gl4.drawArrays(gl4.TRIANGLES, 0, index-6);

            //Background
            var inv_proj = inverse(pj);
            var inv_model = inverse(modelViewMatrix);
            var texfinal = mult(inv_model,inv_proj);
            gl4.uniform1i(reflective, false);


            gl4.uniformMatrix4fv(texMatrix, gl4.FALSE, flatten(texfinal));
            //gl4.uniformMatrix4fv(texMatrix, gl4.FALSE, flatten(mat4()))
            //gl4.uniformMatrix4fv(projectMatrix, gl4.FALSE, flatten(mat4()));
            //gl4.uniformMatrix4fv(modelViewMatrixLoc, gl4.FALSE, flatten(mat4()));
            gl4.drawArrays(gl4.TRIANGLES, index-6, 6);
        }
       

        window.requestAnimFrame(render);
    }

    render();


    var increment4 = document.getElementById("increment4");

    var decrement4 = document.getElementById("decrement4");

    var animation4 = document.getElementById("animation4");


    increment4.addEventListener("click", function () {
        if (numTimesToSubdivide < 7) {
            numTimesToSubdivide++;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    decrement4.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            numTimesToSubdivide--;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    animation4.addEventListener("click", function () {
        if (animate)
            animate = false;
        else animate = true;
    });

    var filterM4 = document.getElementById("filter-M4");
    filterM4.onchange = function () {
        var filter_value = filterM4.options[filterM4.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MAG_FILTER, gl4.NEAREST);
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MAG_FILTER, gl4.LINEAR);
            console.log("LINEAR");
        }
    }

    var filterm4 = document.getElementById("filter-m4");
    filterm4.onchange = function () {
        var filter_value = filterm4.options[filterm4.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MIN_FILTER, gl4.NEAREST);;
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl4.texParameteri(gl4.TEXTURE_CUBE_MAP, gl4.TEXTURE_MIN_FILTER, gl4.LINEAR);
            console.log("LINEAR");
        }
    }

}


init();