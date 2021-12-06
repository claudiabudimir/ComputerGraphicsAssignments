function init() {

    canvas = document.getElementById("canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    if (!gl1) {
        alert("Webgl4 isn�t available");
    }

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl1, "vertex-shader", "fragment-shader");
    gl1.useProgram(program);

    var allpoints = [];

    var vBuffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, vBuffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(allpoints), gl1.STATIC_DRAW);

    var vPosition = gl1.getAttribLocation(program, "vPosition");
    gl1.vertexAttribPointer(vPosition, 2, gl1.FLOAT, false, 0, 0);
    gl1.enableVertexAttribArray(vPosition);

    var curves_info = [];

    function render() {
        gl1.clear(gl1.COLOR_BUFFER_BIT);

        gl1.bindBuffer(gl1.ARRAY_BUFFER, vBuffer);
        gl1.bufferData(gl1.ARRAY_BUFFER, flatten(allpoints), gl1.STATIC_DRAW);
        if (curves_info.length != 0) {
            var total = 0;
            for (var i = 0; i < curves_info.length; i++) {
                if (i == 0) {
                    gl1.drawArrays(gl1.TRIANGLES, 0, curves_info[i]);
                } else {
                    gl1.drawArrays(gl1.TRIANGLES, total, curves_info[i])
                }
                total = total + curves_info[i];
            }
        }

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

    const add = 0.01;


    canvas.addEventListener("click", function () {

        var rect = event.target.getBoundingClientRect();
        var t = vec2((-1 + 2 * (event.clientX - rect.left) / canvas.width), (-1 + 2 * (canvas.height - (event.clientY - rect.top)) / canvas.height));
        barr.push(t);
        allpoints.push(t);

        if (barr.length == 4) {

            for (var i = 0; i < 4; i++)
                allpoints.pop();
            var curve = getPointsOnBezierCurve(barr, bp);
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

    var clear1 = document.getElementById("clear1");
    clear1.addEventListener("click", function () {
        barr = [];
        allpoints = [];
        curves_info = [];
    });

    var npoints1 = document.getElementById("npoints1");
    var npoints1v = document.getElementById("npoints1v");
    var npoints1i = bp;

    npoints1v.innerHTML = npoints1i;
    npoints1.addEventListener('input', function () {
        npoints1v.innerHTML = this.value;
        bp = parseFloat(npoints1v.innerHTML);
    });

};


init();