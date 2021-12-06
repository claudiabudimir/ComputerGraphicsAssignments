"use strict";

function init() {
    //Init the canvas
    var canvas = document.getElementById("gl-canvas5");
    var gl = WebGLUtils.setupWebGL(canvas);

    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl, "vertex-shader-5", "fragment-shader-5");
    gl.useProgram(program);

    //Init Points
    var vertices = [vec2(0.0, 0.0)];
    var colors = [vec4(0.0, 1.0, 0.0, 1.0)];


    let nr_vertices = 50;
    let radius = 0.5;
    let angle = 0

    for (let i = 0; i <= nr_vertices; i++) {
        angle = 2 * Math.PI * i / nr_vertices;
        vertices.push(vec2(radius * Math.cos(angle), radius * Math.sin(angle)));
        colors.push(vec4(0.0, 1.0, 0.0, 1.0));
    }

    //Buffer Creation For Vertices
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //Buffer Creation For Colors
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var cPosition = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(cPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(cPosition);

    var u_VLoc = gl.getUniformLocation(program, "u_VLoc");
    var w = vec2(0.0, 0.04);// velocity
    var v = vec2(0.0, 0.0); // translation vector

    function animate() {
        setTimeout(function() {
            gl.clear(gl.COLOR_BUFFER_BIT);

            //v[0]+=w[0];
            v[1]+=w[1];

            //console.log(Math.sqrt(v[0]*v[0]+ v[1]*v[1]));
            //w[0] = Math.sign(1 - radius - Math.sqrt(v[0]*v[0]+ v[1]*v[1])) * w[0];
            w[1] = Math.sign(1 - radius - Math.sqrt(v[0]*v[0]+ v[1]*v[1])) * w[1];

            gl.uniform2f(u_VLoc, v[0], v[1]);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, nr_vertices + 2);
            requestAnimationFrame(animate);
        }, 16);
    }

    animate();
}
init();
//aici updatez W = 0.01
//dupa il transmit printr-o variabila uniforma
//lenght of the translation vector

//if sgn mult cu - 1 sau 1 - > asta va fi in javascript
//si adunarea se face per element.x, .y, .z