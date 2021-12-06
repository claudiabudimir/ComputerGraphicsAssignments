function init() {

    canvas = document.getElementById("gl-canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas);


    if (!gl4) {
        alert("WebGL isn�t available");
    }

    gl4.viewport(0, 0, canvas.width, canvas.height);
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);



    var program = initShaders(gl4, "vertex-shader-4", "fragment-shader-4");
    gl4.useProgram(program);

    var vertices = [vec2(0.0, 0.0), vec2(1.0, 0.0), vec2(1.0, 1.0), vec2(0.0, 1.0), vec2(0.0, 0.0), vec2(1.0, 1.0)];
    var v_buffer = gl4.createBuffer();

    // var move = vec2(0.5, 0.5);
    // vertices.forEach(function (entry) {
    //     console.log(entry + " entry")
    //     console.log(move + " move");
    //     entry = entry - move;
    //     console.log(entry + " final")
    // });

    var Tx = -0.5, Ty = -0.5, Tz = 0.0;
    var translation = gl4.getUniformLocation(program, 'translation');
    gl4.uniform4f(translation, Tx, Ty, Tz, 0.0);

    var c = Math.cos(Math.PI / 4); // = sin pi/4
    var s = Math.sin(Math.PI / 4);

    console.log(c);
    console.log(s);

    var rotation = gl4.getUniformLocation(program, "rotation");
    gl4.uniform4f(rotation, c, s, 1, 1);



    var theta = 0.0;
    var thetaLoc = gl4.getUniformLocation(program, "theta");


    gl4.bindBuffer(gl4.ARRAY_BUFFER, v_buffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, flatten(vertices), gl4.STATIC_DRAW,);

    var vPosition = gl4.getAttribLocation(program, "vPosition");
    gl4.vertexAttribPointer(vPosition, 2, gl4.FLOAT, false, 0, 0);
    gl4.enableVertexAttribArray(vPosition);

    // Added black and white color from Ex3

    var colors = [vec3(0.0,0.0,0.0), vec3(0.0,0.0,0.0), vec3(0.0,0.0,0.0),vec3(1.0,1.0,1.0), vec3(1.0,1.0,1.0), vec3(1.0,1.0,1.0)]; //red, green, blue
    var c_buffer = gl4.createBuffer();

    gl4.bindBuffer(gl4.ARRAY_BUFFER, c_buffer)
    gl4.bufferData(gl4.ARRAY_BUFFER, flatten(colors), gl4.STATIC_DRAW);

    var a_Color = gl4.getAttribLocation(program, "a_Color");
    gl4.vertexAttribPointer(a_Color, 3, gl4.FLOAT, false, 0, 0);
    gl4.enableVertexAttribArray(a_Color);

    //10 FPS FUNCTION RENDER SLOW

    // function render() {
    //     setTimeout(function () {
    //         requestAnimFrame(render);
    //         gl4.clear(gl4.COLOR_BUFFER_BIT);
    //         theta += 0.1;
    //         gl4.uniform1f(thetaLoc, theta);
    //         gl4.drawArrays(gl4.TRIANGLES, 0, vertices.length);
    //     }, 100);
    // }

    // FAST RENDER FUNCTION FAST 60 FPS

    function render() {
        gl4.clear(gl4.COLOR_BUFFER_BIT);
        theta += 0.01;
        gl4.uniform1f(thetaLoc, theta);
        gl4.drawArrays(gl4.TRIANGLES, 0, vertices.length);
        requestAnimFrame(render);
    }

    render();

    // gl4.clear(gl4.COLOR_BUFFER_BIT);
    // gl4.drawArrays(gl4.TRIANGLES, 0, vertices.length);
}

init()
