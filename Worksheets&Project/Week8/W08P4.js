function init() {
    canvas = document.getElementById("gl-canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas, { alpha: false });

    if (!gl4) {
        alert("WebGL isn�t available");
    }

    gl4.viewport(0, 0, canvas.width, canvas.height);
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl4.clear(gl4.COLOR_BUFFER_BIT);
    gl4.enable(gl4.DEPTH_TEST);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl4, "vertex-shader-4", "fragment-shader-4");
    gl4.useProgram(program);

    var fovy = 90.0; //angle in degrees
    var aspect = canvas.width / canvas.height;
    var near = 1.0;
    var far = 100.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 0.0);

    var projectMatrix = gl4.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl4.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl4.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

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

    var p_buffer = gl4.createBuffer();
    gl4.bindBuffer(gl4.ARRAY_BUFFER, p_buffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, flatten(all_points), gl4.STATIC_DRAW);

    var a_Position = gl4.getAttribLocation(program, "a_Position");
    gl4.vertexAttribPointer(a_Position, 3, gl4.FLOAT, false, 0, 0);
    gl4.enableVertexAttribArray(a_Position);

    var t_buffer = gl4.createBuffer();
    gl4.bindBuffer(gl4.ARRAY_BUFFER, t_buffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, flatten(all_tex), gl4.STATIC_DRAW);

    var a_TexCoord = gl4.getAttribLocation(program, "a_TexCoord");
    gl4.vertexAttribPointer(a_TexCoord, 2, gl4.FLOAT, false, 0, 0);
    gl4.enableVertexAttribArray(a_TexCoord);

    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        // Insert WebGL texture initialization her

        var texture = gl4.createTexture();
        gl4.activeTexture(gl4.TEXTURE0)
        gl4.bindTexture(gl4.TEXTURE_2D, texture);

        gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 0);
        
        gl4.pixelStorei(gl4.UNPACK_FLIP_Y_WEBGL, true);
        gl4.texImage2D(gl4.TEXTURE_2D, 0, gl4.RGB, gl4.RGB, gl4.UNSIGNED_BYTE, image);

        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_S, gl4.REPEAT);
        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_T, gl4.REPEAT);

        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MIN_FILTER, gl4.LINEAR);
        gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MAG_FILTER, gl4.LINEAR);
        // Insert WebGL texture initialization here
    };
    image.src = 'xamp23.png';

    var texture1 = gl4.createTexture();
    gl4.activeTexture(gl4.TEXTURE1);
    gl4.bindTexture(gl4.TEXTURE_2D, texture1);

    gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 1);

    var red = new Uint8Array([255, 0, 0]);
    gl4.texImage2D(gl4.TEXTURE_2D ,0,gl4.RGB, 1,1,0,gl4.RGB,gl4.UNSIGNED_BYTE, red);

    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_S, gl4.REPEAT);
    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_T, gl4.REPEAT);

    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MAG_FILTER, gl4.LINEAR);
    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MIN_FILTER, gl4.LINEAR);

    var theta = 0;

    var circle_center = vec3(0.0, 2.0, -2.0);
    var radius = 2;

    var M = mat4(); //Identity matrix
    var d = -(circle_center[1] -(-1));
    M[3][3] = 0; //row //column
    M[3][1] = 1/d + 0.00001;

    //Do something with this matrix


    function render() {
        gl4.clear(gl4.COLOR_BUFFER_BIT | gl4.DEPTH_BUFFER_BIT);
        gl4.enable(gl4.DEPTH_TEST);
        gl4.enable(gl4.BLEND);
        gl4.blendFunc(gl4.SRC_ALPHA, gl4.ONE_MINUS_SRC_ALPHA);


        //Background
        gl4.uniform1f(gl4.getUniformLocation(program, "visibility"), 1);
        gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 0);
        gl4.drawArrays(gl4.TRIANGLES, 0, 6);

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
        gl4.uniform1f(gl4.getUniformLocation(program, "visibility"), 0);
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(model));
        gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 1);
        gl4.depthFunc(gl4.GREATER);
        gl4.drawArrays(gl4.TRIANGLES, 6, 12);


        //Other quads
        gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 1);
        gl4.uniform1f(gl4.getUniformLocation(program, "visibility"), 1);
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mat4()));
        gl4.depthFunc(gl4.LESS);
        gl4.drawArrays(gl4.TRIANGLES, 6, 12 );


        window.requestAnimFrame(render);
    }
    render();
}

init();