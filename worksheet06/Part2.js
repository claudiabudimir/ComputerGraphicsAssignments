function init() {
    canvas = document.getElementById("gl-canvas2");
    gl2 = WebGLUtils.setupWebGL(canvas);

    gl2.viewport(0, 0, canvas.width, canvas.height);
    gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    gl2.enable(gl2.DEPTH_TEST);
    gl2.enable(gl2.CULL_FACE);
    gl2.cullFace(gl2.BACK);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl2, "vertex-shader-2", "fragment-shader-2");
    gl2.useProgram(program);

    //64×64 resolution texture image that forms an 8×8 black-and-white checkerboard
    var texSize = 64;
    var numRows = 8;
    var numCols = 8;
    var myTexels = new Uint8Array(4 * texSize * texSize);

    //creation of the checkerboard texture
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

    //perspective camera with a 90° field of view.
    var fovy = 90.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.001;
    var far = 40.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 0.0);

    var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl2.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //initialize vextices, textures and colors vectors
    var vertices = [vec3(-4.0, -1.0, -1.0), vec3(4.0, -1.0, -1.0), vec3(4.0, -1.0, -21.0), vec3(-4.0, -1.0, -21.0)];
    var textures = [vec2(-1.5, 0.0), vec2(2.5, 0.0), vec2(2.5, 10.0), vec2(-1.5, 10.0)];
    var colors = [vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)]; // Optional - Remove a_Color and v_Color from vertex(s)
    
    //vertices buffer creation
    var p_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, p_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(vertices), gl2.STATIC_DRAW);

    var a_Position = gl2.getAttribLocation(program, "a_Position");
    gl2.vertexAttribPointer(a_Position, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Position);
  
    //colors buffer creation
    var c_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, c_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(colors), gl2.STATIC_DRAW);

    var a_Color = gl2.getAttribLocation(program, "a_Color");
    gl2.vertexAttribPointer(a_Color, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Color);
    
    //textures buffer creation
    var t_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, t_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(textures), gl2.STATIC_DRAW);

    var a_TexCoord = gl2.getAttribLocation(program, "a_TexCoord");
    gl2.vertexAttribPointer(a_TexCoord, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_TexCoord);

    //create a texture object and bind it as the current 2D texture object 
    var texture = gl2.createTexture();
    gl2.bindTexture(gl2.TEXTURE_2D, texture);
    
    //we specify that this array is to be used as a two-dimentional texture
    gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, texSize, texSize, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, myTexels);

    //we link the created texture to the sampler fragment shader, where texMap is the sampler name in the fragment shader
    gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 0);

    gl2.generateMipmap(gl2.TEXTURE_2D);

    //specify option for magnification and minification as nearest point sampling
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.NEAREST);
    
    //set wrapping
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.REPEAT);

    function render() {
        gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
        gl2.drawArrays(gl2.TRIANGLE_FAN, 0, 4);
        //gl2.drawElements(gl2.TRIANGLES, indice, gl2.UNSIGNED_SHORT, 0);
        window.requestAnimFrame(render);
    }

    render();
    
    //selection input fields
    var wrap = document.getElementById("wrapStyle");
    wrap.onchange = function () {
        var wrapStyle = wrap.options[wrap.selectedIndex].value;
        if (wrapStyle == 0) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT);
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.REPEAT);
        } else if (wrapStyle == 1) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
        }
    }

    var filterM = document.getElementById("filterStyleMag");
    filterM.onchange = function () {
        var filterStyleMag = filterM.options[filterM.selectedIndex].value;

        if (filterStyleMag == 0) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.NEAREST);
        } else if (filterStyleMag == 1) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
        }
    }

    var filterm = document.getElementById("filterStyleMin");
    filterm.onchange = function () {
        var filterStyleMin = filterm.options[filterm.selectedIndex].value;
        
        if (filterStyleMin == 0) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST);;
        } else if (filterStyleMin == 1) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
        } else if (filterStyleMin == 2) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST_MIPMAP_NEAREST);
        } else if (filterStyleMin == 3) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR_MIPMAP_NEAREST);
        } else if (filterStyleMin == 4) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST_MIPMAP_LINEAR);
        }else if (filterStyleMin == 5) {
            gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR_MIPMAP_LINEAR);
        }
    }
}

init();