function init() {
    canvas = document.getElementById("canvas3");
    var ctx = canvas.getContext('2d');
    var points = [];
    var triangles = [];
    var tri_helper = 0;
    var circles = [];
    var circle_helper = 0;
    var qcurves = [];
    var qcurve_helper = 0;
    var bcurves = [];
    var bcurve_helper = 0;

    var drawmode = 0; //0-points; 1-triangles; 2-circles; 3-quadratic curves; 4-bezier curves;

    var cw = canvas.width;
    var ch = canvas.height;

    var canvas_color = "#6495ED";
    //var point_color = "black";
    var line_widths = [1,2,4,6,8,10];

    var colors = ["black", "red", "yellow", "green", "blue", "magenta", "cyan", "#6495ED"];

    canvas.addEventListener("click", e => {
        var color = document.getElementById("pointC3");
        var value = color.options[color.selectedIndex].value;

        var lw = document.getElementById("linewidth3");
        var lwvalue = lw.options[lw.selectedIndex].value;

        points.push({ x: e.offsetX, y: e.offsetY, color: colors[value], width: line_widths[lwvalue]});
        draw();
    });

    function draw() {
        //BACKGROUND
        ctx.clearRect(0, 0, cw, ch);
        ctx.fillStyle = canvas_color;
        ctx.fillRect(0, 0, cw, ch);

        switch (drawmode){
            //points
            case 0:
                break;
            //triangles    
            case 1:
                tri_helper ++;
                console.log(tri_helper);
                if(tri_helper == 3){
                    p3 = points.pop();
                    p2 = points.pop();
                    p1 = points.pop();

                    triangles.push({p1x : p1.x, p1y : p1.y, p2x : p2.x, p2y: p2.y,
                         p3x : p3.x, p3y : p3.y, color: p3.color});
                    tri_helper = 0;
                };
                break;
            //circles    
            case 2:
                circle_helper++;
                if(circle_helper == 2){
                    p2 = points.pop();
                    p1 = points.pop();

                    console.log()

                    rad = calculateradius(p1, p2);

                    circles.push({x: p1.x, y: p1.y, radius: rad, color: p2.color });

                    circle_helper = 0;
                }
                break;
            //quadratic
            case 3:
                qcurve_helper++;
                if(qcurve_helper == 3){
                    p3 = points.pop();
                    p2 = points.pop();
                    p1 = points.pop();

                    qcurves.push({psx: p1.x, psy:p1.y, mp1x: p2.x, mp1y: p2.y,
                        pex: p3.x, pey: p3.y, color: p3.color, width: p3.width});
                    qcurve_helper = 0;
                }
                break;
            case 4:
                bcurve_helper++;
                if(bcurve_helper == 4){
                    p4 = points.pop();
                    p3 = points.pop();
                    p2 = points.pop();
                    p1 = points.pop();

                    bcurves.push({psx: p1.x, psy:p1.y, mp1x: p2.x, mp1y: p2.y, mp2x: p3.x, mp2y: p3.y,
                        pex: p4.x, pey: p4.y, color: p4.color, width: p4.width});
                    bcurve_helper = 0;
                }
                break;
            
        }
        points.forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = point.color;
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        });

        triangles.forEach(tri => {
            ctx.beginPath();
            ctx.fillStyle = tri.color;
            ctx.moveTo(tri.p1x, tri.p1y);
            ctx.lineTo(tri.p2x, tri.p2y);
            ctx.lineTo(tri.p3x, tri.p3y);
            ctx.fill();
            ctx.closePath();
        });

        circles.forEach(cir => {
            ctx.beginPath();
            ctx.fillStyle = cir.color;
            ctx.arc(cir.x, cir.y, cir.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        });

        qcurves.forEach(qcurve => {
            
            ctx.beginPath();
            ctx.lineWidth = qcurve.width;
            
            console.log(qcurve.width);
            
            ctx.moveTo(qcurve.psx, qcurve.psy);
            ctx.strokeStyle = qcurve.color;
            ctx.quadraticCurveTo(qcurve.mp1x, qcurve.mp1y, qcurve.pex, qcurve.pey);
            ctx.stroke();
            
        });

        bcurves.forEach(bc => {
            ctx.lineWidth = bc.width;
            ctx.beginPath();
            
            ctx.moveTo(bc.psx, bc.psy);
            ctx.strokeStyle = bc.color;
            ctx.bezierCurveTo(bc.mp1x, bc.mp1y, bc.mp2x, bc.mp2y, bc.pex, bc.pey);
            ctx.stroke();
            
        });
    };

    draw();






    var clear3 = document.getElementById("clear3");
    clear3.addEventListener("click", function () {
        points = [];
        triangles = [];
        circles = [];
        qcurves = [];
        bcurves = [];

        var color = document.getElementById("canvasC3");
        var value = color.options[color.selectedIndex].value;

        canvas_color = colors[value];

        draw();

        disablehelpers([1,2,3,4]);
    });

    var points3 = document.getElementById("points3");
    points3.addEventListener("click", function () {
        drawmode = 0;
        disablehelpers([1,2,3,4]);
    });

    var triangles3 = document.getElementById("triangles3");
    triangles3.addEventListener("click", function () {
        drawmode = 1;
        disablehelpers([1,2,3,4]);
    });

    var circles3 = document.getElementById("circles3");
    circles3.addEventListener("click", function () {
        drawmode = 2;
        disablehelpers([1,2,3,4]);
    });

    var quadratic3 = document.getElementById("quadratic3");
    quadratic3.addEventListener("click", function () {
        drawmode = 3;
        disablehelpers([1,2,3,4]);
    });

    var bezier3 = document.getElementById("bezier3");
    bezier3.addEventListener("click", function () {
        drawmode = 4;
        disablehelpers([1,2,3,4]);
    });

    function disablehelpers(arr){
        arr.forEach(e => {
            switch (e){
                case 1:
                    tri_helper = 0;
                    break;
                case 2:
                    circle_helper = 0;
                    break;
                case 3:
                    qcurve_helper = 0;
                    break;
                case 4:
                    bcurve_helper = 0;
                    break;    
            }
        });
    }

    function calculateradius(p1,p2){
        var x = Math.pow(p1.x - p2.x, 2);
        var y = Math.pow(p1.y - p2.y, 2);
        return radius = Math.sqrt((x + y));
    }


}

init();