"use strict";

function init() {
    //Init the canvas
    var canvas = document.getElementById("gl-canvas4");
    var gl = WebGLUtils.setupWebGL(canvas);
    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl, "vertex-shader-4", "fragment-shader-4");
    gl.useProgram(program);

    //Init Points
    var vertices = [vec2(0.5, -0.5), vec2(0.5, 0.5), vec2(-0.5, 0.5), vec2(-0.5, -0.5)];

    //Buffer Creation
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var u_AngleLoc = gl.getUniformLocation(program, "u_AngleLoc");
    var angle = 0.0;

    function animate() {
        setTimeout(function() {

            //---Render Function---
            gl.clear(gl.COLOR_BUFFER_BIT);
            angle = angle + 0.01;
            gl.uniform1f(u_AngleLoc, angle);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            //---------------------

            requestAnimationFrame(animate);
        }, 16);
    }

    animate();
}
init();