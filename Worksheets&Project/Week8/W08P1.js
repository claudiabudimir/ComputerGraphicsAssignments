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
    //create_chess();


    var fovy = 90.0; //angle in degrees
    var aspect = canvas.width / canvas.height;
    var near = 1.0;
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


    var large_rect = [vec3(-2.0, -1.0, -1.0), vec3(-2.0, -1.0, -5.0), vec3(2.0, -1.0, -1.0), vec3(2.0, -1.0, -5.0)]; // 2,0,1   1,3,2
    var small_quad1 = [vec3(0.25, -0.5, -1.25), vec3(0.25, -0.5, -1.75), vec3(0.75, -0.5, -1.25), vec3(0.75, -0.5, -1.75)]; // 2,0,1   1,3,2
    var small_quad2 = [vec3(-1.0, -1.0, -2.5), vec3(-1.0, -1.0, -3.0), vec3(-1.0, 0.0, -2.5), vec3(-1.0, 0.0, -3.0)]; // 2,0,1   1,3,2

    var all_points =[ large_rect[2], large_rect[0], large_rect[1], large_rect[1], large_rect[3], large_rect[2],
     small_quad1[2], small_quad1[0], small_quad1[1], small_quad1[1], small_quad1[3], small_quad1[2],
     small_quad2[2], small_quad2[0], small_quad2[1], small_quad2[1], small_quad2[3], small_quad2[2] ] ;

    var tex_coord = [vec2(-1.0, 1.0), vec2(-1.0, -1.0), vec2(1.0, 1.0), vec2(1.0, -1.0)]; //change

    var all_tex = [tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2],
    tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2], 
    tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2]]

    var p_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, p_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(all_points), gl1.STATIC_DRAW);

    var a_Position = gl1.getAttribLocation(program, "a_Position");
    gl1.vertexAttribPointer(a_Position, 3, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_Position);

    var t_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, t_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(all_tex), gl1.STATIC_DRAW);

    var a_TexCoord = gl1.getAttribLocation(program, "a_TexCoord");
    gl1.vertexAttribPointer(a_TexCoord, 2, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_TexCoord);

    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        // Insert WebGL texture initialization her

        var texture = gl1.createTexture();
        gl1.activeTexture(gl1.TEXTURE0)
        gl1.bindTexture(gl1.TEXTURE_2D, texture);

        gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 0);
        
        gl1.pixelStorei(gl1.UNPACK_FLIP_Y_WEBGL, true);
        gl1.texImage2D(gl1.TEXTURE_2D, 0, gl1.RGB, gl1.RGB, gl1.UNSIGNED_BYTE, image);

        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_S, gl1.REPEAT);
        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_T, gl1.REPEAT);

        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);
        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MAG_FILTER, gl1.LINEAR);
        // Insert WebGL texture initialization here
    };
    image.src = 'xamp23.png';

    var texture1 = gl1.createTexture();
    gl1.activeTexture(gl1.TEXTURE1);
    gl1.bindTexture(gl1.TEXTURE_2D, texture1);

    gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 1);

    var red = new Uint8Array([255, 0, 0]);
    gl1.texImage2D(gl1.TEXTURE_2D ,0,gl1.RGB, 1,1,0,gl1.RGB,gl1.UNSIGNED_BYTE, red);

    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_S, gl1.REPEAT);
    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_T, gl1.REPEAT);

    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MAG_FILTER, gl1.LINEAR);
    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);


    function render() {
        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);
        //Background
        gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 0);
        gl1.drawArrays(gl1.TRIANGLES, 0, 6);

        //Other quads
        gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 1);
        gl1.drawArrays(gl1.TRIANGLES, 6, 12 );

        
        window.requestAnimFrame(render);
    }
    render();
}

init();