var obj_fn = 'teapot.obj'
var g_objDoc = null;
var g_drawingInfo = null;

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

function initialize_ground_buffers(gl1, program, p, t) {
    var obj = new Object();
    obj.vertexBuffer = create_empty_array_buffer(gl1, program.position, 3, gl1.FLOAT);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(p), gl1.STATIC_DRAW);
    obj.texBuffer = create_empty_array_buffer(gl1, program.tex, 2, gl1.FLOAT);
    gl1.bufferData(gl1.ARRAY_BUFFER, flatten(t), gl1.STATIC_DRAW);
    return obj;
}

function initialize_attribute_variable(gl, attribute, buffer, num, type) {
    gl1.bindBuffer(gl1.ARRAY_BUFFER, buffer);
    gl1.vertexAttribPointer(attribute, num, type, false, 0, 0);
    gl1.enableVertexAttribArray(attribute);
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
        g_objDoc = null;
        g_drawingInfo = null;
        return;
    }
    g_objDoc = objDoc;
}


function init() {
    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);
    gl1.enable(gl1.DEPTH_TEST);

    //object program and model
    var object_program = initShaders(gl1, "vertex-shader-object", "fragment-shader-object");
    gl1.useProgram(object_program);

    function initialize_object() {
        object_program.a_Position = gl1.getAttribLocation(object_program, 'a_Position');
        object_program.a_Normal = gl1.getAttribLocation(object_program, 'a_Normal');
        object_program.a_Color = gl1.getAttribLocation(object_program, 'a_Color');
        var model = inititialize_object_buffers(gl1, object_program);
        readOBJFile(obj_fn, 1.0, true);
        return model;
    }
    var object_model = initialize_object();


    //ground program and model
    var ground_program = initShaders(gl1, "vertex-shader-ground", "fragment-shader-ground");
    gl1.useProgram(ground_program);

    function initialize_ground() {
        ground_program.position = gl1.getAttribLocation(ground_program, "a_Position");
        ground_program.tex = gl1.getAttribLocation(ground_program, "a_TexCoord");
        var ground_coordinates = [vec3(-2.0, -1.0, -1.0), vec3(-2.0, -1.0, -5.0), vec3(2.0, -1.0, -1.0), vec3(2.0, -1.0, -5.0)]; // 2,0,1   1,3,2
        var vertices = [ground_coordinates[2], ground_coordinates[0], ground_coordinates[1], ground_coordinates[1], ground_coordinates[3], ground_coordinates[2]];
        var texture_coordinates = [vec2(-1.0, 1.0), vec2(-1.0, -1.0), vec2(1.0, 1.0), vec2(1.0, -1.0)]; //change
        var all_tex = [texture_coordinates[2], texture_coordinates[0], texture_coordinates[1], texture_coordinates[1], texture_coordinates[3], texture_coordinates[2]];
        var ground_model = initialize_ground_buffers(gl1, ground_program, vertices, all_tex);
        return ground_model;
    }
    var ground_model = initialize_ground();

    //upload texture image for ground
    var image = document.createElement('img');
    image.crossorigin = 'anonymous';
    image.onload = function () {
        var texture = gl1.createTexture();
        gl1.activeTexture(gl1.TEXTURE0)
        gl1.bindTexture(gl1.TEXTURE_2D, texture);

        gl1.uniform1i(gl1.getUniformLocation(ground_program, "texMap"), 0);

        gl1.pixelStorei(gl1.UNPACK_FLIP_Y_WEBGL, true);
        gl1.texImage2D(gl1.TEXTURE_2D, 0, gl1.RGB, gl1.RGB, gl1.UNSIGNED_BYTE, image);

        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_S, gl1.REPEAT);
        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_WRAP_T, gl1.REPEAT);

        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MIN_FILTER, gl1.LINEAR);
        gl1.texParameteri(gl1.TEXTURE_2D, gl1.TEXTURE_MAG_FILTER, gl1.LINEAR);
    };
    image.src = 'xamp23.png';

    var eye = vec3(0, 0, 0);
    var at = vec3(0.0, 0.0, 0.);
    const up = vec3(0.0, 1.0, 0.0);

    var fovy = 90.0;
    var aspect = 1;
    var near = 1.0;
    var far = 80.0;
    var theta = 0.0;
    
    var theta_for_shadow = 0.0;
    var is_in_motion = true;
    var is_above_view_active = false;
    var has_light = true;

    var light = vec3(0.0, 2.0, -2.0);
    var m = mat4();
    m[3][3] = 0;
    m[3][1] = -1 / (light[1] + 1) + 0.00001;

    function render() {
        gl1.clear(gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);

        //ground
        gl1.useProgram(ground_program);
        var pm_ground = gl1.getUniformLocation(ground_program, 'projectMatrix');
        var pj_ground = perspective(fovy, aspect, near, far);
        if (is_above_view_active) {
            pj_groundabove = lookAt(vec3(0.0, 1.0, -3.000001), vec3(0.0, 0.0, -3.0), vec3(0.0, 1.0, 0.0));
            pj_ground = mult(pj_ground, pj_groundabove);
        }
        gl1.uniformMatrix4fv(pm_ground, false, flatten(pj_ground));


        var mv_ground = gl1.getUniformLocation(ground_program, "modelViewMatrix");
        var mvm_ground;

        mvm_ground = lookAt(eye, at, up);
        gl1.uniformMatrix4fv(mv_ground, false, flatten(mvm_ground));

        initialize_attribute_variable(gl1, ground_program.position, ground_model.vertexBuffer, 3, gl1.FLOAT);
        initialize_attribute_variable(gl1, ground_program.tex, ground_model.texBuffer, 2, gl1.FLOAT);

        gl1.uniform1i(gl1.getUniformLocation(ground_program, "texMap"), 0);
        gl1.drawArrays(gl1.TRIANGLES, 0, 6);

        //object 
        gl1.useProgram(object_program);
        initialize_attribute_variable(gl1, object_program.a_Position, object_model.vertexBuffer, 3, gl1.FLOAT);
        initialize_attribute_variable(gl1, object_program.a_Normal, object_model.normalBuffer, 3, gl1.FLOAT);
        initialize_attribute_variable(gl1, object_program.a_Color, object_model.colorBuffer, 4, gl1.FLOAT);
        gl1.bindBuffer(gl1.ELEMENT_ARRAY_BUFFER, object_model.indexBuffer);

        var proj_matrix_obj = gl1.getUniformLocation(object_program, 'projectMatrix');
        var object_proj = perspective(fovy, aspect, near, far);
        if (is_above_view_active) {
            pj_objabove = lookAt(vec3(0.0, 1.0, -3.000001), vec3(0.0, 0.0, -3.0), vec3(0.0, 1.0, 0.0));
            object_proj = mult(object_proj, pj_objabove);
        }
        gl1.uniformMatrix4fv(proj_matrix_obj, gl1.FALSE, flatten(object_proj));

        if (!g_drawingInfo && g_objDoc && g_objDoc.isMTLComplete()) {
            g_drawingInfo = onReadComplete(gl1, object_model, g_objDoc);
        }

        if (g_drawingInfo) {

            if (is_in_motion) {
                theta += 0.005;
            }

            if (has_light) {
                theta_for_shadow += 0.005;
            }
            
            var view_matrix_obj = gl1.getUniformLocation(object_program, "modelViewMatrix");

            var intermediar_model = mult(translate(light[0] + (2 * Math.sin(theta_for_shadow)), light[1], light[2] + (2 * Math.cos(theta_for_shadow))), m);
            var model = mult(intermediar_model, translate(-(light[0] + (2 * Math.sin(theta_for_shadow))), -light[1], -(light[2] + (2 * Math.cos(theta_for_shadow)))));
            var final_model = mult(model, mult(translate(0, -1.0 + Math.abs((Math.sin(theta) / 2)), -3), scalem(0.25, 0.25, 0.25)));

            //shadows
            gl1.uniform1f(gl1.getUniformLocation(object_program, "visibility"), 0);
            gl1.uniformMatrix4fv(view_matrix_obj, false, flatten(final_model));
            gl1.depthFunc(gl1.GREATER);
            gl1.drawElements(gl1.TRIANGLES, g_drawingInfo.indices.length, gl1.UNSIGNED_SHORT, 0);

            //teapot
            gl1.uniform1f(gl1.getUniformLocation(object_program, "visibility"), 1);
            gl1.uniformMatrix4fv(view_matrix_obj, false, flatten(mult(translate(0, -1.0 + Math.abs((Math.sin(theta) / 2)), -3), scalem(0.25, 0.25, 0.25))));
            gl1.depthFunc(gl1.LESS);
            gl1.drawElements(gl1.TRIANGLES, g_drawingInfo.indices.length, gl1.UNSIGNED_SHORT, 0);
        }
        window.requestAnimFrame(render);
    }
    render();

    var is_in_motion = document.getElementById("motion");

    is_in_motion.addEventListener("click", function () {
        is_in_motion = !is_in_motion;
    });

    var view = document.getElementById("view");

    view.addEventListener("click", function () {
        is_above_view_active = !is_above_view_active;
    });

    var has_light = document.getElementById("light");

    has_light.addEventListener("click", function () {
        has_light = !has_light;
    });
}

init();

