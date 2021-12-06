function init() {

    canvas = document.getElementById("canvas10");
    gl10 = WebGLUtils.setupWebGL(canvas);

    if (!gl10) {
        alert("Webgl4 isn�t available");
    }

    gl10.viewport(0, 0, canvas.width, canvas.height);
    gl10.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl10.clear(gl10.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl10, "vertex-shader", "fragment-shader");
    gl10.useProgram(program);

    var allpoints = [];

    var vBuffer = gl10.createBuffer();
    gl10.bindBuffer(gl10.ARRAY_BUFFER, vBuffer);
    gl10.bufferData(gl10.ARRAY_BUFFER, flatten(allpoints), gl10.STATIC_DRAW);

    var vPosition = gl10.getAttribLocation(program, "vPosition");
    gl10.vertexAttribPointer(vPosition, 2, gl10.FLOAT, false, 0, 0);
    gl10.enableVertexAttribArray(vPosition);

    function render() {
        gl10.clear(gl10.COLOR_BUFFER_BIT);

        gl10.bindBuffer(gl10.ARRAY_BUFFER, vBuffer);
        gl10.bufferData(gl10.ARRAY_BUFFER, flatten(allpoints), gl10.STATIC_DRAW);
        gl10.drawArrays(gl10.LINE_LOOP, 0, allpoints.length);
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

    var clear10 = document.getElementById("clear10");
    clear10.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints10 = document.getElementById("npoints10");
    var npoints10v = document.getElementById("npoints10v");
    var npoints10i = bp;

    npoints10v.innerHTML = npoints10i;
    npoints10.addEventListener('input', function(){
        npoints10v.innerHTML = this.value;
        bp = parseFloat(npoints10v.innerHTML);     
    });

};


init();