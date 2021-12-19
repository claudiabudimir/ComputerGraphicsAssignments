var obj_fn = 'monkey.obj'

var g2_objDoc = null; // Info parsed from OBJ file
var g2_drawingInfo = null; // Info for drawing the 3D model with WebGL



// Create a buffer object and perform the initial configuration
function initVertexBuffers(gl2, program) {

  var o = new Object();

  o.vertexBuffer = createEmptyArrayBuffer(gl2, program.a_Position, 3, gl2.FLOAT);
  o.normalBuffer = createEmptyArrayBuffer(gl2, program.a_Normal, 3, gl2.FLOAT);
  o.colorBuffer = createEmptyArrayBuffer(gl2, program.a_Color, 4, gl2.FLOAT);
  o.indexBuffer = gl2.createBuffer();

  return o;
}

function createEmptyArrayBuffer(gl2, a_attribute, num, type) {

  var buffer = gl2.createBuffer(); // Create a buffer object

  gl2.bindBuffer(gl2.ARRAY_BUFFER, buffer);
  gl2.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl2.enableVertexAttribArray(a_attribute); // Enable the assignment

  return buffer;
}

function onReadComplete(gl2, model, objDoc) {
  // Acquire the vertex coordinates and colors from OBJ file
  var drawingInfo = objDoc.getDrawingInfo();

  // Write date into the buffer object
  gl2.bindBuffer(gl2.ARRAY_BUFFER, model.vertexBuffer);
  gl2.bufferData(gl2.ARRAY_BUFFER, drawingInfo.vertices, gl2.STATIC_DRAW);

  gl2.bindBuffer(gl2.ARRAY_BUFFER, model.normalBuffer);
  gl2.bufferData(gl2.ARRAY_BUFFER, drawingInfo.normals, gl2.STATIC_DRAW);

  gl2.bindBuffer(gl2.ARRAY_BUFFER, model.colorBuffer);
  gl2.bufferData(gl2.ARRAY_BUFFER, drawingInfo.colors, gl2.STATIC_DRAW);

  // Write the indices to the buffer object
  gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
  gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl2.STATIC_DRAW);

  return drawingInfo;
}

function readOBJFile(fileName, gl2, model, scale, reverse) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status !== 404) {
      onReadOBJFile2(request.responseText, fileName, scale, reverse);
    }
  }
  request.open('GET', fileName, true); // Create a request to get file
  request.send(); // Send the request
}

function onReadOBJFile2(fileString, fileName, scale, reverse) {

  var objDoc = new OBJDoc(fileName); // Create a OBJDoc object
  var result = objDoc.parse(fileString, scale, reverse);
  if (!result) {
    g2_objDoc = null; g2_drawingInfo = null;
    console.log("OBJ file parsing error.");
    return;
  }
  g2_objDoc = objDoc;
}


function init() {

  canvas = document.getElementById("gl-canvas2");
  gl2 = WebGLUtils.setupWebGL(canvas);

  if (!gl2) {
    alert("WebGL isn�t available");
  }

  gl2.viewport(0, 0, canvas.width, canvas.height);
  gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
  gl2.clear(gl2.COLOR_BUFFER_BIT);


  // Load shaders and initialize attribute buffers
  var program = initShaders(gl2, "vertex-shader", "fragment-shader");
  gl2.useProgram(program);

  gl2.enable(gl2.DEPTH_TEST);
  gl2.enable(gl2.CULL_FACE);
  gl2.cullFace(gl2.BACK);


  var model = initObject();

  function initObject() {

    program.a_Position = gl2.getAttribLocation(program, 'a_Position');
    program.a_Normal = gl2.getAttribLocation(program, 'a_Normal');
    program.a_Color = gl2.getAttribLocation(program, 'a_Color');
    // Prepare empty buffer objects for vertex coordinates, colors, and normals
    var model = initVertexBuffers(gl2, program);

    // Start reading the OBJ file
    readOBJFile(obj_fn, gl2, model, 0.6, true);

    return model;
  }

  var qrot = new Quaternion();
  var qinc = new Quaternion();

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

  canvas.onmouseup = function (ev) {
    qinc.setIdentity();
    dragging = false;
  }; // Mouse is released

  canvas.onmousemove = function (ev) { // Mouse is moved
    var x = ev.clientX, y = ev.clientY;
    if (dragging) {
      var rect = ev.target.getBoundingClientRect();
      var s_x = ((x - rect.left) / rect.width - 0.5) * 2;
      var s_y = (0.5 - (y - rect.top) / rect.height) * 2;
      var s_last_x = ((lastX - rect.left) / rect.width - 0.5) * 2;
      var s_last_y = (0.5 - (lastY - rect.top) / rect.height) * 2;
      var v1 = vec3(s_x, s_y, project_to_sphere(s_x, s_y));
      var v2 = vec3(s_last_x, s_last_y, project_to_sphere(s_last_x, s_last_y));
      qinc = qinc.make_rot_vec2vec(normalize(v1), normalize(v2));
      qrot = qrot.multiply(qinc);
    }
    lastX = x, lastY = y;
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



  var eye = vec3(1.0, 1.0, 3.0);
  var at = vec3(0.0, 0.0, 0.);
  const up = vec3(0.0, 1.0, 0.0);

  var fovy = 45.0; //angl2es in degrees
  var aspect = canvas.width / canvas.height;
  var near = 0.1;
  var far = 50.0;


  var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
  var pj = perspective(fovy, aspect, near, far);
  gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(pj));

  var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");
  modelViewMatrix = lookAt(eye, at, up);
  gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));


  modelViewMatrix = lookAt(eye, at, up);
  gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

  function render() {

    var up = qrot.apply(vec3(0, 1, 0));
    var rot_eye = qrot.apply(vec3(1, 1, 3));
    var la = lookAt(rot_eye, vec3(0), up);


    gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(la));


    if (!g2_drawingInfo && g2_objDoc && g2_objDoc.isMTLComplete()) {
      // OBJ and all MTLs are available
      console.log("IM HEREEE")
      g2_drawingInfo = onReadComplete(gl2, model, g2_objDoc);
    }
    if (!g2_drawingInfo) {
      window.requestAnimationFrame(render);
      return;
    }

    gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
    gl2.drawElements(gl2.TRIANGLES, g2_drawingInfo.indices.length, gl2.UNSIGNED_SHORT, 0);

    window.requestAnimFrame(render);

  }

  render();

}

init();