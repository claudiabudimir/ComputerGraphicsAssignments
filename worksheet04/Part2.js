"use strict";

function init() {
    //Init the canvas
    var canvas = document.getElementById("gl-canvas2");
    var gl = WebGLUtils.setupWebGL(canvas);

    //Set the viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Init shaders
    var program = initShaders(gl, "vertex-shader-2", "fragment-shader-2");
    gl.useProgram(program);

    //Enable a depth test
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);//Enable back face culling, The initial value of glCullFace is GL_BACK.
    gl.frontFace(gl.CCW); // Passing GL_CCW to mode selects counterclockwise polygons as front-facing 

    //Approximation of a sphere by recursive subdivision algorithm
    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);
    
    function tetrahedron(a, b, c, d, n){
        divideTriangle(a, b, c, n);
        divideTriangle(d, c, b, n);
        divideTriangle(a, d, b, n);
        divideTriangle(a, c, d, n);
    }

    function divideTriangle(a, b, c, count){
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangle(a, ab, ac, count - 1);
            divideTriangle(ab, b, bc, count - 1);
            divideTriangle(bc, c, ac, count - 1);
            divideTriangle(ab, bc, ac, count - 1);
        } else {
            triangle(a, b, c);
        }
    }

    function triangle(a, b, c){
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);
        index += 3;
    }
    
    //Create sphere by using the division algorithm
    var numTimesToSubdivide = 0; //initial values
    var index = 0;
    var pointsArray = [];
    gl.p_buffer = null;

    function createSphere()
    {
        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        //Buffer Creation For Vertices
        gl.deleteBuffer(gl.p_buffer);
        gl.p_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.p_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);
        
        var vPosition = gl.getAttribLocation(program, "a_Position");
        gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);
    }
    createSphere();//first call
    
    //projectMatrix & modelViewMatrixLoc
    var fovy = 45.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 15.0;
    const up = vec3(0.0, 1.0, 0.0);
    var at = vec3(0.0, 0.0, 0.0);
    var eye = vec3(0.0, 0.0, 4.9);//is in one-point (front) perspective

    var projectMatrix = gl.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl.uniformMatrix4fv(projectMatrix, gl.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    var modelViewMatrix = lookAt(eye, at, up);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    
    function render(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for(var cnt=0; cnt<index; cnt+=3)
        gl.drawArrays(gl.TRIANGLES, cnt, 3);
    }
    render();//initial render call
    
    var faceOrderFlag = true;//initial value
    var increment = document.getElementById("incr_button2");
    var decrement = document.getElementById("decr_button2");
    var windingOrderSwap = document.getElementById("windingOrderSwap_button");

    increment.addEventListener("click", function () {
        if(numTimesToSubdivide < 5){
            index = 0;//reset index
            pointsArray = [];//reset points array 
            numTimesToSubdivide ++;

            createSphere()//sphere recreation
            render();//sphere redraw
        }
    });

    decrement.addEventListener("click", function () {
        if(numTimesToSubdivide > 0){
            index = 0;//reset index
            pointsArray = [];//reset points array 

            numTimesToSubdivide --;
            createSphere()//sphere recreation
            render();//sphere redraw
        }
    });

    windingOrderSwap.addEventListener("click", function () {
        if(faceOrderFlag){
            faceOrderFlag = false;
            gl.frontFace(gl.CW);//clockwise order
        }else{
            faceOrderFlag = true;
            gl.frontFace(gl.CCW);//counter clockwise order
        }
        render();
    });
}
init();