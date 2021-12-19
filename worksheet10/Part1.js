var obj_fn = 'monkey.obj'
var g_objDoc1 = null;
var g_drawingInfo1 = null;

function create_empty_array_buffer(gl1, a_attribute, num, type) {

    var buffer = gl1.createBuffer();
    gl1.bindBuffer(gl1.ARRAY_BUFFER, buffer);
    gl1.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl1.enableVertexAttribArray(a_attribute);
    return buffer;
}

function inititialize_object_buffers(gl1, program) {
    var obj = new Object();
    obj.vertexBuffer = create_empty_array_buffer(gl1, program.a_Position, 3, gl1.FLOAT);
    obj.normalBuffer = create_empty_array_buffer(gl1, program.a_Normal, 3, gl1.FLOAT);
    obj.colorBuffer = create_empty_array_buffer(gl1, program.a_Color, 4, gl1.FLOAT);
    obj.indexBuffer = gl1.createBuffer();
    return obj;
}

function onReadComplete(gl1, model, objDoc) {

    var drawingInfo = objDoc.getDrawingInfo();

    //write vertices
    gl1.bindBuffer(gl1.ARRAY_BUFFER, model.vertexBuffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, drawingInfo.vertices, gl1.STATIC_DRAW);
    //write normals
    gl1.bindBuffer(gl1.ARRAY_BUFFER, model.normalBuffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, drawingInfo.normals, gl1.STATIC_DRAW);
    //write colors
    gl1.bindBuffer(gl1.ARRAY_BUFFER, model.colorBuffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, drawingInfo.colors, gl1.STATIC_DRAW);
    //write indices
    gl1.bindBuffer(gl1.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl1.bufferData(gl1.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl1.STATIC_DRAW);

    return drawingInfo;
}

function readOBJFile(fileName, scale, reverse) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onReadOBJFile(request.responseText, fileName, scale, reverse);
        }
    }
    request.open('GET', fileName, true);
    request.send();
}

function onReadOBJFile(fileString, fileName, scale, reverse) {

    var objDoc = new OBJDoc(fileName);
    var result = objDoc.parse(fileString, scale, reverse);
    if (!result) {
        g_objDoc1 = null; g_drawingInfo1 = null;
        return;
    }
    g_objDoc1 = objDoc;
}


function init() {

    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);

    var program = initShaders(gl1, "vertex-shader", "fragment-shader");
    gl1.useProgram(program);

    gl1.enable(gl1.DEPTH_TEST);
    gl1.enable(gl1.CULL_FACE);
    gl1.cullFace(gl1.BACK);

    var model = initObject();
    function initObject() {
        program.a_Position = gl1.getAttribLocation(program, 'a_Position');
        program.a_Normal = gl1.getAttribLocation(program, 'a_Normal');
        program.a_Color = gl1.getAttribLocation(program, 'a_Color');
        var model = inititialize_object_buffers(gl1, program);
        readOBJFile(obj_fn, 0.6, true);
        return model;
    }

    //events
    var currentAngle = [0.0, 0.0];
    var dragging = false;
    var lastX = -1, lastY = -1;

    canvas.onmousedown = function (ev) {
        var x = ev.clientX, y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
            lastX = x; lastY = y; dragging = true;
        }
    };

    canvas.onmouseup = function (ev) { dragging = false; };
    canvas.onmousemove = function (ev) {
        var x = ev.clientX, y = ev.clientY;
        if (dragging) {
            var factor = 100 / canvas.height;
            var dx = factor * (x - lastX);
            var dy = factor * (y - lastY);
            currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
            currentAngle[1] = currentAngle[1] + dx;
        }
        lastX = x, lastY = y;
    };

    var fovy = 45.0;
    var aspect = 1;
    var near = 0.5;
    var far = 60.0;
    var eye = vec3(1.0, 1.0, 3.0);
    var at = vec3(0.0, 0.0, 0.);
    const up = vec3(0.0, 1.0, 0.0);

    var modelViewMatrixLoc = gl1.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    var projectMatrix = gl1.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    var final_pj = mult(pj, modelViewMatrix);
    gl1.uniformMatrix4fv(projectMatrix, gl1.FALSE, flatten(final_pj));

    function render() {
        var m = mult(rotate(currentAngle[0], 1.0, 0.0, 0.0), rotate(currentAngle[1], 0.0, 1.0, 0.0));

        gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(m));

        if (!g_drawingInfo1 && g_objDoc1 && g_objDoc1.isMTLComplete()) {
            g_drawingInfo1 = onReadComplete(gl1, model, g_objDoc1);
        }

        if (!g_drawingInfo1) {
            window.requestAnimationFrame(render);
            return;
        }

        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);
        gl1.drawElements(gl1.TRIANGLES, g_drawingInfo1.indices.length, gl1.UNSIGNED_SHORT, 0);

        window.requestAnimFrame(render);
    }

    render();

}

init();