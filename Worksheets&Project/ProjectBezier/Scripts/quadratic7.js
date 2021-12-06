function init() {

    canvas = document.getElementById("canvas17");
    gl17 = WebGLUtils.setupWebGL(canvas);

    if (!gl17) {
        alert("Webgl4 isn�t available");
    }

    gl17.viewport(0, 0, canvas.width, canvas.height);
    gl17.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl17.clear(gl17.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl17, "vertex-shader", "fragment-shader");
    gl17.useProgram(program);

    var allpoints = [];

    var vBuffer = gl17.createBuffer();
    gl17.bindBuffer(gl17.ARRAY_BUFFER, vBuffer);
    gl17.bufferData(gl17.ARRAY_BUFFER, flatten(allpoints), gl17.STATIC_DRAW);

    var vPosition = gl17.getAttribLocation(program, "vPosition");
    gl17.vertexAttribPointer(vPosition, 2, gl17.FLOAT, false, 0, 0);
    gl17.enableVertexAttribArray(vPosition);

    function render() {
        gl17.clear(gl17.COLOR_BUFFER_BIT);

        gl17.bindBuffer(gl17.ARRAY_BUFFER, vBuffer);
        gl17.bufferData(gl17.ARRAY_BUFFER, flatten(allpoints), gl17.STATIC_DRAW);
        gl17.drawArrays(gl17.TRIANGLES, 0, allpoints.length);
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

    var clear17 = document.getElementById("clear17");
    clear17.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints17 = document.getElementById("npoints17");
    var npoints17v = document.getElementById("npoints17v");
    var npoints17i = bp;

    npoints17v.innerHTML = npoints17i;
    npoints17.addEventListener('input', function(){
        npoints17v.innerHTML = this.value;
        bp = parseFloat(npoints17v.innerHTML);     
    });

};


init();