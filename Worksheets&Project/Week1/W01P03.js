function init() {

    canvas = document.getElementById("gl-canvas3");
    gl3 = WebGLUtils.setupWebGL(canvas);

    if (!gl3) {
        alert("WebGL isn�t available");
    }

    gl3.viewport(0, 0, canvas.width, canvas.height);
    gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    

    
    var program = initShaders(gl3, "vertex-shader-3", "fragment-shader-3");
    gl3.useProgram(program);

    var vertices = [vec2(0.0, 0.0), vec2(1.0, 0.0), vec2(1.0, 1.0)];
    var v_buffer = gl3.createBuffer();

    gl3.bindBuffer(gl3.ARRAY_BUFFER, v_buffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, flatten(vertices), gl3.STATIC_DRAW);

    var vPosition = gl3.getAttribLocation(program, "vPosition");
    gl3.vertexAttribPointer(vPosition, 2, gl3.FLOAT, false, 0, 0);
    gl3.enableVertexAttribArray(vPosition);
    
    // Exercise 3

    var colors = [vec3(0.0,1.0,0.0), vec3(1.0,0.0,0.0), vec3(0.0,0.0,1.0)]; //red, green, blue
    var c_buffer = gl3.createBuffer();

    gl3.bindBuffer(gl3.ARRAY_BUFFER, c_buffer)
    gl3.bufferData(gl3.ARRAY_BUFFER, flatten(colors), gl3.STATIC_DRAW);

    var a_Color = gl3.getAttribLocation(program, "a_Color");
    gl3.vertexAttribPointer(a_Color, 3, gl3.FLOAT, false, 0, 0);
    gl3.enableVertexAttribArray(a_Color);

    gl3.clear(gl3.COLOR_BUFFER_BIT);
    gl3.drawArrays(gl3.TRIANGLES, 0, vertices.length);
}

init();

