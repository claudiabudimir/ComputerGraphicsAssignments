var obj_fn = 'shell.obj'

var g4_objDoc = null;
var g4_drawingInfo = null;

//Initial configuration of buffers
function initVertexBuffers(gl, program) {

    var o = new Object();

    o.vertexBuffer = createEmptyArrayBuffer(gl, program.a_Position, 3, gl.FLOAT);
    //o.normalBuffer = createEmptyArrayBuffer(gl, program.a_Normal, 3, gl.FLOAT);
    o.colorBuffer = createEmptyArrayBuffer(gl, program.a_Color, 4, gl.FLOAT);
    o.textureBuffer = createEmptyArrayBuffer(gl, program.a_TexCoord, 2, gl.FLOAT);
    o.indexBuffer = gl.createBuffer();

    return o;
}

function createEmptyArrayBuffer(gl, a_attribute, num, type) {

    var buffer = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
    return buffer;
}

function onReadComplete(gl, model, objDoc) {
    // Extract vertex coordinates and colors from OBJ file
    var drawingInfo = objDoc.getDrawingInfo();

    // Write date into the buffers 
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.vertices, gl.STATIC_DRAW);

    //gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.colors, gl.STATIC_DRAW);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, model.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.textures, gl.STATIC_DRAW);
    
    console.log(drawingInfo.textures);
    // Write indices to the buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl.STATIC_DRAW);

    return drawingInfo;
}

function readOBJFile(fileName, gl, model, scale, reverse) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status !== 404) {
            onReadOBJFile4(request.responseText, fileName, scale, reverse);
        }
    }
    request.open('GET', fileName, true);
    request.send();
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
    gl = WebGLUtils.setupWebGL(canvas);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader-4", "fragment-shader-4");
    gl.useProgram(program);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);


    var model = initObject();

    function initObject() {

        program.a_Position = gl.getAttribLocation(program, 'a_Position');
        //program.a_Normal = gl.getAttribLocation(program, 'a_Normal');
        program.a_Color = gl.getAttribLocation(program, 'a_Color');
        program.a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');
        // Prepare empty buffer objects for vertex coordinates, colors, and normals
        var model = initVertexBuffers(gl, program);

        // Start reading the OBJ file
        readOBJFile(obj_fn, gl, model, 1.0, true);

        return model;
    }

    var eye = vec3(5, 0, 0);
    var at = vec3(0.0, 0.0, 0.);
    const up = vec3(0.0, 1.0, 0.0);
    var lightPosition = vec4(0.0, 0.0, 1.0, 0.0);

    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

    var projectMatrix = gl.getUniformLocation(program, 'projectMatrix');
    pj = perspective(45.0, 1, 0.1, 10);
    gl.uniformMatrix4fv(projectMatrix, gl.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    var theta = 0.0;
    var phi = 0.0;

    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        // texture initialization 
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(gl.getUniformLocation(program, "texMap"), 0);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    };
    image.src = 'shell.jpg';

    function render() {
        window.requestAnimFrame(render);

        if (!g4_drawingInfo && g4_objDoc && g4_objDoc.isMTLComplete()) {
            g4_drawingInfo = onReadComplete(gl, model, g4_objDoc);
            console.log(g4_drawingInfo);
        }
        if (!g4_drawingInfo)
            return;

        theta += 0.01;
        phi+= 0.005;

        let radius = 5;
        let eye = vec3(radius*Math.sin(theta)*Math.cos(phi), radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

        modelViewMatrix = lookAt(eye, at, up);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, g4_drawingInfo.indices.length, gl.UNSIGNED_SHORT, 0);
        
    }
    render();
}

init();