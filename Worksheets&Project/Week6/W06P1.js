function init() {
    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    if (!gl1) {
        alert("WebGL isn�t available");
    }

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);
    gl1.enable(gl1.DEPTH_TEST);
    gl1.enable(gl1.CULL_FACE);
    gl1.cullFace(gl1.BACK);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl1, "vertex-shader-1", "fragment-shader-1");
    gl1.useProgram(program);

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

    var projectMatrix = gl1.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl1.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl1.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));


    var rect_verts = [vec3(-4.0, -1.0, -1.0), vec3(4.0, -1.0, -1.0), vec3(4.0, -1.0, -21.0), vec3(-4.0, -1.0, -21.0)];
    var tex_coord = [vec2(-1.5, 0.0), vec2(2.5, 0.0), vec2(2.5, 10.0), vec2(-1.5, 10.0)];
    var colors = [vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)]; // Optional - Remove a_Color and v_Color from vertex(s)

    var p_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, p_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(rect_verts), gl1.STATIC_DRAW);

    var a_Position = gl1.getAttribLocation(program, "a_Position");
    gl1.vertexAttribPointer(a_Position, 3, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_Position);

    var c_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, c_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(colors), gl1.STATIC_DRAW);

    var a_Color = gl1.getAttribLocation(program, "a_Color");
    gl1.vertexAttribPointer(a_Color, 3, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_Color);

    var t_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, t_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(tex_coord), gl1.STATIC_DRAW);

    var a_TexCoord = gl1.getAttribLocation(program, "a_TexCoord");
    gl1.vertexAttribPointer(a_TexCoord, 2, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_TexCoord);

    // 1st Bullet Point
    var texture = gl1.createTexture();
    gl1.bindTexture(gl1.TEXTURE_2D, texture);

    gl1.texImage2D(gl1.TEXTURE_2D, 0, gl1.RGBA, texSize, texSize, 0, gl1.RGBA, gl1.UNSIGNED_BYTE, myTexels);

    //4th Bullet Point
    var texture = gl1.createTexture();
    gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 0);

    gl1.generateMipmap(gl1.TEXTURE_2D);

    //5th Bullet Point

    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MIN_FILTER, gl1.NEAREST);
    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MAG_FILTER, gl1.NEAREST);

    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_S, gl1.REPEAT);
    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_T, gl1.REPEAT);

    function render() {
        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);
        gl1.drawArrays(gl1.TRIANGLE_FAN, 0, 4);
        //gl1.drawElements(gl1.TRIANGLES, indice, gl1.UNSIGNED_SHORT, 0);
        window.requestAnimFrame(render);
    }

    render();



}

init();