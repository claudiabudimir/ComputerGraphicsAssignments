var obj_fn = 'cap.obj'

var g4_objDoc = null; // Info parsed from OBJ file
var g4_drawingInfo = null; // Info for drawing the 3D model with WebGL



// Create a buffer object and perform the initial configuration
function initVertexBuffers(gl4, program) {

    var o = new Object();

    o.vertexBuffer = createEmptyArrayBuffer(gl4, program.a_Position, 3, gl4.FLOAT);
    o.normalBuffer = createEmptyArrayBuffer(gl4, program.a_Normal, 3, gl4.FLOAT);
    o.colorBuffer = createEmptyArrayBuffer(gl4, program.a_Color, 4, gl4.FLOAT);
    o.indexBuffer = gl4.createBuffer();

    return o;
}

function createEmptyArrayBuffer(gl4, a_attribute, num, type) {

    var buffer = gl4.createBuffer(); // Create a buffer object

    gl4.bindBuffer(gl4.ARRAY_BUFFER, buffer);
    gl4.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl4.enableVertexAttribArray(a_attribute); // Enable the assignment

    return buffer;
}

function onReadComplete(gl4, model, objDoc) {
    // Acquire the vertex coordinates and colors from OBJ file
    var drawingInfo = objDoc.getDrawingInfo();

    // Write date into the buffer object
    gl4.bindBuffer(gl4.ARRAY_BUFFER, model.vertexBuffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, drawingInfo.vertices, gl4.STATIC_DRAW);

    gl4.bindBuffer(gl4.ARRAY_BUFFER, model.normalBuffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, drawingInfo.normals, gl4.STATIC_DRAW);

    gl4.bindBuffer(gl4.ARRAY_BUFFER, model.colorBuffer);
    gl4.bufferData(gl4.ARRAY_BUFFER, drawingInfo.colors, gl4.STATIC_DRAW);

    // Write the indices to the buffer object
    gl4.bindBuffer(gl4.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl4.bufferData(gl4.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl4.STATIC_DRAW);

    return drawingInfo;
}

function readOBJFile(fileName, gl4, model, scale, reverse) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onReadOBJFile4(request.responseText, fileName, scale, reverse);
        }
    }
    request.open('GET', fileName, true); // Create a request to get file
    request.send(); // Send the request
}

function onReadOBJFile4(fileString, fileName, scale, reverse) {

    var objDoc = new OBJDoc(fileName); // Create a OBJDoc object
    var result = objDoc.parse(fileString, scale, reverse);
    if (!result) {
        g4_objDoc = null; g4_drawingInfo = null;
        console.log("OBJ file parsing error.");
        return;
    }
    g4_objDoc = objDoc;
}


function init() {

    canvas = document.getElementById("gl-canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas);

    if (!gl4) {
        alert("WebGL isn�t available");
    }

    gl4.viewport(0, 0, canvas.width, canvas.height);
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl4.clear(gl4.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl4, "vertex-shader-4", "fragment-shader-4");
    gl4.useProgram(program);

    gl4.enable(gl4.DEPTH_TEST);
    gl4.enable(gl4.CULL_FACE);
    gl4.cullFace(gl4.BACK);


    var model = initObject();

    function initObject() {

        program.a_Position = gl4.getAttribLocation(program, 'a_Position');
        program.a_Normal = gl4.getAttribLocation(program, 'a_Normal');
        program.a_Color = gl4.getAttribLocation(program, 'a_Color');
        // Prepare empty buffer objects for vertex coordinates, colors, and normals
        var model = initVertexBuffers(gl4, program);

        // Start reading the OBJ file
        readOBJFile(obj_fn, gl4, model, 1.8, true);

        return model;
    }

    var eye = vec3(5, 0, 0);
    var at = vec3(0.0, 0.0, 0.);
    const up = vec3(0.0, 1.0, 0.0);

    var fovy = 45.0; //angl4es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 50.0;

    var lightPosition = vec4(0.0, 0.0, 1.0, 0.0);

    gl4.uniform4fv(gl4.getUniformLocation(program, "lightPosition"), flatten(lightPosition));




    var projectMatrix = gl4.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl4.uniformMatrix4fv(projectMatrix, gl4.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl4.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    var theta = 0.0;

    modelViewMatrix = lookAt(eye, at, up);
    gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    function render() {
        window.requestAnimFrame(render);

        if (!g4_drawingInfo && g4_objDoc && g4_objDoc.isMTLComplete()) {
            // OBJ and all MTLs are available
            console.log("IM HEREEE")
            g4_drawingInfo = onReadComplete(gl4, model, g4_objDoc);
        }
        if (!g4_drawingInfo)
            return;

        theta += 0.01;

        eye = vec3(5.0 * Math.sin(theta), 0.0, 5.0 * Math.cos(theta));

        modelViewMatrix = lookAt(eye, at, up);
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

        gl4.clear(gl4.COLOR_BUFFER_BIT | gl4.DEPTH_BUFFER_BIT);
        gl4.drawElements(gl4.TRIANGLES, g4_drawingInfo.indices.length, gl4.UNSIGNED_SHORT, 0);
        
    }

    render();

    var Ka = document.getElementById("Ka4");
    var Kd = document.getElementById("Kd4");
    var Ks = document.getElementById("Ks4");
    var s = document.getElementById("s4");
    var Le = document.getElementById("Le4");

    var Kav = document.getElementById("Kav4");
    var Kdv = document.getElementById("Kdv4");
    var Ksv = document.getElementById("Ksv4");
    var sv = document.getElementById("sv4");
    var Lev = document.getElementById("Lev4");

    var kai = 0.50;
    var kdi = 0.1;
    var ksi = 1.0;
    var alphai = 18;
    var lei = 1.35;

    gl4.uniform1f(gl4.getUniformLocation(program, "Ka"), kai);
    gl4.uniform1f(gl4.getUniformLocation(program, "Kd"), kdi);
    gl4.uniform1f(gl4.getUniformLocation(program, "Ks"), ksi);
    gl4.uniform1f(gl4.getUniformLocation(program, "alpha"), alphai);
    gl4.uniform1f(gl4.getUniformLocation(program, "le"), lei);


    Kav.innerHTML = kai;
    Ka.addEventListener('input', function(){
        Kav.innerHTML = this.value;

        var ka = parseFloat(Kav.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "Ka"), ka);

        console.log(ka);
        
    });

    Kdv.innerHTML = kdi;
    Kd.addEventListener('input', function(){
        Kdv.innerHTML = this.value;
        var kd = parseFloat(Kdv.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "Kd"), kd);
        console.log(kd);
    });

    Ksv.innerHTML = ksi;
    Ks.addEventListener('input', function(){
        Ksv.innerHTML = this.value;
        var ks = parseFloat(Ksv.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "Ks"), ks);
        console.log(ks);
    });

    sv.innerHTML = alphai;
    s.addEventListener('input', function(){
        sv.innerHTML = this.value;
        var alpha = parseFloat(sv.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "alpha"), alpha);
        console.log(alpha);
    });

    Lev.innerHTML = lei;
    Le.addEventListener('input', function(){
        Lev.innerHTML = this.value;
        var le = parseFloat(Lev.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "le"), le);
        console.log(le);
    });

}

init();