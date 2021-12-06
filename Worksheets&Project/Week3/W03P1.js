function init() {

    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    if (!gl1) {
        alert("WebGL isn�t available");
    }

    gl1.viewport(0, 1, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl1, "vertex-shader-1", "fragment-shader-1");
    gl1.useProgram(program);

    gl1.enable(gl1.DEPTH_TEST);

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

    var coordinates_lines = [
        vec3(0.5, 0.5, 0.5),
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


    var eye = vec3(0, 0, 0);
    var at = vec3(0.5, 0.5, 0.5);
    var up = vec3(0.0, 1.0, 0.0);  

    var iBuffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ELEMENT_ARRAY_BUFFER, iBuffer);
    //gl1.bufferData(gl1.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl1.STATIC_DRAW);
    gl1.bufferData(gl1.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices_lines), gl1.STATIC_DRAW);

    var c_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, c_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(colors), gl1.STATIC_DRAW);

    var a_Color = gl1.getAttribLocation(program, "a_Color");
    gl1.vertexAttribPointer(a_Color, 3, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_Color);


    var p_buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, p_buffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(coordinates), gl1.STATIC_DRAW);

    var a_Position = gl1.getAttribLocation(program, "a_Position");
    gl1.vertexAttribPointer(a_Position, 3, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(a_Position);

    //Attempt for the diagonal
    //var tLoc = gl1.getUniformLocation(program, "translation");
    //var translation = translate(0,0,0.0);
    //gl1.uniformMatrix4fv(tLoc, gl1.FALSE, flatten(translation));

    var viewMatrix = gl1.getUniformLocation(program, 'modelViewMatrix');
    vm = lookAt(eye, at, up);
    gl1.uniformMatrix4fv(viewMatrix, gl1.FALSE, flatten(vm));

    gl1.clear( gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);

    //gl1.drawElements(gl1.TRIANGLES, indices.length , gl1.UNSIGNED_BYTE, 0);
    gl1.drawElements(gl1.LINES, indices_lines.length , gl1.UNSIGNED_BYTE, 0);

}

init();