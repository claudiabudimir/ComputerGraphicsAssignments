function init() {
    canvas = document.getElementById("gl-canvas3");
    gl3 = WebGLUtils.setupWebGL(canvas);

    if (!gl3) {
        alert("WebGL isn�t available");
    }

    gl3.viewport(0, 0, canvas.width, canvas.height);
    gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl3.clear(gl3.COLOR_BUFFER_BIT);
    gl3.enable(gl3.DEPTH_TEST);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl3, "vertex-shader-3", "fragment-shader-3");
    gl3.useProgram(program);

    var fovy = 90.0; //angle in degrees
    var aspect = canvas.width / canvas.height;
    var near = 1.0;
    var far = 100.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 0.0);

    var projectMatrix = gl3.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl3.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl3.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

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

    var p_buffer = gl3.createBuffer();
    gl3.bindBuffer(gl3.ARRAY_BUFFER, p_buffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, flatten(all_points), gl3.STATIC_DRAW);

    var a_Position = gl3.getAttribLocation(program, "a_Position");
    gl3.vertexAttribPointer(a_Position, 3, gl3.FLOAT, false, 0, 0);
    gl3.enableVertexAttribArray(a_Position);

    var t_buffer = gl3.createBuffer();
    gl3.bindBuffer(gl3.ARRAY_BUFFER, t_buffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, flatten(all_tex), gl3.STATIC_DRAW);

    var a_TexCoord = gl3.getAttribLocation(program, "a_TexCoord");
    gl3.vertexAttribPointer(a_TexCoord, 2, gl3.FLOAT, false, 0, 0);
    gl3.enableVertexAttribArray(a_TexCoord);

    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        // Insert WebGL texture initialization her

        var texture = gl3.createTexture();
        gl3.activeTexture(gl3.TEXTURE0)
        gl3.bindTexture(gl3.TEXTURE_2D, texture);

        gl3.uniform1i(gl3.getUniformLocation(program, "texMap"), 0);
        
        gl3.pixelStorei(gl3.UNPACK_FLIP_Y_WEBGL, true);
        gl3.texImage2D(gl3.TEXTURE_2D, 0, gl3.RGB, gl3.RGB, gl3.UNSIGNED_BYTE, image);

        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_WRAP_S, gl3.REPEAT);
        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_WRAP_T, gl3.REPEAT);

        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);
        gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);
        // Insert WebGL texture initialization here
    };
    image.src = 'xamp23.png';

    var texture1 = gl3.createTexture();
    gl3.activeTexture(gl3.TEXTURE1);
    gl3.bindTexture(gl3.TEXTURE_2D, texture1);

    gl3.uniform1i(gl3.getUniformLocation(program, "texMap"), 1);

    var red = new Uint8Array([255, 0, 0]);
    gl3.texImage2D(gl3.TEXTURE_2D ,0,gl3.RGB, 1,1,0,gl3.RGB,gl3.UNSIGNED_BYTE, red);

    gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_WRAP_S, gl3.REPEAT);
    gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_WRAP_T, gl3.REPEAT);

    gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MAG_FILTER, gl3.LINEAR);
    gl3.texParameteri(gl3.TEXTURE_2D, gl3.TEXTURE_MIN_FILTER, gl3.LINEAR);

    var theta = 0;

    var circle_center = vec3(0.0, 2.0, -2.0);
    var radius = 2;

    var M = mat4(); //Identity matrix
    var d = -(circle_center[1] -(-1));
    M[3][3] = 0; //row //column
    M[3][1] = 1/d + 0.00001;


    function render() {
        gl3.clear(gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);
        //Background
        gl3.uniform1f(gl3.getUniformLocation(program, "visibility"), 1);
        gl3.uniform1i(gl3.getUniformLocation(program, "texMap"), 0);
        gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mat4()));
        gl3.drawArrays(gl3.TRIANGLES, 0, 6);

        //shadows
        //Do something here to make the shadows rotate 
        //Concatenate M with model view and translation matrices
         
        theta += 0.01;
        var x = circle_center[0] + (radius * Math.sin(theta));
        var y = circle_center[1];
        var z = circle_center[2] + (radius * Math.cos(theta));
        
        var translation_positive = translate(x, y, z);
        var translation_negative = translate(-x, -y, -z);

        var model_aux = mult(translation_positive, M);
        var model = mult(model_aux, translation_negative);

        gl3.uniform1f(gl3.getUniformLocation(program, "visibility"), 0);

        gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(model));
        gl3.uniform1i(gl3.getUniformLocation(program, "texMap"), 1);
        gl3.depthFunc(gl3.GREATER);
        gl3.drawArrays(gl3.TRIANGLES, 6, 12);


        //Other quads
        gl3.uniform1f(gl3.getUniformLocation(program, "visibility"), 1);
        gl3.uniform1i(gl3.getUniformLocation(program, "texMap"), 1);
        gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mat4()));
        gl3.depthFunc(gl3.LESS);
        gl3.drawArrays(gl3.TRIANGLES, 6, 12 );


        window.requestAnimFrame(render);
    }
    render();
}

init();