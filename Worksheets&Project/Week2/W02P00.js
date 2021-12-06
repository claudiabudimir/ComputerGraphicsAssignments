window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert("WebGL isn�t available");
    }

    var max_verts = 1000;
    var index = 0; var numPoints = 0;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var colors_global = [
        vec3(0.0, 0.0, 0.0), // Black
        vec3(1.0, 0.0, 0.0), // Red
        vec3(1.0, 1.0, 0.0), // Yellow
        vec3(0.0, 1.0, 0.0), // Green
        vec3(0.0, 0.0, 1.0), // Blue
        vec3(1.0, 0.0, 1.0), // Magenta
        vec3(0.0, 1.0, 1.0), // Cyan
        vec3(0.3921, 0.5843, 0.9294) //Cornflower                       // Cornflower
    ];

    var vertices = [vec2(1.0, 1.0), vec2(0.0, 0.0), vec2(1.0, 0.0)];
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    var colors = [vec3(0.0, 0.0, 0.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 0.0, 0.0)]; //black black black
    var c_buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, c_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var a_Color = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);


    canvas.addEventListener("click", function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        var rect = event.target.getBoundingClientRect();
        var p = vec2((-1 + 2 * (event.clientX - rect.left) / canvas.width), (-1 + 2 * (canvas.height - (event.clientY - rect.top)) / canvas.height));
        vertices.push(p);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, c_buffer);
        var color = document.getElementById("pointC");
        var value = color.options[color.selectedIndex].value;
        console.log(value);
        var c = vec3(colors_global[value][0], colors_global[value][1], colors_global[value][2])
        colors.push(c);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);


        index++;
    });
    render()

    clearCanvas.addEventListener("click", function () {
        var color = document.getElementById("canvasC");
        var value = color.options[color.selectedIndex].value;
        vertices = [];
        colors = [];

        gl.clearColor(colors_global[value][0], colors_global[value][1], colors_global[value][2], 1);
    });

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, vertices.length);
        window.requestAnimFrame(render, canvas);
    }
    render();




}