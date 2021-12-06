function init() {

    canvas = document.getElementById("canvas15");
    gl15 = WebGLUtils.setupWebGL(canvas);

    if (!gl15) {
        alert("Webgl4 isn�t available");
    }

    gl15.viewport(0, 0, canvas.width, canvas.height);
    gl15.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl15.clear(gl15.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl15, "vertex-shader", "fragment-shader");
    gl15.useProgram(program);

    var allpoints = [];

    var vBuffer = gl15.createBuffer();
    gl15.bindBuffer(gl15.ARRAY_BUFFER, vBuffer);
    gl15.bufferData(gl15.ARRAY_BUFFER, flatten(allpoints), gl15.STATIC_DRAW);

    var vPosition = gl15.getAttribLocation(program, "vPosition");
    gl15.vertexAttribPointer(vPosition, 2, gl15.FLOAT, false, 0, 0);
    gl15.enableVertexAttribArray(vPosition);

    function render() {
        gl15.clear(gl15.COLOR_BUFFER_BIT);

        gl15.bindBuffer(gl15.ARRAY_BUFFER, vBuffer);
        gl15.bufferData(gl15.ARRAY_BUFFER, flatten(allpoints), gl15.STATIC_DRAW);
        gl15.drawArrays(gl15.TRIANGLE_FAN, 0, allpoints.length);
        window.requestAnimFrame(render, canvas);
    }

    render();

    var barr = [];
    var bp = 20;

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

    canvas.addEventListener("click", function () {

        var rect = event.target.getBoundingClientRect();
        var t = vec2((-1 + 2 * (event.clientX - rect.left) / canvas.width), (-1 + 2 * (canvas.height - (event.clientY - rect.top)) / canvas.height));
        barr.push(t);
        allpoints.push(t);

        if (barr.length == 3) {
            for (var i = 0; i < 3; i++)
                allpoints.pop();
            var curve = getPointsOnQuadraticCurve(barr, bp);
            curve.forEach(p => {
                allpoints.push(p);
            });
            barr = [];
        }

    });

    var clear15 = document.getElementById("clear15");
    clear15.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints15 = document.getElementById("npoints15");
    var npoints15v = document.getElementById("npoints15v");
    var npoints15i = bp;

    npoints15v.innerHTML = npoints15i;
    npoints15.addEventListener('input', function(){
        npoints15v.innerHTML = this.value;
        bp = parseFloat(npoints15v.innerHTML);     
    });

};


init();