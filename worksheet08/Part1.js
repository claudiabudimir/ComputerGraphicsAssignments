function init() {
    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);
    gl1.enable(gl1.DEPTH_TEST);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl1, "vertex-shader-1", "fragment-shader-1");
    gl1.useProgram(program);

    //perspective camera with a 90° field of view.
    var fovy = 90.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.001;
    var far = 40.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 0.0);

    var projectMatrix = gl1.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl1.uniformMatrix4fv(projectMatrix, false, flatten(pj));

    var modelViewMatrixLoc = gl1.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //initialize vertices, textures and colors vectors
    var ground = [vec3(-2.0, -1.0, -1.0), vec3(-2.0, -1.0, -5.0), vec3(2.0, -1.0, -1.0), vec3(2.0, -1.0, -5.0)];
    var quad1 = [vec3(0.25, -0.5, -1.25), vec3(0.25, -0.5, -1.75), vec3(0.75, -0.5, -1.25), vec3(0.75, -0.5, -1.75)];
    var quad2 = [vec3(-1.0, -1.0, -2.5), vec3(-1.0, -1.0, -3.0), vec3(-1.0, 0.0, -2.5), vec3(-1.0, 0.0, -3.0)];
    var tex_coord = [vec2(-1.0, 1.0), vec2(-1.0, -1.0), vec2(1.0, 1.0), vec2(1.0, -1.0)]; 

    var vertices_coordinates =[ ground[2], ground[0], ground[1], ground[1], ground[3], ground[2], quad1[2], quad1[0], quad1[1], quad1[1], quad1[3], quad1[2], quad2[2], quad2[0], quad2[1], quad2[1], quad2[3], quad2[2] ] ;
    var textures_coordinates = [tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2], tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2], tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2]];
    
    //vertices buffer creation
    var p_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, p_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(vertices_coordinates), gl1.STATIC_DRAW);

    var a_Position = gl1.getAttribLocation(program, "a_Position");
    gl1.vertexAttribPointer(a_Position, 3, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_Position);

    //textures buffer creation
    var t_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, t_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(textures_coordinates), gl1.STATIC_DRAW);

    var a_TexCoord = gl1.getAttribLocation(program, "a_TexCoord");
    gl1.vertexAttribPointer(a_TexCoord, 2, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_TexCoord);
    
    //load and set texture image
    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
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
    };
    image.src = 'xamp23.png';

    //create a texture object and bind it as the current 2D texture object 
    var texture1 = gl1.createTexture();
    gl1.activeTexture(gl1.TEXTURE1);
    gl1.bindTexture(gl1.TEXTURE_2D, texture1);
    //we link the created texture to the sampler fragment shader, where texMap is the sampler name in the fragment shader
    gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 1);

    //we specify that this array is to be used as a two-dimentional texture
    var red = new Uint8Array([255, 0, 0]);
    gl1.texImage2D(gl1.TEXTURE_2D ,0,gl1.RGB, 1,1,0,gl1.RGB,gl1.UNSIGNED_BYTE, red);

    //specify option for wrappimng/ magnification and minification as nearest point sampling
    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_S, gl1.REPEAT);
    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_T, gl1.REPEAT);

    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MAG_FILTER, gl1.LINEAR);
    gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);


    function render() {
        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);
        //Background
        gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 0);//texture0 for background
        gl1.drawArrays(gl1.TRIANGLES, 0, 6);

        //Smaller quads
        gl1.uniform1i(gl1.getUniformLocation(program, "texMap"), 1);//texture1 for quads
        gl1.drawArrays(gl1.TRIANGLES, 6, 12 );
        window.requestAnimFrame(render);
    }
    render();
}

init();