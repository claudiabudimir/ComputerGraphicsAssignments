window.onload = function init() {

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert("WebGL isn�t available");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var colors = [
        vec3(0.0, 0.0, 0.0), // Black
        vec3(1.0, 0.0, 0.0), // Red
        vec3(1.0, 1.0, 0.0), // Yellow
        vec3(0.0, 1.0, 0.0), // Green
        vec3(0.0, 0.0, 1.0), // Blue
        vec3(1.0, 0.0, 1.0), // Magenta
        vec3(0.0, 1.0, 1.0), // Cyan
        vec3(0.3921, 0.5843, 0.9294) //Cornflower                       // Cornflower
    ];

    var points = [0, 1, 2];
    var triangles = [];
    var circles = [];


    var vertices = [vec2(1.0, 1.0), vec2(0.0, 0.0), vec2(1.0, 0.0)];
    var initial_colors = [vec3(0.0, 0.0, 0.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 0.0, 0.0)];

    var max_verts = 1000000;
    var index = 3; var numPoints = 0;

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, max_verts * sizeof['vec2'], gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)

    gl.bufferData(gl.ARRAY_BUFFER, max_verts * sizeof['vec3'], gl.STATIC_DRAW)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(initial_colors));

    var a_Color = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            gl.drawArrays(gl.POINTS, p, 1);
        }
        for (var i = 0; i < triangles.length; i++) {
            var p = triangles[i];
            gl.drawArrays(gl.TRIANGLES, p - 2, 3);
        }
        for (var i = 0; i < circles.length; i++) {
            var p = circles[i];
            gl.drawArrays(gl.TRIANGLE_FAN, p - 1, n_circle + 2);
        }
        requestAnimationFrame(render);
    }
    render();

    var draw = 0;
    var tri_helper = 0;
    var circle_center;
    var circle_helper = 0;

    var n_circle = 200;
    var radius;

    function getCircleX(radians, radius) {
        return Math.cos(radians) * radius;
    }

    function getCircleY(radians, radius) {
        return Math.sin(radians) * radius;
    }



    canvas.addEventListener("click", function () {

        var rect = event.target.getBoundingClientRect();
        var t = vec2((-1 + 2 * (event.clientX - rect.left) / canvas.width), (-1 + 2 * (canvas.height - (event.clientY - rect.top)) / canvas.height));

        if (draw == gl.POINTS) {
            points.push(index);
        }
        else if (draw == gl.TRIANGLES && tri_helper < 2) {
            tri_helper++;
            points.push(index);
        }

        else if (draw == gl.TRIANGLES && tri_helper == 2) {
            tri_helper = 0;
            triangles.push(index);
            points.pop();
            points.pop();
        }

        if (draw == gl.TRIANGLE_FAN && circle_helper == 0) {
            points.push(index);
            circle_helper++;
            circle_center = t;
        }

        else if (draw == gl.TRIANGLE_FAN && circle_helper == 1) {
            circle_helper = 0;
            var x = Math.pow(t[0] - circle_center[0], 2);
            var y = Math.pow(t[1] - circle_center[1], 2);
            radius = Math.sqrt((x + y));
            points.pop();
            circles.push(index);

            for (var j = 0; j <= n_circle; j++) {


                var angle = 2 * Math.PI * j / n_circle;
                var x = getCircleX(angle, radius) + circle_center[0];
                var y = getCircleY(angle, radius) + circle_center[1];
                var p = vec2(x, y);

                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec2'], flatten(p));

                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
                var color = document.getElementById("pointC");
                var value = color.options[color.selectedIndex].value;
                var c = vec3(colors[value][0], colors[value][1], colors[value][2])
                gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec3'], flatten(c));

                index++;
            }

        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec2'], flatten(t));

        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
        var color = document.getElementById("pointC");
        var value = color.options[color.selectedIndex].value;
        var c = vec3(colors[value][0], colors[value][1], colors[value][2])
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec3'], flatten(c));


        numPoints = Math.max(numPoints, ++index);
        index %= max_verts;


    });

    var clearCanvas = document.getElementById("clearCanvas");

    clearCanvas.addEventListener("click", function () {
        var color = document.getElementById("canvasC");
        var value = color.options[color.selectedIndex].value;
        index = 0;
        points = [];
        triangles = [];
        circles = [];
        gl.clearColor(colors[value][0], colors[value][1], colors[value][2], 1);
    });

    addPoints.addEventListener("click", function () {
        draw = gl.POINTS;
    });

    addTriangles.addEventListener("click", function () {
        draw = gl.TRIANGLES;
    });

    addCircles.addEventListener("click", function () {
        draw = gl.TRIANGLE_FAN;
    });

}