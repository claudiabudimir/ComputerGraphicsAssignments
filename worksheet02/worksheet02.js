"use strict";

window.onload = function init() {
    //Init the canvas
    var canvas = document.getElementById("gl-canvas");
    var gl = WebGLUtils.setupWebGL(canvas);
    
    if (!gl) {
        alert("WebGL isn not available");
    }

    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
 
    //Defining the variables
    var colors = [
        vec4(0.0, 0.0, 0.0, 1.0), //black
        vec4(1.0, 0.0, 0.0, 1.0), //red
        vec4(1.0, 1.0, 0.0, 1.0), //yellow
        vec4(0.0, 1.0, 0.0, 1.0), //green
        vec4(0.0, 0.0, 1.0, 1.0), //blue
        vec4(1.0, 0.0, 1.0, 1.0), //magenta
        vec4(0.0, 1.0, 1.0, 1.0), //cyan
        vec4(1.0, 1.0, 1.0, 1.0), //white
        vec4(0.3921, 0.5843, 0.9294, 1.0)  //cornflower
    ];
    var indexColor = 0;

    var max_verts = 1000000;
    var index = 0; 
    var numPoints = 0;

    var points = [];
    var triangles = [];
    var circles = [];

    var drawMode = gl.POINTS;

    var flagTriangle = 0; //acts as a counter for the triangle vertexes, if lower than 2 than we added just the first two points, if equal to 2 than we remove the points from the vector points and add the new index to the triangle vector, after that we reset it to 0
    
    var centerCircle;
    var flagCircle = 0; // if 1 than we added the center to the points vector
    var numPointsCircle =200;
    var radius;

    function getCircleX(radians, radius) {
        return Math.cos(radians) * radius;
    }

    function getCircleY(radians, radius) {
        return Math.sin(radians) * radius;
    }

    //Buffer Creation For Vertexes
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, max_verts * sizeof['vec2'], gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //Buffer Creation For Colors
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, max_verts * sizeof['vec4'], gl.STATIC_DRAW);

    var cPosition = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(cPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(cPosition);
    
    //Obtaining the ids for the buttons
    var clearCanvasMenu = document.getElementById("clearCanvasMenu");//color for the canvas
    var clearCanvas = document.getElementById("clearCanvas");
    var colorMenu = document.getElementById("colorMenu");//color for the points, triangles, circles
    var addPoints = document.getElementById("addPoints");
    var addTriangles = document.getElementById("addTriangles");
    var addCircles = document.getElementById("addCircles");

    //Adding coresponding events
    clearCanvas.addEventListener("click", function () {
        index = 0;
        points = [];
        triangles = [];
        circles = [];

        var bgcolor = colors[clearCanvasMenu.selectedIndex];
        gl.clearColor(bgcolor[0], bgcolor[1], bgcolor[2], bgcolor[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
    });

    colorMenu.addEventListener("click", function () {
        indexColor = colorMenu.selectedIndex;
    });
    
    addPoints.addEventListener("click", function () {
        drawMode = gl.POINTS;
    });

    addTriangles.addEventListener("click", function () {
        drawMode = gl.TRIANGLES;
    });

    addCircles.addEventListener("click", function () {
        drawMode = gl.TRIANGLE_FAN;
    });

    canvas.addEventListener("click", function (event) {
        
        var bbox = event.target.getBoundingClientRect();

        var t = vec2(-1 + 2 * (event.clientX - bbox.left) / canvas.width,
            -1 + 2 * (canvas.height - event.clientY - 1 + bbox.top) / canvas.height);
        

        if (drawMode == gl.POINTS) {
            flagTriangle = 0; // for the transition between the drawing modes
            flagCircle = 0;  // for the transition between the drawing modes
            points.push(index);
        }

        if (drawMode == gl.TRIANGLES && flagTriangle < 2) {
            flagCircle = 0;  // for the transition between the drawing modes
            flagTriangle++;
            points.push(index);
        }

        else if (drawMode == gl.TRIANGLES && flagTriangle == 2) {
            flagTriangle = 0; // reseting the number of points added for the triangle
            triangles.push(index);
            points.pop();
            points.pop();
        }

        if (drawMode == gl.TRIANGLE_FAN && flagCircle == 0) {
            flagTriangle = 0; // for the transition between the drawing modes
            points.push(index);
            flagCircle++;
            centerCircle = t;
        }

        else if (drawMode == gl.TRIANGLE_FAN && flagCircle == 1) {
            flagCircle = 0;
            var x = Math.pow(t[0] - centerCircle[0], 2);
            var y = Math.pow(t[1] - centerCircle[1], 2);
            radius = Math.sqrt((x + y));
            points.pop();
            circles.push(index);

            for (var j = 0; j <= numPointsCircle; j++) {

                var angle = 2 * Math.PI * j / numPointsCircle;
                var x = getCircleX(angle, radius) + centerCircle[0];
                var y = getCircleY(angle, radius) + centerCircle[1];
                var p = vec2(x, y);

                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec2'], flatten(p));

                var c = colors[indexColor];
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec4'], flatten(c));

                index++;
            }
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec2'], flatten(t));

        var c = colors[indexColor];
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, index * sizeof['vec4'], flatten(c));

        numPoints = Math.max(numPoints, ++index);
        index %= max_verts;
    });
    
    //Drawing the elements inside the canvas
    function animate() {
        setTimeout(function() {
            gl.clear(gl.COLOR_BUFFER_BIT);
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                gl.drawArrays(gl.POINTS, p, 1);
            }
            for (var i = 0; i < triangles.length; i++) {
                var p = triangles[i];
                gl.drawArrays(gl.TRIANGLES, p - 2, 3);
            }
            for (var i = 0; i < circles.length; i++) {
                var p = circles[i];
                gl.drawArrays(gl.TRIANGLE_FAN, p - 1, numPointsCircle + 2);
            }
            requestAnimationFrame(animate);
        }, 16);
    }
    animate();
}