function init() {

    canvas = document.getElementById("canvas9");
    gl9 = WebGLUtils.setupWebGL(canvas);

    if (!gl9) {
        alert("Webgl4 isn�t available");
    }

    gl9.viewport(0, 0, canvas.width, canvas.height);
    gl9.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl9.clear(gl9.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl9, "vertex-shader", "fragment-shader");
    gl9.useProgram(program);

    var allpoints = [];

    var vBuffer = gl9.createBuffer();
    gl9.bindBuffer(gl9.ARRAY_BUFFER, vBuffer);
    gl9.bufferData(gl9.ARRAY_BUFFER, flatten(allpoints), gl9.STATIC_DRAW);

    var vPosition = gl9.getAttribLocation(program, "vPosition");
    gl9.vertexAttribPointer(vPosition, 2, gl9.FLOAT, false, 0, 0);
    gl9.enableVertexAttribArray(vPosition);

    function render() {
        gl9.clear(gl9.COLOR_BUFFER_BIT);

        gl9.bindBuffer(gl9.ARRAY_BUFFER, vBuffer);
        gl9.bufferData(gl9.ARRAY_BUFFER, flatten(allpoints), gl9.STATIC_DRAW);
        gl9.drawArrays(gl9.LINE_STRIP, 0, allpoints.length);
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

    var clear9 = document.getElementById("clear9");
    clear9.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints9 = document.getElementById("npoints9");
    var npoints9v = document.getElementById("npoints9v");
    var npoints9i = bp;

    npoints9v.innerHTML = npoints9i;
    npoints9.addEventListener('input', function(){
        npoints9v.innerHTML = this.value;
        bp = parseFloat(npoints9v.innerHTML);     
    });

};


init();