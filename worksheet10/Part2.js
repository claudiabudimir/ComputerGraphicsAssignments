var obj_fn = 'monkey.obj'
var g_objDoc2 = null; 
var g_drawingInfo2 = null;

function inititialize_object_buffers(gl2, program) {
  var obj = new Object();
  obj.vertexBuffer = create_empty_array_buffer(gl2, program.a_Position, 3, gl2.FLOAT);
  obj.normalBuffer = create_empty_array_buffer(gl2, program.a_Normal, 3, gl2.FLOAT);
  obj.colorBuffer = create_empty_array_buffer(gl2, program.a_Color, 4, gl2.FLOAT);
  obj.indexBuffer = gl2.createBuffer();
  return obj;
}

function create_empty_array_buffer(gl2, a_attribute, num, type) {
  var buffer = gl2.createBuffer(); 
  gl2.bindBuffer(gl2.ARRAY_BUFFER, buffer);
  gl2.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl2.enableVertexAttribArray(a_attribute); 
  return buffer;
}

function onReadComplete(gl2, model, objDoc) {


  var drawingInfo = objDoc.getDrawingInfo();

  //write vertices
  gl2.bindBuffer(gl2.ARRAY_BUFFER, model.vertexBuffer);
  gl2.bufferData(gl2.ARRAY_BUFFER, drawingInfo.vertices, gl2.STATIC_DRAW);
  //write normals
  gl2.bindBuffer(gl2.ARRAY_BUFFER, model.normalBuffer);
  gl2.bufferData(gl2.ARRAY_BUFFER, drawingInfo.normals, gl2.STATIC_DRAW);
  //write colors
  gl2.bindBuffer(gl2.ARRAY_BUFFER, model.colorBuffer);
  gl2.bufferData(gl2.ARRAY_BUFFER, drawingInfo.colors, gl2.STATIC_DRAW);
  //write indices
  gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
  gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, drawingInfo.indices, gl2.STATIC_DRAW);

  return drawingInfo;
}

function readOBJFile(fileName, scale, reverse) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status !== 404) {
      onReadOBJFile2(request.responseText, fileName, scale, reverse);
    }
  }
  request.open('GET', fileName, true); 
  request.send(); 
}

function onReadOBJFile2(fileString, fileName, scale, reverse) {

  var objDoc = new OBJDoc(fileName); 
  var result = objDoc.parse(fileString, scale, reverse);
  if (!result) {
    g_objDoc2 = null; g_drawingInfo2 = null;
    console.log("OBJ file parsing error.");
    return;
  }
  g_objDoc2 = objDoc;
}


function init() {

  canvas = document.getElementById("gl-canvas2");
  gl2 = WebGLUtils.setupWebGL(canvas);

  gl2.viewport(0, 0, canvas.width, canvas.height);
  gl2.clearColor(0.3921, 0.5843, 0.9294, 1.0);
  gl2.clear(gl2.COLOR_BUFFER_BIT);

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
    var model = inititialize_object_buffers(gl2, program);
    readOBJFile(obj_fn, 0.6, true);
    return model;
  }

  var qrot = new Quaternion();
  var qinc = new Quaternion();

  var dragging = false;        
  var lastX = -1, 
  lastY = -1;  

  canvas.onmousedown = function (ev) {  
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      dragging = true;
    }
  };

  canvas.onmouseup = function (ev) {
    qinc.setIdentity();
    dragging = false;
  };

  canvas.onmousemove = function (ev) { 
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
    if (d < r) 
      z = Math.sqrt(r * r - d * d);
    else if (d < t)
      z = 0;
    else    
      z = t * t / d;
    return z;
  }

  var fovy = 45.0;
  var aspect = 1;
  var near = 0.5;
  var far = 60.0;
  var eye = vec3(1.0, 1.0, 3.0);
  var at = vec3(0.0, 0.0, 0.);
  const up = vec3(0.0, 1.0, 0.0);

  var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
  var pj = perspective(fovy, aspect, near, far);
  gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(pj));

  var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");
  modelViewMatrix = lookAt(eye, at, up);
  gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));


  function render() {

    var up = qrot.apply(vec3(0, 1, 0));
    var rot_eye = qrot.apply(vec3(1, 1, 3));

    gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(lookAt(rot_eye, vec3(0), up)));

    if (!g_drawingInfo2 && g_objDoc2 && g_objDoc2.isMTLComplete()) {
      g_drawingInfo2 = onReadComplete(gl2, model, g_objDoc2);
    }
    
    if (!g_drawingInfo2) {
      window.requestAnimationFrame(render);
      return;
    }

    gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
    gl2.drawElements(gl2.TRIANGLES, g_drawingInfo2.indices.length, gl2.UNSIGNED_SHORT, 0);

    window.requestAnimFrame(render);

  }

  render();

}

init();