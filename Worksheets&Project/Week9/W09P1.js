var obj_fn = 'teapot.obj'

var g1_objDoc = null; // Info parsed from OBJ file
var g1_drawingInfo = null; // Info for drawing the 3D model with WebGL

function initAttributeVariable(gl, attribute, buffer, num, type) {
    gl1.bindBuffer(gl1.ARRAY_BUFFER, buffer);
    gl1.vertexAttribPointer(attribute, num, type, false, 0, 0);
    gl1.enableVertexAttribArray(attribute);
}

// Create a buffer object and perform the initial configuration
function initobj(gl1, program) {

    var o = new Object();

    o.vertexBuffer = createEmptyArrayBuffer(gl1, program.a_Position, 3, gl1.FLOAT);
    o.normalBuffer = createEmptyArrayBuffer(gl1, program.a_Normal, 3, gl1.FLOAT);
    o.colorBuffer = createEmptyArrayBuffer(gl1, program.a_Color, 4, gl1.FLOAT);
    o.indexBuffer = gl1.createBuffer();

    return o;
}

function initground(gl1, program, p, t) {
    var o = new Object();

    o.vertexBuffer = createEmptyArrayBuffer(gl1, program.position, 3, gl1.FLOAT);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(p), gl1.STATIC_DRAW);
    o.texBuffer = createEmptyArrayBuffer(gl1, program.tex, 2, gl1.FLOAT);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(t), gl1.STATIC_DRAW);

    return o;

}

function createEmptyArrayBuffer(gl1, a_attribute, num, type) {

    var buffer = gl1.createBuffer(); // Create a buffer object

    gl1.bindBuffer(gl1.ARRAY_BUFFER, buffer);
    gl1.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl1.enableVertexAttribArray(a_attribute); // Enable the assignment

    return buffer;
}

function onReadComplete(gl1, model, objDoc) {
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

function readOBJFile(fileName, gl1, model, scale, reverse) {
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
    gl1.enable(gl1.DEPTH_TEST);


    // Object
    var program_obj1 = initShaders(gl1, "vertex-shader-1obj", "fragment-shader-1obj");
    gl1.useProgram(program_obj1);

    var modelobj = initObject();

    function initObject() {

        program_obj1.a_Position = gl1.getAttribLocation(program_obj1, 'a_Position');
        program_obj1.a_Normal = gl1.getAttribLocation(program_obj1, 'a_Normal');
        program_obj1.a_Color = gl1.getAttribLocation(program_obj1, 'a_Color');
        // Prepare empty buffer objects for vertex coordinates, colors, and normals
        var model = initobj(gl1, program_obj1);

        // Start reading the OBJ file
        readOBJFile(obj_fn, gl1, model, 1.0, true); //Scaled

        return model;
    }

    var program_ground1 = initShaders(gl1, "vertex-shader-1ground", "fragment-shader-1ground");


    gl1.useProgram(program_ground1);

    function initGround() {

        program_ground1.position = gl1.getAttribLocation(program_ground1, "a_Position");
        program_ground1.tex = gl1.getAttribLocation(program_ground1, "a_TexCoord");

        var large_rect = [vec3(-2.0, -1.0, -1.0), vec3(-2.0, -1.0, -5.0), vec3(2.0, -1.0, -1.0), vec3(2.0, -1.0, -5.0)]; // 2,0,1   1,3,2
        var all_points = [large_rect[2], large_rect[0], large_rect[1], large_rect[1], large_rect[3], large_rect[2]];
        var tex_coord = [vec2(-1.0, 1.0), vec2(-1.0, -1.0), vec2(1.0, 1.0), vec2(1.0, -1.0)]; //change
        var all_tex = [tex_coord[2], tex_coord[0], tex_coord[1], tex_coord[1], tex_coord[3], tex_coord[2]];

        var modelground = initground(gl1, program_ground1, all_points, all_tex);

        return modelground;
    }

    var modelground = initGround();

    // var p_buffer = gl1.createBuffer();
    // gl1.bindBuffer(gl1.ARRAY_BUFFER, p_buffer);
    // gl1.bufferData(gl1.ARRAY_BUFFER, flatten(all_points), gl1.STATIC_DRAW);

    // gl1.vertexAttribPointer(program_ground1.position, 3, gl1.FLOAT, false, 0, 0);
    // gl1.enableVertexAttribArray(program_ground1.position);

    // var t_buffer = gl1.createBuffer();
    // gl1.bindBuffer(gl1.ARRAY_BUFFER, t_buffer);
    // gl1.bufferData(gl1.ARRAY_BUFFER, flatten(all_tex), gl1.STATIC_DRAW);

    // program_ground1.tex= gl1.getAttribLocation(program_ground1, "a_TexCoord");
    // gl1.vertexAttribPointer(program_ground1.tex, 2, gl1.FLOAT, false, 0, 0);
    // gl1.enableVertexAttribArray(program_ground1.tex);

    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {

        var texture = gl1.createTexture();
        gl1.activeTexture(gl1.TEXTURE0)
        gl1.bindTexture(gl1.TEXTURE_2D, texture);

        gl1.uniform1i(gl1.getUniformLocation(program_ground1, "texMap"), 0);

        gl1.pixelStorei(gl1.UNPACK_FLIP_Y_WEBGL, true);
        gl1.texImage2D(gl1.TEXTURE_2D, 0, gl1.RGB, gl1.RGB, gl1.UNSIGNED_BYTE, image);

        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_S, gl1.REPEAT);
        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_T, gl1.REPEAT);

        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);
        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MAG_FILTER, gl1.LINEAR);


        // Insert WebGL texture initialization here
    };
    image.src = 'xamp23.png';


    var eye = vec3(0, 0, 0);
    var at = vec3(0.0, 0.0, 0.);
    const up = vec3(0.0, 1.0, 0.0);

    var fovy = 90.0; //angle in degrees
    var aspect = canvas.width / canvas.height;
    var near = 1.0;
    var far = 100.0;

    var theta = 0.0;
    var theta_shadow = 0.0;
    var motion = true;
    var above = false;
    var light = true;

    var circle_center = vec3(0.0, 2.0, -2.0);
    var radius = 2;

    var M = mat4(); //Identity matrix
    var d = -(circle_center[1] - (-1));
    M[3][3] = 0; //row //column
    M[3][1] = 1 / d + 0.00001;

    function render() {

        // BACKGROUND

        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);

        gl1.useProgram(program_ground1);

        var pm_ground = gl1.getUniformLocation(program_ground1, 'projectMatrix');
        var pj_ground = perspective(fovy, aspect, near, far);
        if (above) {
            pj_groundabove = lookAt(vec3(0.0, 1.0, -2.999999), vec3(0.0, 0.0, -3.0), vec3(0.0, 1.0, 0.0));
            pj_ground = mult(pj_ground, pj_groundabove);
        }
        gl1.uniformMatrix4fv(pm_ground, false, flatten(pj_ground));


        var mv_ground = gl1.getUniformLocation(program_ground1, "modelViewMatrix");
        var mvm_ground;

        mvm_ground = lookAt(eye, at, up);
        gl1.uniformMatrix4fv(mv_ground, false, flatten(mvm_ground));

        initAttributeVariable(gl1, program_ground1.position, modelground.vertexBuffer, 3, gl1.FLOAT);
        initAttributeVariable(gl1, program_ground1.tex, modelground.texBuffer, 2, gl1.FLOAT);

        gl1.uniform1i(gl1.getUniformLocation(program_ground1, "texMap"), 0);
        gl1.drawArrays(gl1.TRIANGLES, 0, 6);

        // BOTH OBJ AND SHADOWS

        gl1.useProgram(program_obj1);

        initAttributeVariable(gl1, program_obj1.a_Position, modelobj.vertexBuffer, 3, gl1.FLOAT);
        initAttributeVariable(gl1, program_obj1.a_Normal, modelobj.normalBuffer, 3, gl1.FLOAT);
        initAttributeVariable(gl1, program_obj1.a_Color, modelobj.colorBuffer, 4, gl1.FLOAT);
        gl1.bindBuffer(gl1.ELEMENT_ARRAY_BUFFER, modelobj.indexBuffer);

        var pm_obj = gl1.getUniformLocation(program_obj1, 'projectMatrix');
        var pj_obj = perspective(fovy, aspect, near, far);
        if (above) {
            pj_objabove = lookAt(vec3(0.0, 1.0, -2.999999), vec3(0.0, 0.0, -3.0), vec3(0.0, 1.0, 0.0));
            pj_obj = mult(pj_obj, pj_objabove);
        }

        gl1.uniformMatrix4fv(pm_obj, gl1.FALSE, flatten(pj_obj));

        var mv_obj = gl1.getUniformLocation(program_obj1, "modelViewMatrix");
        // var mvm_obj = lookAt(eye, at, up);
        // gl1.uniformMatrix4fv(mv_obj, false, flatten(mvm_obj));

        if (!g1_drawingInfo && g1_objDoc && g1_objDoc.isMTLComplete()) {
            // OBJ and all MTLs are available
            g1_drawingInfo = onReadComplete(gl1, modelobj, g1_objDoc);
        }
        if (!g1_drawingInfo) {

        } else {
            if (motion) {
                theta += 0.005;
            }

            var vmv_objfinal = mult(translate(0, -1.0 + Math.abs((Math.sin(theta) / 2)), -3), scalem(0.25, 0.25, 0.25));
            

            //SHADOWS

            if (light) {
                theta_shadow += 0.005;
            }

            var x = circle_center[0] + (radius * Math.sin(theta_shadow));
            var y = circle_center[1];
            var z = circle_center[2] + (radius * Math.cos(theta_shadow));

            var translation_positive = translate(x, y, z);
            var translation_negative = translate(-x, -y, -z);

            var model_aux = mult(translation_positive, M);
            var model = mult(model_aux, translation_negative);
            var model_final = mult(model, vmv_objfinal);

            gl1.uniform1f(gl1.getUniformLocation(program_obj1, "visibility"), 0);

            gl1.uniformMatrix4fv(mv_obj, false, flatten(model_final));
            gl1.depthFunc(gl1.GREATER);
            gl1.drawElements(gl1.TRIANGLES, g1_drawingInfo.indices.length, gl1.UNSIGNED_SHORT, 0);

            //OBJ
            gl1.uniformMatrix4fv(mv_obj, false, flatten(vmv_objfinal));
            gl1.uniform1f(gl1.getUniformLocation(program_obj1, "visibility"), 1);
            gl1.depthFunc(gl1.LESS);
            gl1.drawElements(gl1.TRIANGLES, g1_drawingInfo.indices.length, gl1.UNSIGNED_SHORT, 0);


        }

        window.requestAnimFrame(render);

    }

    render();

    var motion1 = document.getElementById("motion1");

    motion1.addEventListener("click", function () {
        if (motion)
            motion = false;
        else motion = true;
    });

    var above1 = document.getElementById("above1");

    above1.addEventListener("click", function () {
        if (above)
            above = false;
        else above = true;
    });

    var light1 = document.getElementById("light1");

    light1.addEventListener("click", function () {
        if (light)
            light = false;
        else light = true;
    });

}

init();

