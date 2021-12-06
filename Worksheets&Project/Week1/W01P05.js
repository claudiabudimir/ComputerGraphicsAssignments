function init() {

    canvas = document.getElementById("gl-canvas5");
    gl5 = WebGLUtils.setupWebGL(canvas);

    if (!gl5) {
        alert("WebGL isn�t available");
    }

    gl5.viewport(0, 0, canvas.width, canvas.height);
    gl5.clearColor(0.3921, 0.5843, 0.9294, 1.0);


    var program = initShaders(gl5, "vertex-shader-5", "fragment-shader-5");
    gl5.useProgram(program);

    var pos = [vec2(0.0, 0.0)];
    var colors = [vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)];

    var radius = 0.2;

    var n = 200;

    var i;

    function getCircleX(radians, radius) {
        return Math.cos(radians) * radius;
    }

    function getCircleY(radians, radius) {
        return Math.sin(radians) * radius;
    }

    var b_w = 0;

    for (i = 0; i <= n; i++) {


        var angl5e = 2 * Math.PI * i / n
        var x = getCircleX(angl5e, radius);
        var y = getCircleY(angl5e, radius);
        var position_tmp = vec2(x, y);

        // Black and White color circle
        if (b_w == 0) {
            var color_tmp = vec3(0.0, 0.0, 0.0);
            b_w = 1;
        }
        else {
            var color_tmp = vec3(1.0, 1.0, 1.0);
            b_w = 0;
        }
        pos.push(position_tmp);
        colors.push(color_tmp);
    }
    console.log(pos);

    var p_buffer = gl5.createBuffer()

    gl5.bindBuffer(gl5.ARRAY_BUFFER, p_buffer);
    gl5.bufferData(gl5.ARRAY_BUFFER, flatten(pos), gl5.STATIC_DRAW);

    var vPosition = gl5.getAttribLocation(program, "vPosition");
    gl5.vertexAttribPointer(vPosition, 2, gl5.FLOAT, false, 0, 0);
    gl5.enableVertexAttribArray(vPosition);

    var c_buffer = gl5.createBuffer();

    gl5.bindBuffer(gl5.ARRAY_BUFFER, c_buffer)
    gl5.bufferData(gl5.ARRAY_BUFFER, flatten(colors), gl5.STATIC_DRAW);

    var a_Color = gl5.getAttribLocation(program, "a_Color");
    gl5.vertexAttribPointer(a_Color, 3, gl5.FLOAT, false, 0, 0);
    gl5.enableVertexAttribArray(a_Color);

    var Ty = 0.0;
    var mov = gl5.getUniformLocation(program, 'mov');

    //Just circle

    // gl5.uniform4f(mov, 0.0, 0, 1.0, 0.0);

    // gl5.clear(gl5.COLOR_BUFFER_BIT);
    // gl5.drawArrays(gl5.TRIANGLE_FAN, 0, n + 2);

    //Animation

    var down = 1;

    function render() {

        if (down == 0 ) Ty += 0.01;
        else if (down == 1)  Ty -= 0.01;
        
        gl5.clear(gl5.COLOR_BUFFER_BIT);
        gl5.uniform4f(mov, 0.0, Ty, 1.0, 0.0);
        gl5.drawArrays(gl5.TRIANGLE_FAN, 0, n + 2);
        requestAnimFrame(render);

        if(down == 1 && Ty <= radius -1 ) down = 0;
        else if (down == 0 && Ty>=1-radius) down = 1;
    }

    render();
}

init();