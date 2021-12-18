function init() {
    canvas = document.getElementById("gl-canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas);

    gl4.viewport(0, 0, canvas.width, canvas.height);
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl4.clear(gl4.COLOR_BUFFER_BIT);
    gl4.enable(gl4.DEPTH_TEST);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl4, "vertex-shader-4", "fragment-shader-4");
    gl4.useProgram(program);

    //perspective camera with a 90° field of view.
    var fovy = 90.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 10.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 0.0);

    var projectMatrix = gl4.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl4.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl4.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //initialize vertices, textures and colors vectors
    var ground = [vec3(-2.0, -1.0, -1.0), vec3(-2.0, -1.0, -5.0), vec3(2.0, -1.0, -1.0), vec3(2.0, -1.0, -5.0)];
    var quad1 = [vec3(0.25, -0.5, -1.25), vec3(0.25, -0.5, -1.75), vec3(0.75, -0.5, -1.25), vec3(0.75, -0.5, -1.75)];
    var quad2 = [vec3(-1.0, -1.0, -2.5), vec3(-1.0, -1.0, -3.0), vec3(-1.0, 0.0, -2.5), vec3(-1.0, 0.0, -3.0)];
    var tex_coord = [vec2(-1.0, 1.0), vec2(-1.0, -1.0), vec2(1.0, 1.0), vec2(1.0, -1.0)]; 

    var vertices_coordinates =[ ground[2], ground[0], ground[1], ground[1], ground[3], ground[2], quad1[2], quad1[0], quad1[1], quad1[1], quad1[3], quad1[2], quad2[2], quad2[0], quad2[1], quad2[1], quad2[3], quad2[2] ] ;
    var textures_coordinates = [tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2], tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2], tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2]];
    
    //vertices buffer creation
    var p_buffer = gl4.createBuffer();
    gl4.bindBuffer(gl4.ARRAY_BUFFER, p_buffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, flatten(vertices_coordinates), gl4.STATIC_DRAW);

    var a_Position = gl4.getAttribLocation(program, "a_Position");
    gl4.vertexAttribPointer(a_Position, 3, gl4.FLOAT, false, 0, 0);
    gl4.enableVertexAttribArray(a_Position);

    //textures buffer creation
    var t_buffer = gl4.createBuffer();
    gl4.bindBuffer(gl4.ARRAY_BUFFER, t_buffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, flatten(textures_coordinates), gl4.STATIC_DRAW);

    var a_TexCoord = gl4.getAttribLocation(program, "a_TexCoord");
    gl4.vertexAttribPointer(a_TexCoord, 2, gl4.FLOAT, false, 0, 0);
    gl4.enableVertexAttribArray(a_TexCoord);
    
    //load and set texture image
    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
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
    };
    image.src = 'xamp23.png';

    //create a texture object and bind it as the current 2D texture object 
    var texture1 = gl4.createTexture();
    gl4.activeTexture(gl4.TEXTURE1);
    gl4.bindTexture(gl4.TEXTURE_2D, texture1);
    //we link the created texture to the sampler fragment shader, where texMap is the sampler name in the fragment shader
    gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 1);

    //we specify that this array is to be used as a two-dimentional texture
    var red = new Uint8Array([255, 0, 0]);
    gl4.texImage2D(gl4.TEXTURE_2D ,0,gl4.RGB, 1,1,0,gl4.RGB,gl4.UNSIGNED_BYTE, red);

    //specify option for wrappimng/ magnification and minification as nearest point sampling
    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_S, gl4.REPEAT);
    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_WRAP_T, gl4.REPEAT);

    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MAG_FILTER, gl4.LINEAR);
    gl4.texParameteri(gl4.TEXTURE_2D, gl4.TEXTURE_MIN_FILTER, gl4.LINEAR);
    
    //introduce an animated point light that circles the scene with circle center (0, 2, −2) and radius 2.
    var theta = 0;
    var light = vec3(0.0, 2.0, -2.0);
    var m = mat4();// Shadow projection matrix initially an identity matrix
    m[3][3] = 0.0;
    m[3][1] = -1.0/(light[1]+1) + 0.0001;

    function render() {
        gl4.clear(gl4.COLOR_BUFFER_BIT | gl4.DEPTH_BUFFER_BIT);
        gl4.enable(gl4.DEPTH_TEST);
        gl4.enable(gl4.BLEND);
        gl4.blendFunc(gl4.SRC_ALPHA, gl4.ONE_MINUS_SRC_ALPHA);
       
        //Background
        gl4.uniform1f(gl4.getUniformLocation(program, "visibility"), 1);// background should be visible
        gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 0);//texture0 for background
        gl4.drawArrays(gl4.TRIANGLES, 0, 6);

        if(theta > 2 * Math.PI)
            theta -= 2 * Math.PI;
        else
            theta += 0.01;

        // Rotate light source
        light[0] = 2*Math.sin(theta);
        light[2] = 2*Math.cos(theta);
        
        // Model-view matrix for shadow then render
        gl4.uniform1f(gl4.getUniformLocation(program, "visibility"), 0);// shadows should be invisible

        modelViewMatrix = mult(modelViewMatrix, translate(light[0], light[1],light[2]));
        modelViewMatrix = mult(modelViewMatrix, m);
        modelViewMatrix = mult(modelViewMatrix, translate(-light[0],-light[1], -light[2]));
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
        gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 1);
        gl4.depthFunc(gl4.GREATER);
        gl4.drawArrays(gl4.TRIANGLES, 6, 12);

        //Smaller quads
        gl4.uniform1f(gl4.getUniformLocation(program, "visibility"), 1);// quads should be visible
        gl4.uniform1i(gl4.getUniformLocation(program, "texMap"), 1);//texture1 for smaller quads
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(mat4()));
        gl4.depthFunc(gl4.LESS);
        gl4.drawArrays(gl4.TRIANGLES, 6, 12 );
        window.requestAnimFrame(render);
    }
    render();
}

init();