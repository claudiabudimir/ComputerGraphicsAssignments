function init(){

	canvas = document.getElementById("gl-canvas1");
	gl1 = WebGLUtils.setupWebGL(canvas);

	if (!gl1) {
		alert("WebGL isn�t available");
	}

	gl1.viewport(0, 0, canvas.width, canvas.height);
	gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
	gl1.clear(gl1.COLOR_BUFFER_BIT);
}

init();