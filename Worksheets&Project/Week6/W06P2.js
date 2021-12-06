function init() {
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

    var texSize = 64;
    var numRows = 8;
    var numCols = 8;
    var myTexels = new Uint8Array(4 * texSize * texSize);

    function create_chess() {
        for (var i = 0; i < texSize; ++i) {
            for (var j = 0; j < texSize; ++j) {
                var patchx = Math.floor(i / (texSize / numRows));
                var patchy = Math.floor(j / (texSize / numCols));
                var c = (patchx % 2 !== patchy % 2 ? 255 : 0);
                myTexels[4 * i * texSize + 4 * j] = c;
                myTexels[4 * i * texSize + 4 * j + 1] = c;
                myTexels[4 * i * texSize + 4 * j + 2] = c;
                myTexels[4 * i * texSize + 4 * j + 3] = 255;
            }
        }
    }
    //2nd Bullet Point
    create_chess();


    var fovy = 90.0; //angle in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 100.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 0.0);

    var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl2.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));


    var rect_verts = [vec3(-4.0, -1.0, -1.0), vec3(4.0, -1.0, -1.0), vec3(4.0, -1.0, -21.0), vec3(-4.0, -1.0, -21.0)];
    var tex_coord = [vec2(-1.5, 0.0), vec2(2.5, 0.0), vec2(2.5, 10.0), vec2(-1.5, 10.0)];
    var colors = [vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)]; // Optional - Remove a_Color and v_Color from vertex(s)

    var p_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, p_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(rect_verts), gl2.STATIC_DRAW);

    var a_Position = gl2.getAttribLocation(program, "a_Position");
    gl2.vertexAttribPointer(a_Position, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Position);

    var c_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, c_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(colors), gl2.STATIC_DRAW);

    var a_Color = gl2.getAttribLocation(program, "a_Color");
    gl2.vertexAttribPointer(a_Color, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Color);

    var t_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, t_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(tex_coord), gl2.STATIC_DRAW);

    var a_TexCoord = gl2.getAttribLocation(program, "a_TexCoord");
    gl2.vertexAttribPointer(a_TexCoord, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_TexCoord);

    // 1st Bullet Point
    var texture = gl2.createTexture();
    gl2.bindTexture(gl2.TEXTURE_2D, texture);

    gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, texSize, texSize, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, myTexels);

    //4th Bullet Point
    var texture = gl2.createTexture();
    gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 0);

    gl2.generateMipmap(gl2.TEXTURE_2D);

    //5th Bullet Point

    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.NEAREST);

    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.REPEAT);

    function render() {
        gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
        gl2.drawArrays(gl2.TRIANGLE_FAN, 0, 4);
        //gl2.drawElements(gl2.TRIANGLES, indice, gl2.UNSIGNED_SHORT, 0);
        window.requestAnimFrame(render);
    }

    render();




    var wrap = document.getElementById("wrap");
    wrap.onchange = function () {
        var value_wrap = wrap.options[wrap.selectedIndex].value;
        if (value_wrap == 0) {
            //REPEAT
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT);
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.REPEAT);
            console.log("REPEAT");
        } else if (value_wrap == 1) {
            //CLAMP-TO-EDGE
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
            console.log("CLAMP-TO-EDGE");
        } else if (value_wrap == 2){
            //MIRRORED
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.MIRRORED_REPEAT);
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.MIRRORED_REPEAT);
            console.log("MIRRORED");

        }
    }



    var filterM = document.getElementById("filter-M");
    filterM.onchange = function () {
        var filter_value = filterM.options[filterM.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.NEAREST);
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
            console.log("LINEAR");
        }
    }

    var filterm = document.getElementById("filter-m");
    filterm.onchange = function () {
        var filter_value = filterm.options[filterm.selectedIndex].value;

        if (filter_value == 0) {
            //NEAREST
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST);;
            console.log("NEAREST");
        } else if (filter_value == 1) {
            //LINEAR
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
            console.log("LINEAR");
        } else if (filter_value == 2) {
            //MIPMAP
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST_MIPMAP_NEAREST); //Doubt
            console.log("MIPMAP1");
        } else if (filter_value == 3) {
            //MIPMAP
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR_MIPMAP_NEAREST); //Doubt
            console.log("MIPMAP2");
        } else if (filter_value == 4) {
            //MIPMAP
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST_MIPMAP_LINEAR); //Doubt
            console.log("MIPMAP3");
        }else if (filter_value == 5) {
            //MIPMAP
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR_MIPMAP_LINEAR); //Doubt
            console.log("MIPMAP4");
        }

    }
}

init();