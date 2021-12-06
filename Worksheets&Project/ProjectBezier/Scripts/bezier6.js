function init() {

    canvas = document.getElementById("canvas14");
    gl14 = WebGLUtils.setupWebGL(canvas);

    if (!gl14) {
        alert("Webgl4 isn�t available");
    }

    gl14.viewport(0, 0, canvas.width, canvas.height);
    gl14.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl14.clear(gl14.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl14, "vertex-shader", "fragment-shader");
    gl14.useProgram(program);

    var allpoints = [];

    var vBuffer = gl14.createBuffer();
    gl14.bindBuffer(gl14.ARRAY_BUFFER, vBuffer);
    gl14.bufferData(gl14.ARRAY_BUFFER, flatten(allpoints), gl14.STATIC_DRAW);

    var vPosition = gl14.getAttribLocation(program, "vPosition");
    gl14.vertexAttribPointer(vPosition, 2, gl14.FLOAT, false, 0, 0);
    gl14.enableVertexAttribArray(vPosition);

    function render() {
        gl14.clear(gl14.COLOR_BUFFER_BIT);

        gl14.bindBuffer(gl14.ARRAY_BUFFER, vBuffer);
        gl14.bufferData(gl14.ARRAY_BUFFER, flatten(allpoints), gl14.STATIC_DRAW);
        gl14.drawArrays(gl14.TRIANGLE_FAN, 0, allpoints.length);
        window.requestAnimFrame(render, canvas);
    }

    render();

    var barr = [];
    var bp = 20;

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

    canvas.addEventListener("click", function () {

        var rect = event.target.getBoundingClientRect();
        var t = vec2((-1 + 2 * (event.clientX - rect.left) / canvas.width), (-1 + 2 * (canvas.height - (event.clientY - rect.top)) / canvas.height));
        barr.push(t);
        allpoints.push(t);

        if (barr.length == 4) {
            for (var i = 0; i < 4; i++)
                allpoints.pop();
            var curve = getPointsOnBezierCurve(barr, bp);
            curve.forEach(p => {
                allpoints.push(p);
            });
            barr = [];
        }

    });

    var clear14 = document.getElementById("clear14");
    clear14.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints14 = document.getElementById("npoints14");
    var npoints14v = document.getElementById("npoints14v");
    var npoints14i = bp;

    npoints14v.innerHTML = npoints14i;
    npoints14.addEventListener('input', function(){
        npoints14v.innerHTML = this.value;
        bp = parseFloat(npoints14v.innerHTML);     
    });

};


init();