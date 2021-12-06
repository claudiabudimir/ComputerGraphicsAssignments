function init() {

    canvas = document.getElementById("canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas);

    if (!4) {
        alert("Webgl4 isn�t available");
    }

    gl4.viewport(0, 0, canvas.width, canvas.height);
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl4.clear(gl4.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl4, "vertex-shader", "fragment-shader");
    gl4.useProgram(program);

    var allpoints = [];

    var vBuffer = gl4.createBuffer();
    gl4.bindBuffer(gl4.ARRAY_BUFFER, vBuffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, flatten(allpoints), gl4.STATIC_DRAW);

    var vPosition = gl4.getAttribLocation(program, "vPosition");
    gl4.vertexAttribPointer(vPosition, 2, gl4.FLOAT, false, 0, 0);
    gl4.enableVertexAttribArray(vPosition);

    function render() {
        gl4.clear(gl4.COLOR_BUFFER_BIT);

        gl4.bindBuffer(gl4.ARRAY_BUFFER, vBuffer);
        gl4.bufferData(gl4.ARRAY_BUFFER, flatten(allpoints), gl4.STATIC_DRAW);
        gl4.drawArrays(gl4.POINTS, 0, allpoints.length);
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

    var clear4 = document.getElementById("clear4");
    clear4.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints4 = document.getElementById("npoints4");
    var npoints4v = document.getElementById("npoints4v");
    var npoints4i = bp;

    npoints4v.innerHTML = npoints4i;
    npoints4.addEventListener('input', function(){
        npoints4v.innerHTML = this.value;
        bp = parseFloat(npoints4v.innerHTML);     
    });

};


init();