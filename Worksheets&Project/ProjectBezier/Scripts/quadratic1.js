function init() {

    canvas = document.getElementById("canvas5");
    gl5 = WebGLUtils.setupWebGL(canvas);

    if (!gl5) {
        alert("Webgl4 isn�t available");
    }

    gl5.viewport(0, 0, canvas.width, canvas.height);
    gl5.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl5.clear(gl5.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl5, "vertex-shader", "fragment-shader");
    gl5.useProgram(program);

    var allpoints = [];

    var vBuffer = gl5.createBuffer();
    gl5.bindBuffer(gl5.ARRAY_BUFFER, vBuffer);
    gl5.bufferData(gl5.ARRAY_BUFFER, flatten(allpoints), gl5.STATIC_DRAW);

    var vPosition = gl5.getAttribLocation(program, "vPosition");
    gl5.vertexAttribPointer(vPosition, 2, gl5.FLOAT, false, 0, 0);
    gl5.enableVertexAttribArray(vPosition);

    function render() {
        gl5.clear(gl5.COLOR_BUFFER_BIT);

        gl5.bindBuffer(gl5.ARRAY_BUFFER, vBuffer);
        gl5.bufferData(gl5.ARRAY_BUFFER, flatten(allpoints), gl5.STATIC_DRAW);
        gl5.drawArrays(gl5.POINTS, 0, allpoints.length);
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

    var clear5 = document.getElementById("clear5");
    clear5.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints5 = document.getElementById("npoints5");
    var npoints5v = document.getElementById("npoints5v");
    var npoints5i = bp;

    npoints5v.innerHTML = npoints5i;
    npoints5.addEventListener('input', function(){
        npoints5v.innerHTML = this.value;
        bp = parseFloat(npoints5v.innerHTML);     
    });

};


init();