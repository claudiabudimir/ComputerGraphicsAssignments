function init() {

    canvas = document.getElementById("canvas11");
    gl11 = WebGLUtils.setupWebGL(canvas);

    if (!gl11) {
        alert("Webgl4 isn�t available");
    }

    gl11.viewport(0, 0, canvas.width, canvas.height);
    gl11.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl11.clear(gl11.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl11, "vertex-shader", "fragment-shader");
    gl11.useProgram(program);

    var allpoints = [];

    var vBuffer = gl11.createBuffer();
    gl11.bindBuffer(gl11.ARRAY_BUFFER, vBuffer);
    gl11.bufferData(gl11.ARRAY_BUFFER, flatten(allpoints), gl11.STATIC_DRAW);

    var vPosition = gl11.getAttribLocation(program, "vPosition");
    gl11.vertexAttribPointer(vPosition, 2, gl11.FLOAT, false, 0, 0);
    gl11.enableVertexAttribArray(vPosition);

    function render() {
        gl11.clear(gl11.COLOR_BUFFER_BIT);

        gl11.bindBuffer(gl11.ARRAY_BUFFER, vBuffer);
        gl11.bufferData(gl11.ARRAY_BUFFER, flatten(allpoints), gl11.STATIC_DRAW);
        gl11.drawArrays(gl11.LINE_LOOP, 0, allpoints.length);
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

    var clear11 = document.getElementById("clear11");
    clear11.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints11 = document.getElementById("npoints11");
    var npoints11v = document.getElementById("npoints11v");
    var npoints11i = bp;

    npoints11v.innerHTML = npoints11i;
    npoints11.addEventListener('input', function(){
        npoints11v.innerHTML = this.value;
        bp = parseFloat(npoints11v.innerHTML);     
    });

};


init();