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

    var vertices = [ vec2(1.0, 1.0), vec2(0.0, 0.0), vec2(1.0, 0.0) ];
    var buffer = gl2.createBuffer();

    gl2.bindBuffer(gl2.ARRAY_BUFFER, buffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(vertices), gl2.STATIC_DRAW);

    var vPosition = gl2.getAttribLocation(program, "vPosition");
    gl2.vertexAttribPointer(vPosition, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(vPosition);
   // render();

   gl2.drawArrays(gl2.POINTS, 0, 3);


   
}

init();

