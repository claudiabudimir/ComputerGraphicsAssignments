"use strict";

let program = new Program();

let obj = new importObj();

window.onload = function init() {

    program.initProgram("gl-canvas");
    program.gl.enable(program.gl.CULL_FACE);
    program.gl.enable(program.gl.DEPTH_TEST)

    program.write(vec3(0.5, 0.5, 0.5),"lightAmbient");
    program.write(vec4(0.0,0.0,-1.0,0.0),"lightPosition");
    program.write(vec3(1.0,1.0,1.0),"lightEmission");
    program.write(vec4(1.0, 1.0, 1.0, 1.0),"diffuseCoefficient");
    program.write(0.25,"ambientCoefficient");
    
    obj.readOBJFile("../assets/monkey.obj", 1.5, true);
    render();
};
function render() {
    if (!obj.obj && obj.fetched && obj.fetched.isMTLComplete()) {
        obj.obj = obj.fetched.getDrawingInfo();

        new Buffer(program).bind(obj.obj.vertices, "vPosition");
        new Buffer(program).bind(obj.obj.normals, "vNormal");

        program.gl.bindBuffer(program.gl.ELEMENT_ARRAY_BUFFER, program.gl.createBuffer());
        program.gl.bufferData(program.gl.ELEMENT_ARRAY_BUFFER, obj.obj.indices, program.gl.STATIC_DRAW);
    }
    program.gl.clear(program.gl.COLOR_BUFFER_BIT | program.gl.DEPTH_BUFFER_BIT);

    if(program.animation) {
        program.theta+=0.01;
        program.phi+=0.005;
    }


    let radius = 6;
    let eye = vec3(radius*Math.sin(program.theta)*Math.cos(program.phi), radius*Math.sin(program.theta)*Math.sin(program.phi), radius*Math.cos(program.theta));

    let modelViewMatrix = translate(0,0,0);
    modelViewMatrix = mult(modelViewMatrix,lookAt(eye, vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0)));

    let projectionMatrix = perspective(45.0, 1, 0.1, 10);

    program.write(modelViewMatrix,"modelViewMatrix");
    program.write(projectionMatrix,"projectionMatrix");

    if(obj.obj) {
        program.gl.drawElements(program.gl.TRIANGLES, obj.obj.indices.length, program.gl.UNSIGNED_SHORT, 0);
    }

    requestAnimFrame(render);
}