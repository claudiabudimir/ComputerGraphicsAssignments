function init() {

    canvas = document.getElementById("canvas6");
    gl6 = WebGLUtils.setupWebGL(canvas);

    if (!gl6) {
        alert("Webgl4 isn�t available");
    }

    gl6.viewport(0, 0, canvas.width, canvas.height);
    gl6.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl6.clear(gl6.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl6, "vertex-shader", "fragment-shader");
    gl6.useProgram(program);

    var allpoints = [];

    var vBuffer = gl6.createBuffer();
    gl6.bindBuffer(gl6.ARRAY_BUFFER, vBuffer);
    gl6.bufferData(gl6.ARRAY_BUFFER, flatten(allpoints), gl6.STATIC_DRAW);

    var vPosition = gl6.getAttribLocation(program, "vPosition");
    gl6.vertexAttribPointer(vPosition, 2, gl6.FLOAT, false, 0, 0);
    gl6.enableVertexAttribArray(vPosition);

    function render() {
        gl6.clear(gl6.COLOR_BUFFER_BIT);

        gl6.bindBuffer(gl6.ARRAY_BUFFER, vBuffer);
        gl6.bufferData(gl6.ARRAY_BUFFER, flatten(allpoints), gl6.STATIC_DRAW);
        gl6.drawArrays(gl6.LINES, 0, allpoints.length);
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

    var clear6 = document.getElementById("clear6");
    clear6.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints6 = document.getElementById("npoints6");
    var npoints6v = document.getElementById("npoints6v");
    var npoints6i = bp;

    npoints6v.innerHTML = npoints6i;
    npoints6.addEventListener('input', function(){
        npoints6v.innerHTML = this.value;
        bp = parseFloat(npoints6v.innerHTML);     
    });

};


init();