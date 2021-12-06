function init() {

    canvas = document.getElementById("gl-canvas3");
    gl3 = WebGLUtils.setupWebGL(canvas);

    if (!gl3) {
        alert("WebGL isn�t available");
    }

    gl3.viewport(0, 0, canvas.width, canvas.height);
    gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl3.clear(gl3.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl3, "vertex-shader-3", "fragment-shader-3");
    gl3.useProgram(program);

    gl3.enable(gl3.DEPTH_TEST);

    var fovy = 45.0; //angl3es in degrees
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
    

    var c_buffer = gl3.createBuffer();
    gl3.bindBuffer(gl3.ARRAY_BUFFER, c_buffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, flatten(colors), gl3.STATIC_DRAW);

    var a_Color = gl3.getAttribLocation(program, "a_Color");
    gl3.vertexAttribPointer(a_Color, 3, gl3.FLOAT, false, 0, 0);
    gl3.enableVertexAttribArray(a_Color);

    var p_buffer = gl3.createBuffer();
    gl3.bindBuffer(gl3.ARRAY_BUFFER, p_buffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, flatten(coordinates), gl3.STATIC_DRAW);

    var a_Position = gl3.getAttribLocation(program, "a_Position");
    gl3.vertexAttribPointer(a_Position, 3, gl3.FLOAT, false, 0, 0);
    gl3.enableVertexAttribArray(a_Position);

    var iBuffer = gl3.createBuffer();
    gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, iBuffer);
    //gl3.bufferData(gl3.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl3.STATIC_DRAW);
    gl3.bufferData(gl3.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices_lines), gl3.STATIC_DRAW);


    const up = vec3(0.0, 1.0, 0.0);


    var projectMatrix = gl3.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);

    gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl3.getUniformLocation(program, "modelViewMatrix");

    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 4.5);
    var modelViewMatrix = lookAt(eye, at, up);
    modelViewMatrix = mult(modelViewMatrix, translate(vec3(-1.0, 1.0, 0.0)));
    gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));


    gl3.clear( gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);

    //gl3.drawElements(gl3.TRIANGLES, indices.length , gl3.UNSIGNED_BYTE, 0);
    gl3.drawElements(gl3.LINES, indices_lines.length , gl3.UNSIGNED_BYTE, 0);


    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(4.5, 0.0, 4.5);
    modelViewMatrix = lookAt(eye, at, up);
    modelViewMatrix = mult(modelViewMatrix, translate(vec3(1.5, 1.0, 0.0)));
    gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //gl3.drawElements(gl3.TRIANGLES, indices.length , gl3.UNSIGNED_BYTE, 0);

    gl3.drawElements(gl3.LINES, indices_lines.length , gl3.UNSIGNED_BYTE, 0);

    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(2.5, 2.5, 2.5);
    modelViewMatrix = lookAt(eye, at, up);
    modelViewMatrix = mult(modelViewMatrix, translate(vec3(0.0, -1.0, 0.0)));
    gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //gl3.drawElements(gl3.TRIANGLES, indices.length , gl3.UNSIGNED_BYTE, 0);

    gl3.drawElements(gl3.LINES, indices_lines.length , gl3.UNSIGNED_BYTE, 0);

}

init();