function init() {

    canvas = document.getElementById("canvas2");
    gl2 = WebGLUtils.setupWebGL(canvas);

    if (!gl2) {
        alert("Webgl4 isn�t available");
    }

    gl2.viewport(0, 0, canvas.width, canvas.height);
    gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl2, "vertex-shader", "fragment-shader");
    gl2.useProgram(program);

    var allpoints = [];

    var vBuffer = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, vBuffer);
    gl2.bufferData(gl2.ARRAY_BUFFER, flatten(allpoints), gl2.STATIC_DRAW);

    var vPosition = gl2.getAttribLocation(program, "vPosition");
    gl2.vertexAttribPointer(vPosition, 2, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(vPosition);

    var curves_info = [];

    function render() {
        gl2.clear(gl2.COLOR_BUFFER_BIT);

        gl2.bindBuffer(gl2.ARRAY_BUFFER, vBuffer);
        gl2.bufferData(gl2.ARRAY_BUFFER, flatten(allpoints), gl2.STATIC_DRAW);
        if (curves_info.length != 0) {
            var total = 0;
            for (var i = 0; i < curves_info.length; i++) {
                if (i == 0) {
                    gl2.drawArrays(gl2.TRIANGLES, 0, curves_info[i]);
                } else {
                    gl2.drawArrays(gl2.TRIANGLES, total, curves_info[i])
                }
                total = total + curves_info[i];
            }
        }

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

    const add = 0.01;


    canvas.addEventListener("click", function () {

        var rect = event.target.getBoundingClientRect();
        var t = vec2((-1 + 2 * (event.clientX - rect.left) / canvas.width), (-1 + 2 * (canvas.height - (event.clientY - rect.top)) / canvas.height));
        barr.push(t);
        allpoints.push(t);

        if (barr.length == 3) {

            for (var i = 0; i < 3; i++)
                allpoints.pop();
            var curve = getPointsOnQuadraticCurve(barr, bp);
            var tmp_point = [];


            var initial = allpoints.length;
            curve.forEach(p => {

                

                x1 = p[0] + add;
                y1 = p[1];

                x2 = p[0] - add;
                y2 = p[1];

                if(tmp_point.length!=0 && tmp_point[1]>p[1] || tmp_point[1]<p[1]){
                    y1 = p[1] + add;
                    y2 = p[1] - add;
                }

                p1 = vec2(x1, y1);
                p2 = vec2(x2, y2);

                if (tmp_point.length != 0) {
                    allpoints.push(p1);
                    allpoints.push(p1);
                    allpoints.push(p2);
                    allpoints.push(tmp_point);
                    allpoints.push(p1);
                    allpoints.push(p2);
                } else {
                    allpoints.push(p1);
                    allpoints.push(p2);
                }

                tmp_point = p2;


            });
            barr = [];

            var final = allpoints.length - initial;
            curves_info.push(final);

            console.log(curves_info);
        }

    });

    var clear2 = document.getElementById("clear2");
    clear2.addEventListener("click", function () {
        barr = [];
        allpoints = [];
        curves_info = [];
    });

    var npoints2 = document.getElementById("npoints2");
    var npoints2v = document.getElementById("npoints2v");
    var npoints2i = bp;

    npoints2v.innerHTML = npoints2i;
    npoints2.addEventListener('input', function () {
        npoints2v.innerHTML = this.value;
        bp = parseFloat(npoints2v.innerHTML);
    });

};


init();