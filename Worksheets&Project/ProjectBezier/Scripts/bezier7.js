function init() {

    canvas = document.getElementById("canvas16");
    gl16 = WebGLUtils.setupWebGL(canvas);

    if (!gl16) {
        alert("Webgl4 isn�t available");
    }

    gl16.viewport(0, 0, canvas.width, canvas.height);
    gl16.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl16.clear(gl16.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl16, "vertex-shader", "fragment-shader");
    gl16.useProgram(program);

    var allpoints = [];

    var vBuffer = gl16.createBuffer();
    gl16.bindBuffer(gl16.ARRAY_BUFFER, vBuffer);
    gl16.bufferData(gl16.ARRAY_BUFFER, flatten(allpoints), gl16.STATIC_DRAW);

    var vPosition = gl16.getAttribLocation(program, "vPosition");
    gl16.vertexAttribPointer(vPosition, 2, gl16.FLOAT, false, 0, 0);
    gl16.enableVertexAttribArray(vPosition);

    function render() {
        gl16.clear(gl16.COLOR_BUFFER_BIT);

        gl16.bindBuffer(gl16.ARRAY_BUFFER, vBuffer);
        gl16.bufferData(gl16.ARRAY_BUFFER, flatten(allpoints), gl16.STATIC_DRAW);
        gl16.drawArrays(gl16.TRIANGLES, 0, allpoints.length);
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

    var clear16 = document.getElementById("clear16");
    clear16.addEventListener("click", function () {
        barr = [];
        allpoints = [];
    });

    var npoints16 = document.getElementById("npoints16");
    var npoints16v = document.getElementById("npoints16v");
    var npoints16i = bp;

    npoints16v.innerHTML = npoints16i;
    npoints16.addEventListener('input', function(){
        npoints16v.innerHTML = this.value;
        bp = parseFloat(npoints16v.innerHTML);     
    });

};


init();