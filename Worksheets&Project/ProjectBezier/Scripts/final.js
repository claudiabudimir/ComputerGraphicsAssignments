function init() {

    canvas = document.getElementById("canvas20");
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
        vec3(1.0, 1.0, 1.0), // White
        vec3(1.0, 0.0, 0.0), // Red
        vec3(1.0, 1.0, 0.0), // Yellow
        vec3(0.0, 1.0, 0.0), // Green
        vec3(0.0, 0.0, 1.0), // Blue
        vec3(1.0, 0.0, 1.0), // Magenta
        vec3(0.0, 1.0, 1.0), // Cyan
        vec3(0.3921, 0.5843, 0.9294) //Cornflower
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
        window.requestAnimFrame(render, canvas);
    }
    render();

    var drawmode = 0;
    var tri_helper = 0;
    var circle_center;
    var circle_helper = 0;
    var quadratic_helper = [];
    var bezier_helper = [];

    var n_circle = 200;
    var np_curve = 200;
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

        switch (drawmode) {
            case 0:
                points.push(index);
                break;
            case 1:
                if (tri_helper < 2) {
                    tri_helper++;
                    points.push(index);
                }
                else if (tri_helper == 2) {
                    tri_helper = 0;
                    triangles.push(index);
                    points.pop();
                    points.pop();
                }
                break;
            case 2:
                if (circle_helper == 0) {
                    points.push(index);
                    circle_helper++;
                    circle_center = t;
                }
                else if (circle_helper == 1) {
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
                        addpoints(p, false);
                    }

                }
                break;
            case 3:
                points.push(index);
                quadratic_helper.push(t);

                if (quadratic_helper.length == 3) {
                    points.pop(); points.pop(); points.pop();
                    var allpq = getPointsOnQuadraticCurve(quadratic_helper, np_curve);

                    allpq.forEach(element => {
                        addpoints(element, true);
                    });
                    quadratic_helper = [];
                }
                break;
            case 4:
                points.push(index);
                bezier_helper.push(t);
                console.log("Here 1");
                if (bezier_helper.length == 4) {

                    console.log("Here 2"); 
                    points.pop(); points.pop(); points.pop(); points.pop();
                    var allpb = getPointsOnBezierCurve(bezier_helper, np_curve);

                    allpb.forEach(element => {
                        addpoints(element, true);
                    });
                    bezier_helper = [];
                }
                break;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec2'], flatten(t));

        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
        var color = document.getElementById("pointC20");
        var value = color.options[color.selectedIndex].value;
        var c = vec3(colors[value][0], colors[value][1], colors[value][2])
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec3'], flatten(c));


        numPoints = Math.max(numPoints, ++index);
        index %= max_verts;


    });

    var clearCanvas = document.getElementById("clear20");

    clearCanvas.addEventListener("click", function () {
        var color = document.getElementById("canvasC20");
        var value = color.options[color.selectedIndex].value;
        index = 0;
        points = [];
        triangles = [];
        circles = [];
        gl.clearColor(colors[value][0], colors[value][1], colors[value][2], 1);
    });


    var clear20 = document.getElementById("clear20");
    var points20 = document.getElementById("points20");
    var triangles20 = document.getElementById("triangles20");
    var circles20 = document.getElementById("circles20");
    var quadratic20 = document.getElementById("quadratic20");
    var bezier20 = document.getElementById("bezier20");

    clear20.addEventListener("click", function () {
        var color = document.getElementById("canvasC20");
        var value = color.options[color.selectedIndex].value;
        index = 0;
        points = [];
        triangles = [];
        circles = [];
        gl.clearColor(colors[value][0], colors[value][1], colors[value][2], 1);
    });

    points20.addEventListener("click", function () {
        drawmode = 0;
        desactivatehelpers();
    });

    triangles20.addEventListener("click", function () {
        drawmode = 1;
        desactivatehelpers();
    });

    circles20.addEventListener("click", function () {
        drawmode = 2;
        desactivatehelpers();
    });

    quadratic20.addEventListener("click", function () {
        drawmode = 3;
        desactivatehelpers();
    });

    bezier20.addEventListener("click", function () {
        drawmode = 4;
        desactivatehelpers();
    });

    var npoints20 = document.getElementById("npoints20");
    var npoints20v = document.getElementById("npoints20v");
    var npoints20i = np_curve;

    npoints20v.innerHTML = npoints20i;
    npoints20.addEventListener('input', function () {
        npoints20v.innerHTML = this.value;
        np_curve = parseFloat(npoints20v.innerHTML);
    });

    function desactivatehelpers() {
        bezier_helper = [];
        quadratic_helper = [];
        circle_helper = 0;
        tri_helper = 0;
    }

    function getPointOnQuadraticCurve(p, t) {
        const invT = (1 - t);
        var x = ((p[0][0] * invT * invT) + (p[1][0] * 2 * t * invT)
            + (p[2][0] * t * t));

        var y = ((p[0][1] * invT * invT) + (p[1][1] * 2 * t * invT)
            + (p[2][1] * t * t));

        var point = vec2(x, y);
        return point;
    }

    function getPointsOnQuadraticCurve(points, npoints) {
        const cpoints = [];
        for (let i = 0; i < npoints; ++i) {
            const t = i / (npoints - 1);
            cpoints.push(getPointOnQuadraticCurve(points, t));
        }
        return cpoints;
    }

    function getPointOnBezierCurve(p, t) {
        const invT = (1 - t);
        var x = ((p[0][0] * invT * invT * invT) + (p[1][0] * 3 * t * invT * invT)
            + (p[2][0] * 3 * invT * t * t) + (p[3][0] * t * t * t));

        var y = ((p[0][1] * invT * invT * invT) + (p[1][1] * 3 * t * invT * invT)
            + (p[2][1] * 3 * invT * t * t) + (p[3][1] * t * t * t));

        var point = vec2(x, y);
        return point;
    }

    function getPointsOnBezierCurve(points, npoints) {
        const cpoints = [];
        for (let i = 0; i < npoints; ++i) {
            const t = i / (npoints - 1);
            cpoints.push(getPointOnBezierCurve(points, t));
        }
        return cpoints;
    }

    function addpoints(element, bool) {
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec2'], flatten(element));

        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
        var color = document.getElementById("pointC20");
        var value = color.options[color.selectedIndex].value;
        var c = vec3(colors[value][0], colors[value][1], colors[value][2])
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec3'], flatten(c));

        if (bool == true)
            points.push(index);

        index++;
    }

};

init();