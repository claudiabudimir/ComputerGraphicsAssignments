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

    gl2.enable(gl2.DEPTH_TEST);

    var fovy = 45.0; //angl2es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 12.0;

    var coordinates = [
        vec3(0.5, 0.5, 0.5),
        vec3(-0.5, 0.5, 0.5),
        vec3(-0.5, -0.5, 0.5),
        vec3(0.5, -0.5, 0.5),
        vec3(0.5, -0.5, -0.5),
        vec3(0.5, 0.5, -0.5),
        vec3(-0.5, 0.5, -0.5),
        vec3(-0.5, -0.5, -0.5)
    ];

    var colors = [
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0)
    ];

    var indices = [
       0, 1, 2,       //Front
       0, 2, 3, 
       
       0, 3, 4,       //Right
       0, 4, 5, 

       0, 5, 6,       //Up
       0, 6, 1, 

       1, 6, 7,       //Left
       1, 7, 2, 

       7, 4, 3,       //Down
       7, 3, 2, 

       4, 7, 6,       //Back
       4, 6, 5 
    ];

    var indices_lines = [
       0, 1,
       0, 3,
       3, 2,
       2, 1,
       1, 6,
       6, 7,
       7, 2,
       6, 5,
       5, 4,
       4, 7,
       5, 0,
       4, 3
      ];
    

    var c_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, c_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(colors), gl2.STATIC_DRAW);

    var a_Color = gl2.getAttribLocation(program, "a_Color");
    gl2.vertexAttribPointer(a_Color, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Color);

    var p_buffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, p_buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(coordinates), gl2.STATIC_DRAW);

    var a_Position = gl2.getAttribLocation(program, "a_Position");
    gl2.vertexAttribPointer(a_Position, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(a_Position);

    var iBuffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, iBuffer);
    //gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl2.STATIC_DRAW);
    gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices_lines), gl2.STATIC_DRAW);

    var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    pj = mult(pj, translate(0.0, 0.0, -1.0));
    pj = mult(pj, scalem(0.25, 0.25, 0.25));
    gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(pj));


    gl2.clear( gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);

    //gl2.drawElements(gl2.TRIANGLES, indices.length , gl2.UNSIGNED_BYTE, 0);
    gl2.drawElements(gl2.LINES, indices_lines.length , gl2.UNSIGNED_BYTE, 0);

}

init();