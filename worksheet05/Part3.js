var obj_fn = 'monkey.obj'

var g3_objDoc = null;
var g3_drawingInfo = null;



//Initial configuration of buffers
function initVertexBuffers(gl3, program) {

    var o = new Object();

    o.vertexBuffer = createEmptyArrayBuffer(gl3, program.a_Position, 3, gl3.FLOAT);
    o.normalBuffer = createEmptyArrayBuffer(gl3, program.a_Normal, 3, gl3.FLOAT);
    o.colorBuffer = createEmptyArrayBuffer(gl3, program.a_Color, 4, gl3.FLOAT);
    o.indexBuffer = gl3.createBuffer();

    return o;
}

function createEmptyArrayBuffer(gl3, a_attribute, num, type) {

    var buffer = gl3.createBuffer();
    gl3.bindBuffer(gl3.ARRAY_BUFFER, buffer);
    gl3.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl3.enableVertexAttribArray(a_attribute);
    return buffer;
}

function onReadComplete(gl3, model, objDoc) {
    // Extract vertex coordinates and colors from OBJ file
    var drawingInfo = objDoc.getDrawingInfo();

    // Write date into the buffer object
    gl3.bindBuffer(gl3.ARRAY_BUFFER, model.vertexBuffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.vertices, gl3.STATIC_DRAW);
    gl3.bindBuffer(gl3.ARRAY_BUFFER, model.normalBuffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.normals, gl3.STATIC_DRAW);
    gl3.bindBuffer(gl3.ARRAY_BUFFER, model.colorBuffer);
    gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.colors, gl3.STATIC_DRAW);

    // Write indices to the buffer
    gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl3.bufferData(gl3.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl3.STATIC_DRAW);

    return drawingInfo;
}

function readOBJFile(fileName, gl3, model, scale, reverse) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onReadOBJFile3(request.responseText, fileName, scale, reverse);
        }
    }
    request.open('GET', fileName, true);
    request.send();
}

function onReadOBJFile3(fileString, fileName, scale, reverse) {

    var objDoc = new OBJDoc(fileName);
    var result = objDoc.parse(fileString, scale, reverse);
    if (!result) {
        g3_objDoc = null; g3_drawingInfo = null;
        console.log("Error parsing obj file.");
        return;
    }
    g3_objDoc = objDoc;
}


function init() {

    canvas = document.getElementById("gl-canvas3");
    gl3 = WebGLUtils.setupWebGL(canvas);

    gl3.viewport(0, 0, canvas.width, canvas.height);
    gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl3.clear(gl3.COLOR_BUFFER_BIT);

    var program = initShaders(gl3, "vertex-shader-3", "fragment-shader-3");
    gl3.useProgram(program);

    gl3.enable(gl3.DEPTH_TEST);
    gl3.enable(gl3.CULL_FACE);
    gl3.cullFace(gl3.BACK);


    var model = initObject();
    function initObject() {

        program.a_Position = gl3.getAttribLocation(program, 'a_Position');
        program.a_Normal = gl3.getAttribLocation(program, 'a_Normal');
        program.a_Color = gl3.getAttribLocation(program, 'a_Color');
        var model = initVertexBuffers(gl3, program);
        readOBJFile(obj_fn, gl3, model, 1.0, true);
        return model;
    }

    var eye = vec3(5, 0, 0);
    var at = vec3(0.0, 0.0, 0.);
    const up = vec3(0.0, 1.0, 0.0);

    var projectMatrix = gl3.getUniformLocation(program, 'projectMatrix');
    pj = perspective(45.0, 1, 0.1, 10);
    gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl3.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    var theta = 0.0;
    function render() {
        window.requestAnimFrame(render);

        if (!g3_drawingInfo && g3_objDoc && g3_objDoc.isMTLComplete()) {
            g3_drawingInfo = onReadComplete(gl3, model, g3_objDoc);
        }
        if (!g3_drawingInfo)
            return;

        theta += 0.01;

        eye = vec3(5.0 * Math.sin(theta), 0.0, 5.0 * Math.cos(theta));

        modelViewMatrix = lookAt(eye, at, up);
        gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

        gl3.clear(gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);
        gl3.drawElements(gl3.TRIANGLES, g3_drawingInfo.indices.length, gl3.UNSIGNED_SHORT, 0);
        
    }
    render();
}

init();

