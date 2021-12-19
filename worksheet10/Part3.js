var obj_fn = 'monkey.obj'
var g_objDoc3 = null;
var g_drawingInfo3 = null;

function inititialize_object_buffers(gl3, program) {
  var obj = new Object();
  obj.vertexBuffer = create_empty_array_buffer(gl3, program.a_Position, 3, gl3.FLOAT);
  obj.normalBuffer = create_empty_array_buffer(gl3, program.a_Normal, 3, gl3.FLOAT);
  obj.colorBuffer = create_empty_array_buffer(gl3, program.a_Color, 4, gl3.FLOAT);
  obj.indexBuffer = gl3.createBuffer();
  return obj;
}

function create_empty_array_buffer(gl3, a_attribute, num, type) {
  var buffer = gl3.createBuffer();
  gl3.bindBuffer(gl3.ARRAY_BUFFER, buffer);
  gl3.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl3.enableVertexAttribArray(a_attribute); 
  return buffer;
}

function onReadComplete(gl3, model, objDoc) {

  var drawingInfo = objDoc.getDrawingInfo();

  //write vertices
  gl3.bindBuffer(gl3.ARRAY_BUFFER, model.vertexBuffer);
  gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.vertices, gl3.STATIC_DRAW);
  //write normals
  gl3.bindBuffer(gl3.ARRAY_BUFFER, model.normalBuffer);
  gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.normals, gl3.STATIC_DRAW);
  //write colors
  gl3.bindBuffer(gl3.ARRAY_BUFFER, model.colorBuffer);
  gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.colors, gl3.STATIC_DRAW);
  //write indices
  gl3.bindBuffer(gl3.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
  gl3.bufferData(gl3.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl3.STATIC_DRAW);

  return drawingInfo;
}

function readOBJFile(fileName, scale, reverse) {
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
    g_objDoc3 = null; g_drawingInfo3 = null;

    return;
  }
  g_objDoc3 = objDoc;
}


function init() {

  canvas = document.getElementById("gl-canvas3");
  gl3 = WebGLUtils.setupWebGL(canvas);

  gl3.viewport(0, 0, canvas.width, canvas.height);
  gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
  gl3.clear(gl3.COLOR_BUFFER_BIT);

  var program = initShaders(gl3, "vertex-shader", "fragment-shader");
  gl3.useProgram(program);

  gl3.enable(gl3.DEPTH_TEST);
  gl3.enable(gl3.CULL_FACE);
  gl3.cullFace(gl3.BACK);

  var model = initObject();

  function initObject() {

    program.a_Position = gl3.getAttribLocation(program, 'a_Position');
    program.a_Normal = gl3.getAttribLocation(program, 'a_Normal');
    program.a_Color = gl3.getAttribLocation(program, 'a_Color');
    var model = inititialize_object_buffers(gl3, program);
    readOBJFile(obj_fn, 0.6, true);

    return model;
  }

  var eye = vec3(1.0, 1.0, 3.0);
  var lookat = vec3(0.0, 0.0, 0.);
  var up = vec3(0.0, 1.0, 0.0);

  var dragging = false;       
  var lastX = -1, lastY = -1;   
  var current_action = 0;     

  canvas.onmousedown = function (ev) {   
    ev.preventDefault();
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      dragging = true;
      current_action = ev.button + 1;
    }
  };

  canvas.oncontextmenu = function (ev) { ev.preventDefault(); };

  canvas.onmouseup = function (ev) {
    var x = ev.clientX, y = ev.clientY;
    if (x === lastX && y === lastY) {
      qinc.setIdentity();
    }
    dragging = false;
    current_action = 0;
  }; 

  var g_last = Date.now();
  canvas.onmousemove = function (ev) { 
    var x = ev.clientX, y = ev.clientY;
    if (dragging) {
      var now = Date.now();
      var elapsed = now - g_last;
      if (elapsed > 20) {
        g_last = now;
        var rect = ev.target.getBoundingClientRect();
        var s_x = ((x - rect.left) / rect.width - 0.5) * 2;
        var s_y = (0.5 - (y - rect.top) / rect.height) * 2;
        var s_last_x = ((lastX - rect.left) / rect.width - 0.5) * 2;
        var s_last_y = (0.5 - (lastY - rect.top) / rect.height) * 2;
        switch (current_action) {
          case 1: { 
            var v1 = vec3(s_x, s_y, project_to_sphere(s_x, s_y));
            var v2 = vec3(s_last_x, s_last_y, project_to_sphere(s_last_x, s_last_y));
            qinc = qinc.make_rot_vec2vec(normalize(v1), normalize(v2));
          }
            break;
          case 2: { 
            var e = eye_dist_pan;
            e[0] += (s_y - s_last_y) * e[0]
            e[0] = Math.max(e[0], 0.01);
          }
            break;
          case 3: { 
            var e = eye_dist_pan;
            e[1] += (s_x - s_last_x) * e[0] * 0.25;
            e[2] += (s_y - s_last_y) * e[0] * 0.25;
          }
            break;
        }
        lastX = x, lastY = y;
      }
    }
  };

  function project_to_sphere(x, y) {
    var r = 2;
    var d = Math.sqrt(x * x + y * y);
    var t = r * Math.sqrt(2);
    var z;
    if (d < r) 
      z = Math.sqrt(r * r - d * d);
    else if (d < t)
      z = 0;
    else       
      z = t * t / d;
    return z;
  }

  var e = eye;
  var p = lookat;
  var z_dir = vec3(e[0] - p[0], e[1] - p[1], e[2] - p[2]);
  var z = z_dir;
  var eye_dist = Math.sqrt(z[0] * z[0] + z[1] * z[1] + z[2] * z[2]);
  var eye_dist_pan = vec3([eye_dist, 0, 0]);
  var qrot = new Quaternion();
  var qinc = new Quaternion();
  qrot = qrot.make_rot_vec2vec(vec3(0, 0, 1), normalize(z_dir));
  var qrot_inv = new Quaternion(qrot);
  qrot_inv.invert();
  up = qrot_inv.apply(up);

  var fovy = 45.0;
  var aspect = 1;
  var near = 0.5;
  var far = 60.0;

  var projectMatrix = gl3.getUniformLocation(program, 'projectMatrix');
  var pj = perspective(fovy, aspect, near, far);
  gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(pj));

  var modelViewMatrixLoc = gl3.getUniformLocation(program, "modelViewMatrix");
  modelViewMatrix = lookAt(eye, lookat, up);
  gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

  function render() {

    qrot = qrot.multiply(qinc);
    var rot_up = qrot.apply(up);
    var u = rot_up;
    var right = qrot.apply(vec3(1, 0, 0));
    var r = right;
    var p = lookat;
    var e = eye_dist_pan;
    var centre = vec3(p[0] - r[0] * e[1] - u[0] * e[2], p[1] - r[1] * e[1] - u[1] * e[2], p[2] - r[2] * e[1] - u[2] * e[2]);
    var c = centre;
    var rot_eye = qrot.apply(vec3(0, 0, e[0]));
    var re = rot_eye;
    var temp_re = vec3(re[0] + c[0], re[1] + c[1], re[2] + c[2]);
    var final = lookAt(temp_re, c, u);

    gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(final));

    if (!g_drawingInfo3 && g_objDoc3 && g_objDoc3.isMTLComplete()) {
      g_drawingInfo3 = onReadComplete(gl3, model, g_objDoc3);
    }
    if (!g_drawingInfo3) {
      window.requestAnimationFrame(render);
      return;
    }

    gl3.clear(gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);
    gl3.drawElements(gl3.TRIANGLES, g_drawingInfo3.indices.length, gl3.UNSIGNED_SHORT, 0);

    window.requestAnimFrame(render);

  }

  render();

}

init();