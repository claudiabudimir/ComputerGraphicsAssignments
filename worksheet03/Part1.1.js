"use strict";

function init() {
    //Init the canvas
    var canvas = document.getElementById("gl-canvas1");
    var gl = WebGLUtils.setupWebGL(canvas);
    
    //Set the viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    //Init shaders
    var program = initShaders(gl, "vertex-shader-1", "fragment-shader-1");
    gl.useProgram(program);
    
    //Enable a depth test
    gl.enable(gl.DEPTH_TEST);

    //Init Points
    var vertices = [
        vec3(0.5, 0.5, 0.5),
        vec3(-0.5, 0.5, 0.5),
        vec3(-0.5, -0.5, 0.5),
        vec3(0.5, -0.5, 0.5),
        vec3(0.5, -0.5, -0.5),
        vec3(0.5, 0.5, -0.5),
        vec3(-0.5, 0.5, -0.5),
        vec3(-0.5, -0.5, -0.5)
    ];

    var colors = [
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0)
    ];

    var indices = [
        0, 1, 2,       //Front
        0, 2, 3, 
        
        0, 3, 4,       //Right
        0, 4, 5, 
 
        0, 5, 6,       //Up
        0, 6, 1, 
 
        1, 6, 7,       //Left
        1, 7, 2, 
 
        7, 4, 3,       //Down
        7, 3, 2, 
 
        4, 7, 6,       //Back
        4, 6, 5 
     ];


    //Buffer Creation For Vertices
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //Buffer Creation For Colors
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var cPosition = gl.getAttribLocation(program, "a_Color");
    gl.vertexAttribPointer(cPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(cPosition);

    //Buffer Creation For Indices
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    var eye = vec3(0, 0, 0);
    var at = vec3(0.5, 0.5, 0.5);
    var up = vec3(0.0, 1.0, 0.0);  

    var viewMatrix = gl.getUniformLocation(program, 'modelViewMatrix');
    var vm = lookAt(eye, at, up);
    gl.uniformMatrix4fv(viewMatrix, gl.FALSE, flatten(vm));

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length , gl.UNSIGNED_BYTE, 0);
}
init();