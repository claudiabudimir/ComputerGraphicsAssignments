function init() {

    canvas = document.getElementById("canvas13");
    gl13 = WebGLUtils.setupWebGL(canvas);

    if (!gl13) {
        alert("Webgl4 isn�t available");
    }

    gl13.viewport(0, 0, canvas.width, canvas.height);
    gl13.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl13.clear(gl13.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl13, "vertex-shader", "fragment-shader");
    gl13.useProgram(program);

    var allpoints = [];

    var vBuffer = gl13.createBuffer();
    gl13.bindBuffer(gl13.ARRAY_BUFFER, vBuffer);
    gl13.bufferData(gl13.ARRAY_BUFFER, flatten(allpoints), gl13.STATIC_DRAW);

    var vPosition = gl13.getAttribLocation(program, "vPosition");
    gl13.vertexAttribPointer(vPosition, 2, gl13.FLOAT, false, 0, 0);
    gl13.enableVertexAttribArray(vPosition);

    function render() {
        gl13.clear(gl13.COLOR_BUFFER_BIT);

        gl13.bindBuffer(gl13.ARRAY_BUFFER, vBuffer);
        gl13.bufferData(gl13.ARRAY_BUFFER, flatten(allpoints), gl13.STATIC_DRAW);
        gl13.drawArrays(gl13.TRIANGLE_STRIP, 0, allpoints.length);
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

    var clear13 = document.getElementById("clear13");
    clear13.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints13 = document.getElementById("npoints13");
    var npoints13v = document.getElementById("npoints13v");
    var npoints13i = bp;

    npoints13v.innerHTML = npoints13i;
    npoints13.addEventListener('input', function(){
        npoints13v.innerHTML = this.value;
        bp = parseFloat(npoints13v.innerHTML);     
    });

};


init();