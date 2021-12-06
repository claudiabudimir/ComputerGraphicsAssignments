var obj_fn = 'final_pokeball.obj'

var g1_objDoc = null; // Info parsed from OBJ file
var g1_drawingInfo = null; // Info for drawing the 3D model with WebGL



// Create a buffer object and perform the initial configuration
function initVertexBuffers1(gl1, program) {

    var o = new Object();

    o.vertexBuffer = createEmptyArrayBuffer1(gl1, program.a_Position, 3, gl1.FLOAT);
    o.normalBuffer = createEmptyArrayBuffer1(gl1, program.a_Normal, 3, gl1.FLOAT);
    o.colorBuffer = createEmptyArrayBuffer1(gl1, program.a_Color, 4, gl1.FLOAT);
    o.indexBuffer = gl1.createBuffer();

    return o;
}

function createEmptyArrayBuffer1(gl1, a_attribute, num, type) {

    var buffer = gl1.createBuffer(); // Create a buffer object

    gl1.bindBuffer(gl1.ARRAY_BUFFER, buffer);
    gl1.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl1.enableVertexAttribArray(a_attribute); // Enable the assignment

    return buffer;
}

function onReadComplete1(gl1, model, objDoc) {
    // Acquire the vertex coordinates and colors from OBJ file
    var drawingInfo = objDoc.getDrawingInfo();

    // Write date into the buffer object
    gl1.bindBuffer(gl1.ARRAY_BUFFER, model.vertexBuffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, drawingInfo.vertices, gl1.STATIC_DRAW);

    gl1.bindBuffer(gl1.ARRAY_BUFFER, model.normalBuffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, drawingInfo.normals, gl1.STATIC_DRAW);

    gl1.bindBuffer(gl1.ARRAY_BUFFER, model.colorBuffer);
    gl1.bufferData(gl1.ARRAY_BUFFER, drawingInfo.colors, gl1.STATIC_DRAW);

    // Write the indices to the buffer object
    gl1.bindBuffer(gl1.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl1.bufferData(gl1.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl1.STATIC_DRAW);

    return drawingInfo;
}

function readOBJFile1(fileName, gl1, model, scale, reverse) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onReadOBJFile1(request.responseText, fileName, scale, reverse);
        }
    }
    request.open('GET', fileName, true); // Create a request to get file
    request.send(); // Send the request
}

function onReadOBJFile1(fileString, fileName, scale, reverse) {

    var objDoc = new OBJDoc(fileName); // Create a OBJDoc object
    var result = objDoc.parse(fileString, scale, reverse);
    if (!result) {
        g1_objDoc = null; g1_drawingInfo = null;
        console.log("OBJ file parsing error.");
        return;
    }
    g1_objDoc = objDoc;
}


function init() {

    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    if (!gl1) {
        alert("WebGL isn�t available");
    }

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
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
        // Prepare empty buffer objects for vertex coordinates, colors, and normals
        var model = initVertexBuffers1(gl1, program);

        // Start reading the OBJ file
        readOBJFile1(obj_fn, gl1, model, 0.02, true);

        return model;
    }

    // Register the event handler
    var currentAngle = [0.0, 0.0]; // Current rotation angle ([x-axis, y-axis] degrees)
        var dragging = false;         // Dragging or not
        var lastX = -1, lastY = -1;   // Last position of the mouse

        canvas.onmousedown = function (ev) {   // Mouse is pressed
            var x = ev.clientX, y = ev.clientY;
            // Start dragging if a mouse is in <canvas>
            var rect = ev.target.getBoundingClientRect();
            if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
                lastX = x; lastY = y;
                dragging = true;
            }
        };

        canvas.onmouseup = function (ev) { dragging = false; }; // Mouse is released

        canvas.onmousemove = function (ev) { // Mouse is moved
            var x = ev.clientX, y = ev.clientY;
            if (dragging) {
                var factor = 100 / canvas.height; // The rotation ratio
                var dx = factor * (x - lastX);
                var dy = factor * (y - lastY);
                // Limit x-axis rotation angle to -90 to 90 degrees
                currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
                currentAngle[1] = currentAngle[1] + dx;
            }
            lastX = x, lastY = y;
        };

    var eye = vec3(1.0, 1.0, 3.0);
    var at = vec3(0.0, 0.0, 0.);
    const up = vec3(0.0, 1.0, 0.0);

    var fovy = 45.0; //angl1es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 50.0;


    var projectMatrix = gl1.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    var m = lookAt(eye, at, up);
    var finalp = mult(pj,m);
    gl1.uniformMatrix4fv(projectMatrix, gl1.FALSE, flatten(finalp));

    var modelViewMatrixLoc = gl1.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));


    modelViewMatrix = lookAt(eye, at, up);
    gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    function render() {

        var x = rotate(currentAngle[0], 1.0, 0.0, 0.0);
        var y = rotate(currentAngle[1], 0.0, 1.0, 0.0);

        var m = mult(x,y);

        gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(m));
        

        if (!g1_drawingInfo && g1_objDoc && g1_objDoc.isMTLComplete()) {
            // OBJ and all MTLs are available
            console.log("IM HEREEE")
            g1_drawingInfo = onReadComplete(gl1, model, g1_objDoc);
        }
        if (!g1_drawingInfo){
            window.requestAnimationFrame(render);
            return;
        }

        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);
        gl1.drawElements(gl1.TRIANGLES, g1_drawingInfo.indices.length, gl1.UNSIGNED_SHORT, 0);

        window.requestAnimFrame(render);

    }

    render();

}

init();