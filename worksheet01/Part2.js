"use strict";

function init() {
    //Init the canvas
    var canvas = document.getElementById("gl-canvas2");
    var gl2 = WebGLUtils.setupWebGL(canvas);

    //Clear
    gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl2, "vertex-shader-2", "fragment-shader-2");
    gl2.useProgram(program);

    //Init Points
    var vertices = [vec2(0.0, 0.0), vec2(1.0, 0.0), vec2(1.0, 1.0)];

    //Buffer Creation
    var vBuffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, vBuffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(vertices), gl2.STATIC_DRAW);

    var vPosition = gl2.getAttribLocation(program, "a_Position");
    gl2.vertexAttribPointer(vPosition, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(vPosition);

    gl2.drawArrays(gl2.POINTS, 0, 3);
}
init();