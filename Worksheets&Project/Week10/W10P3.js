var obj_fn = 'final_pokeball.obj'

var g3_objDoc = null; // Info parsed from OBJ file
var g3_drawingInfo = null; // Info for drawing the 3D model with WebGL



// Create a buffer object and perform the initial configuration
function initVertexBuffers(gl3, program) {

  var o = new Object();

  o.vertexBuffer = createEmptyArrayBuffer(gl3, program.a_Position, 3, gl3.FLOAT);
  o.normalBuffer = createEmptyArrayBuffer(gl3, program.a_Normal, 3, gl3.FLOAT);
  o.colorBuffer = createEmptyArrayBuffer(gl3, program.a_Color, 4, gl3.FLOAT);
  o.indexBuffer = gl3.createBuffer();

  return o;
}

function createEmptyArrayBuffer(gl3, a_attribute, num, type) {

  var buffer = gl3.createBuffer(); // Create a buffer object

  gl3.bindBuffer(gl3.ARRAY_BUFFER, buffer);
  gl3.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl3.enableVertexAttribArray(a_attribute); // Enable the assignment

  return buffer;
}

function onReadComplete(gl3, model, objDoc) {
  // Acquire the vertex coordinates and colors from OBJ file
  var drawingInfo = objDoc.getDrawingInfo();

  // Write date into the buffer object
  gl3.bindBuffer(gl3.ARRAY_BUFFER, model.vertexBuffer);
  gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.vertices, gl3.STATIC_DRAW);

  gl3.bindBuffer(gl3.ARRAY_BUFFER, model.normalBuffer);
  gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.normals, gl3.STATIC_DRAW);

  gl3.bindBuffer(gl3.ARRAY_BUFFER, model.colorBuffer);
  gl3.bufferData(gl3.ARRAY_BUFFER, drawingInfo.colors, gl3.STATIC_DRAW);

  // Write the indices to the buffer object
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
  request.open('GET', fileName, true); // Create a request to get file
  request.send(); // Send the request
}

function onReadOBJFile3(fileString, fileName, scale, reverse) {

  var objDoc = new OBJDoc(fileName); // Create a OBJDoc object
  var result = objDoc.parse(fileString, scale, reverse);
  if (!result) {
    g3_objDoc = null; g3_drawingInfo = null;
    console.log("OBJ file parsing error.");
    return;
  }
  g3_objDoc = objDoc;
}


function init() {

  canvas = document.getElementById("gl-canvas3");
  gl3 = WebGLUtils.setupWebGL(canvas);

  if (!gl3) {
    alert("WebGL isn�t available");
  }

  gl3.viewport(0, 0, canvas.width, canvas.height);
  gl3.clearColor(0.3921, 0.5843, 0.9294, 1.0);
  gl3.clear(gl3.COLOR_BUFFER_BIT);


  // Load shaders and initialize attribute buffers
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
    // Prepare empty buffer objects for vertex coordinates, colors, and normals
    var model = initVertexBuffers(gl3, program);

    // Start reading the OBJ file
    readOBJFile(obj_fn, gl3, model, 0.02, true);

    return model;
  }

  var eye = vec3(1.0, 1.0, 3.0);
  var lookat = vec3(0.0, 0.0, 0.);
  var up = vec3(0.0, 1.0, 0.0);

  var dragging = false;         // Dragging or not
  var lastX = -1, lastY = -1;   // Last position of the mouse
  var current_action = 0;       // Actions: 0 - none, 1 - orbit, 2 - dolly, 3 - pan

  canvas.onmousedown = function (ev) {   // Mouse is pressed
    ev.preventDefault();
    var x = ev.clientX, y = ev.clientY;
    // Start dragging if a mouse is in <canvas>
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
  }; // Mouse is released

  var g_last = Date.now();
  canvas.onmousemove = function (ev) { // Mouse is moved
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
          case 1: { // orbit
            var v1 = vec3(s_x, s_y, project_to_sphere(s_x, s_y));
            var v2 = vec3(s_last_x, s_last_y, project_to_sphere(s_last_x, s_last_y));
            qinc = qinc.make_rot_vec2vec(normalize(v1), normalize(v2));
          }
            break;
          case 2: { // dolly
            var e = eye_dist_pan;
            e[0] += (s_y - s_last_y) * e[0]
            e[0] = Math.max(e[0], 0.01);
          }
            break;
          case 3: { // pan
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
    if (d < r) // Inside sphere
      z = Math.sqrt(r * r - d * d);
    else if (d < t)
      z = 0;
    else       // On hyperbola
      z = t * t / d;
    return z;
  }

  // Initialize trackball
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

  var fovy = 45.0; //angl3es in degrees
  var aspect = canvas.width / canvas.height;
  var near = 0.1;
  var far = 50.0;


  var projectMatrix = gl3.getUniformLocation(program, 'projectMatrix');
  var pj = perspective(fovy, aspect, near, far);
  gl3.uniformMatrix4fv(projectMatrix, gl3.FALSE, flatten(pj));

  var modelViewMatrixLoc = gl3.getUniformLocation(program, "modelViewMatrix");
  modelViewMatrix = lookAt(eye, lookat, up);
  gl3.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));


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


    if (!g3_drawingInfo && g3_objDoc && g3_objDoc.isMTLComplete()) {
      // OBJ and all MTLs are available
      console.log("IM HEREEE")
      g3_drawingInfo = onReadComplete(gl3, model, g3_objDoc);
    }
    if (!g3_drawingInfo) {
      window.requestAnimationFrame(render);
      return;
    }

    gl3.clear(gl3.COLOR_BUFFER_BIT | gl3.DEPTH_BUFFER_BIT);
    gl3.drawElements(gl3.TRIANGLES, g3_drawingInfo.indices.length, gl3.UNSIGNED_SHORT, 0);

    window.requestAnimFrame(render);

  }

  render();

}

init();