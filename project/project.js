var obj_fn = 'shell.obj'

var g4_objDoc = null;
var g4_drawingInfo = null;

//Initial configuration of buffers
function initVertexBuffers(gl, program) {

    var o = new Object();

    o.vertexBuffer = createEmptyArrayBuffer(gl, program.a_Position, 3, gl.FLOAT);
    o.normalBuffer = createEmptyArrayBuffer(gl, program.a_Normal, 3, gl.FLOAT);
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

    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, drawingInfo.normals, gl.STATIC_DRAW);

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
        program.a_Normal = gl.getAttribLocation(program, 'a_Normal');
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

        
    var rotateAroundOrbit = true;
    var theta = 0.0;
    var phi = 0.0;

    function render() {
        window.requestAnimFrame(render);

        if (!g4_drawingInfo && g4_objDoc && g4_objDoc.isMTLComplete()) {
            g4_drawingInfo = onReadComplete(gl, model, g4_objDoc);
            console.log(g4_drawingInfo);
        }
        if (!g4_drawingInfo)
            return;
        
        if (rotateAroundOrbit)   {
            theta += 0.01;
            phi+= 0.005;
        }

        let radius = 5.5;
        let eye = vec3(radius*Math.sin(theta)*Math.cos(phi), radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

        modelViewMatrix = lookAt(eye, at, up);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, g4_drawingInfo.indices.length, gl.UNSIGNED_SHORT, 0);
        
    }
    render();

    var orbit = document.getElementById("orbit_button2");
    orbit.addEventListener("click", function () {
        if (rotateAroundOrbit)
            rotateAroundOrbit = false;//stop rotation around orbit
        else
            rotateAroundOrbit = true;//start rotation around orbit
    });

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

    var ka_initial = 1;
    var kd_initial = 0.3;
    var ks_initial = 0.9;
    var alpha_initial = 96;
    var le_initial = 1.9;

    gl.uniform1f(gl.getUniformLocation(program, "Ka"), ka_initial);
    gl.uniform1f(gl.getUniformLocation(program, "Kd"), kd_initial);
    gl.uniform1f(gl.getUniformLocation(program, "Ks"), ks_initial);
    gl.uniform1f(gl.getUniformLocation(program, "alpha"), alpha_initial);
    gl.uniform1f(gl.getUniformLocation(program, "le"), le_initial);


    Kav.innerHTML = ka_initial;
    Ka.addEventListener('input', function(){
        Kav.innerHTML = this.value;
        var ka = parseFloat(Kav.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "Ka"), ka);
    });

    Kdv.innerHTML = kd_initial;
    Kd.addEventListener('input', function(){
        Kdv.innerHTML = this.value;
        var kd = parseFloat(Kdv.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "Kd"), kd);
    });

    Ksv.innerHTML = ks_initial;
    Ks.addEventListener('input', function(){
        Ksv.innerHTML = this.value;
        var ks = parseFloat(Ksv.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "Ks"), ks);
    });

    sv.innerHTML = alpha_initial;
    s.addEventListener('input', function(){
        sv.innerHTML = this.value;
        var alpha = parseFloat(sv.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "alpha"), alpha);
    });

    Lev.innerHTML = le_initial;
    Le.addEventListener('input', function(){
        Lev.innerHTML = this.value;
        var le = parseFloat(Lev.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "le"), le);
    });
}

init();