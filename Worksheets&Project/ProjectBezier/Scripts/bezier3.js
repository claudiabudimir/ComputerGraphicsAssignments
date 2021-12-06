function init() {

    canvas = document.getElementById("canvas8");
    gl8 = WebGLUtils.setupWebGL(canvas);

    if (!gl8) {
        alert("Webgl4 isn�t available");
    }

    gl8.viewport(0, 0, canvas.width, canvas.height);
    gl8.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl8.clear(gl8.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl8, "vertex-shader", "fragment-shader");
    gl8.useProgram(program);

    var allpoints = [];

    var vBuffer = gl8.createBuffer();
    gl8.bindBuffer(gl8.ARRAY_BUFFER, vBuffer);
    gl8.bufferData(gl8.ARRAY_BUFFER, flatten(allpoints), gl8.STATIC_DRAW);

    var vPosition = gl8.getAttribLocation(program, "vPosition");
    gl8.vertexAttribPointer(vPosition, 2, gl8.FLOAT, false, 0, 0);
    gl8.enableVertexAttribArray(vPosition);

    function render() {
        gl8.clear(gl8.COLOR_BUFFER_BIT);

        gl8.bindBuffer(gl8.ARRAY_BUFFER, vBuffer);
        gl8.bufferData(gl8.ARRAY_BUFFER, flatten(allpoints), gl8.STATIC_DRAW);
        gl8.drawArrays(gl8.LINE_STRIP, 0, allpoints.length);
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

    var clear8 = document.getElementById("clear8");
    clear8.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints8 = document.getElementById("npoints8");
    var npoints8v = document.getElementById("npoints8v");
    var npoints8i = bp;

    npoints8v.innerHTML = npoints8i;
    npoints8.addEventListener('input', function(){
        npoints8v.innerHTML = this.value;
        bp = parseFloat(npoints8v.innerHTML);     
    });

};


init();