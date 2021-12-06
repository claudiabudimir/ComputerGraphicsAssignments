"use strict";

function init() {
    //Init the canvas
    var canvas = document.getElementById("gl-canvas1");
    var gl = WebGLUtils.setupWebGL(canvas);

    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
init();