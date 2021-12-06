function init() {

    canvas = document.getElementById("canvas12");
    gl12 = WebGLUtils.setupWebGL(canvas);

    if (!gl12) {
        alert("Webgl4 isn�t available");
    }

    gl12.viewport(0, 0, canvas.width, canvas.height);
    gl12.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl12.clear(gl12.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl12, "vertex-shader", "fragment-shader");
    gl12.useProgram(program);

    var allpoints = [];

    var vBuffer = gl12.createBuffer();
    gl12.bindBuffer(gl12.ARRAY_BUFFER, vBuffer);
    gl12.bufferData(gl12.ARRAY_BUFFER, flatten(allpoints), gl12.STATIC_DRAW);

    var vPosition = gl12.getAttribLocation(program, "vPosition");
    gl12.vertexAttribPointer(vPosition, 2, gl12.FLOAT, false, 0, 0);
    gl12.enableVertexAttribArray(vPosition);

    function render() {
        gl12.clear(gl12.COLOR_BUFFER_BIT);

        gl12.bindBuffer(gl12.ARRAY_BUFFER, vBuffer);
        gl12.bufferData(gl12.ARRAY_BUFFER, flatten(allpoints), gl12.STATIC_DRAW);
        gl12.drawArrays(gl12.TRIANGLE_STRIP, 0, allpoints.length);
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

    var clear12 = document.getElementById("clear12");
    clear12.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints12 = document.getElementById("npoints12");
    var npoints12v = document.getElementById("npoints12v");
    var npoints12i = bp;

    npoints12v.innerHTML = npoints12i;
    npoints12.addEventListener('input', function(){
        npoints12v.innerHTML = this.value;
        bp = parseFloat(npoints12v.innerHTML);     
    });

};


init();