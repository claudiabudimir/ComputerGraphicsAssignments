function init() {
    canvas = document.getElementById("gl-canvas2");
    gl2 = WebGLUtils.setupWebGL(canvas);

    if (!gl2) {
        alert("WebGL isn�t available");
    }

    gl2.viewport(0, 0, canvas.width, canvas.height);
    gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    gl2.enable(gl2.DEPTH_TEST);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl2, "vertex-shader-2", "fragment-shader-2");
    gl2.useProgram(program);

    var fovy = 90.0; //angle in degrees
    var aspect = canvas.width / canvas.height;
    var near = 1.0;
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

    var p_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, p_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(all_points), gl2.STATIC_DRAW);

    var a_Position = gl2.getAttribLocation(program, "a_Position");
    gl2.vertexAttribPointer(a_Position, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Position);

    var t_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, t_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(all_tex), gl2.STATIC_DRAW);

    var a_TexCoord = gl2.getAttribLocation(program, "a_TexCoord");
    gl2.vertexAttribPointer(a_TexCoord, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_TexCoord);

    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        // Insert WebGL texture initialization her

        var texture = gl2.createTexture();
        gl2.activeTexture(gl2.TEXTURE0)
        gl2.bindTexture(gl2.TEXTURE_2D, texture);

        gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 0);
        
        gl2.pixelStorei(gl2.UNPACK_FLIP_Y_WEBGL, true);
        gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGB, gl2.RGB, gl2.UNSIGNED_BYTE, image);

        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.REPEAT);

        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
        // Insert WebGL texture initialization here
    };
    image.src = 'xamp23.png';

    var texture1 = gl2.createTexture();
    gl2.activeTexture(gl2.TEXTURE1);
    gl2.bindTexture(gl2.TEXTURE_2D, texture1);

    gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 1);

    var red = new Uint8Array([255, 0, 0]);
    gl2.texImage2D(gl2.TEXTURE_2D ,0,gl2.RGB, 1,1,0,gl2.RGB,gl2.UNSIGNED_BYTE, red);

    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.REPEAT);

    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);

    var theta = 0;

    var circle_center = vec3(0.0, 2.0, -2.0);
    var radius = 2;

    var M = mat4(); //Identity matrix
    var d = -(circle_center[1] -(-1));
    M[3][3] = 0; //row //column
    M[3][1] = 1/d + 0.00001;

    //Do something with this matrix



    function render() {
        gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
        //Background
        gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 0);
        gl2.drawArrays(gl2.TRIANGLES, 0, 6);

        //shadows
        //Do something here to make the shadows rotate 
         
        theta += 0.01;
        var x = circle_center[0] + (radius * Math.sin(theta));

        var y = circle_center[1];
        
        var z = circle_center[2] + (radius * Math.cos(theta));
        
        var translation_positive = translate(x, y, z);
        
        var translation_negative = translate(-x, -y, -z);

        var model_aux = mult(translation_positive, M);
        var model = mult(model_aux, translation_negative);

        //Concatenate M with model view and translation matrices


        gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(model));
        gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 1);
        gl2.depthFunc(gl2.GREATER);
        gl2.drawArrays(gl2.TRIANGLES, 6, 12);

        //Other quads
        gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 1);
        gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mat4()));
        gl2.depthFunc(gl2.LESS);
        gl2.drawArrays(gl2.TRIANGLES, 6, 12 );


        window.requestAnimFrame(render);
    }
    render();
}

init();