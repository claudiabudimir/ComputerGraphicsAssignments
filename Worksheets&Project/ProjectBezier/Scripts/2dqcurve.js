function init() {
    canvas = document.getElementById("canvas2");
    var ctx = canvas.getContext('2d');
    var points = [];
    var curves = [];

    var cw = canvas.width;
    var ch = canvas.height;

    ctx.lineWidth = 5;

    canvas.addEventListener("click", e => {
        // Every time the canvas is clicked add the point to the Point Array
        // And Redraw it
        points.push({ x: e.offsetX, y: e.offsetY });
        draw();
    });

    function draw() {
        ctx.clearRect(0, 0, cw, ch);
        ctx.fillStyle = "#6495ED";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = "black";

        if (points.length != 3) {
            points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fill();
            });
        } else {
            curves.push({ psx: points[0].x, psy: points[0].y, mp1x: points[1].x, mp1y: points[1].y, pex: points[2].x, pey: points[2].y });
            for (var i = 0; i < 3; i++)
                points.pop();
        };
            curves.forEach(curve => {
                ctx.beginPath();
                ctx.moveTo(curve.psx, curve.psy);
                ctx.quadraticCurveTo(curve.mp1x, curve.mp1y, curve.pex, curve.pey);
                ctx.stroke();
            });
    };

    draw();

    var clear2 = document.getElementById("clear2");

    clear2.addEventListener("click", function () {
            points = [];
            curves = [];
            draw();
    });
}

init();