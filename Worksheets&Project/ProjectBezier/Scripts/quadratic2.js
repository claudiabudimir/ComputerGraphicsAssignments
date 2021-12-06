function init() {

    canvas = document.getElementById("canvas7");
    gl7 = WebGLUtils.setupWebGL(canvas);

    if (!gl7) {
        alert("Webgl4 isn�t available");
    }

    gl7.viewport(0, 0, canvas.width, canvas.height);
    gl7.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl7.clear(gl7.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl7, "vertex-shader", "fragment-shader");
    gl7.useProgram(program);

    var allpoints = [];

    var vBuffer = gl7.createBuffer();
    gl7.bindBuffer(gl7.ARRAY_BUFFER, vBuffer);
    gl7.bufferData(gl7.ARRAY_BUFFER, flatten(allpoints), gl7.STATIC_DRAW);

    var vPosition = gl7.getAttribLocation(program, "vPosition");
    gl7.vertexAttribPointer(vPosition, 2, gl7.FLOAT, false, 0, 0);
    gl7.enableVertexAttribArray(vPosition);

    function render() {
        gl7.clear(gl7.COLOR_BUFFER_BIT);

        gl7.bindBuffer(gl7.ARRAY_BUFFER, vBuffer);
        gl7.bufferData(gl7.ARRAY_BUFFER, flatten(allpoints), gl7.STATIC_DRAW);
        gl7.drawArrays(gl7.LINES, 0, allpoints.length);
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

    var clear7 = document.getElementById("clear7");
    clear7.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints7 = document.getElementById("npoints7");
    var npoints7v = document.getElementById("npoints7v");
    var npoints7i = bp;

    npoints7v.innerHTML = npoints7i;
    npoints7.addEventListener('input', function(){
        npoints7v.innerHTML = this.value;
        bp = parseFloat(npoints7v.innerHTML);     
    });

};


init();