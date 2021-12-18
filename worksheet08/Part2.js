function init() {
    canvas = document.getElementById("gl-canvas2");
    gl2 = WebGLUtils.setupWebGL(canvas);

    gl2.viewport(0, 0, canvas.width, canvas.height);
    gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    gl2.enable(gl2.DEPTH_TEST);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl2, "vertex-shader-2", "fragment-shader-2");
    gl2.useProgram(program);

    //perspective camera with a 90° field of view.
    var fovy = 90.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 10.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 0.0);

    var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl2.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //initialize vertices, textures and colors vectors
    var ground = [vec3(-2.0, -1.0, -1.0), vec3(-2.0, -1.0, -5.0), vec3(2.0, -1.0, -1.0), vec3(2.0, -1.0, -5.0)];
    var quad1 = [vec3(0.25, -0.5, -1.25), vec3(0.25, -0.5, -1.75), vec3(0.75, -0.5, -1.25), vec3(0.75, -0.5, -1.75)];
    var quad2 = [vec3(-1.0, -1.0, -2.5), vec3(-1.0, -1.0, -3.0), vec3(-1.0, 0.0, -2.5), vec3(-1.0, 0.0, -3.0)];
    var tex_coord = [vec2(-1.0, 1.0), vec2(-1.0, -1.0), vec2(1.0, 1.0), vec2(1.0, -1.0)]; 

    var vertices_coordinates =[ ground[2], ground[0], ground[1], ground[1], ground[3], ground[2], quad1[2], quad1[0], quad1[1], quad1[1], quad1[3], quad1[2], quad2[2], quad2[0], quad2[1], quad2[1], quad2[3], quad2[2] ] ;
    var textures_coordinates = [tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2], tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2], tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2]];
    
    //vertices buffer creation
    var p_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, p_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(vertices_coordinates), gl2.STATIC_DRAW);

    var a_Position = gl2.getAttribLocation(program, "a_Position");
    gl2.vertexAttribPointer(a_Position, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Position);

    //textures buffer creation
    var t_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, t_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(textures_coordinates), gl2.STATIC_DRAW);

    var a_TexCoord = gl2.getAttribLocation(program, "a_TexCoord");
    gl2.vertexAttribPointer(a_TexCoord, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_TexCoord);
    
    //load and set texture image
    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
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
    };
    image.src = 'xamp23.png';

    //create a texture object and bind it as the current 2D texture object 
    var texture1 = gl2.createTexture();
    gl2.activeTexture(gl2.TEXTURE1);
    gl2.bindTexture(gl2.TEXTURE_2D, texture1);
    //we link the created texture to the sampler fragment shader, where texMap is the sampler name in the fragment shader
    gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 1);

    //we specify that this array is to be used as a two-dimentional texture
    var red = new Uint8Array([255, 0, 0]);
    gl2.texImage2D(gl2.TEXTURE_2D ,0,gl2.RGB, 1,1,0,gl2.RGB,gl2.UNSIGNED_BYTE, red);

    //specify option for wrappimng/ magnification and minification as nearest point sampling
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.REPEAT);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.REPEAT);

    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
    
    //introduce an animated point light that circles the scene with circle center (0, 2, −2) and radius 2.
    var theta = 0;
    var light = vec3(0.0, 2.0, -2.0);
    var m = mat4();// Shadow projection matrix initially an identity matrix
    var d = -(light[1] -(-1));
    m[3][3] = 0.0;
    m[3][1] = 1.0/d + 0.0005;

    function render() {
        gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
       
        //Background
        gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 0);//texture0 for background
        gl2.drawArrays(gl2.TRIANGLES, 0, 6);

        if(theta > 2 * Math.PI)
            theta -= 2 * Math.PI;
        else
            theta += 0.01;

        // Rotate light source
        light[0] = 2*Math.sin(theta);
        light[2] = 2*Math.cos(theta);
        
        // Model-view matrix for shadow then render
        modelViewMatrix = mult(modelViewMatrix, translate(light[0], light[1],light[2]));
        modelViewMatrix = mult(modelViewMatrix, m);
        modelViewMatrix = mult(modelViewMatrix, translate(-light[0],-light[1], -light[2]));
        gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
        gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 1);
        gl2.depthFunc(gl2.GREATER);
        gl2.drawArrays(gl2.TRIANGLES, 6, 12);

        //Smaller quads
        gl2.uniform1i(gl2.getUniformLocation(program, "texMap"), 1);//texture1 for smaller quads
        gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mat4()));
        gl2.depthFunc(gl2.LESS);
        gl2.drawArrays(gl2.TRIANGLES, 6, 12 );
        window.requestAnimFrame(render);
    }
    render();
}

init();