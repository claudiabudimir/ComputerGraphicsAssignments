var numTimesToSubdivide = 2;

function init() {

    canvas = document.getElementById("gl-canvas1");
    gl1 = WebGLUtils.setupWebGL(canvas);

    if (!gl1) {
        alert("WebGL isn�t available");
    }

    gl1.viewport(0, 0, canvas.width, canvas.height);
    gl1.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl1.clear(gl1.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl1, "vertex-shader-1", "fragment-shader-1");
    gl1.useProgram(program);

    gl1.enable(gl1.DEPTH_TEST);

    // var coordinates = [
    //     vec3(0.5, 0.5, 0.5),
    //     vec3(-0.5, 0.5, 0.5),
    //     vec3(-0.5, -0.5, 0.5),
    //     vec3(0.5, -0.5, 0.5),
    //     vec3(0.5, -0.5, -0.5),
    //     vec3(0.5, 0.5, -0.5),
    //     vec3(-0.5, 0.5, -0.5),
    //     vec3(-0.5, -0.5, -0.5)
    // ];


    // var indices = [
    //    0, 1, 2,       //Front
    //    0, 2, 3, 
       
    //    0, 3, 4,       //Right
    //    0, 4, 5, 

    //    0, 5, 6,       //Up
    //    0, 6, 1, 

    //    1, 6, 7,       //Left
    //    1, 7, 2, 

    //    7, 4, 3,       //Down
    //    7, 3, 2, 

    //    4, 7, 6,       //Back
    //    4, 6, 5 
    // ];

    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    function tetrahedron(a, b, c, d, n){
        divideTriangl1e(a, b, c, n);
        divideTriangl1e(d, c, b, n);
        divideTriangl1e(a, d, b, n);
        divideTriangl1e(a, c, d, n);
    }

    function divideTriangl1e(a, b, c, count){
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangl1e(a, ab, ac, count - 1);
            divideTriangl1e(ab, b, bc, count - 1);
            divideTriangl1e(bc, c, ac, count - 1);
            divideTriangl1e(ab, bc, ac, count - 1);
        } else {
            triangl1e(a, b, c);
        }
    }

    function triangl1e(a, b, c){
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);
        index += 3;
    }
    var index = 0;
    var pointsArray = [];

    gl1.p_buffer = null;

    function main1(){
       

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        //console.log(pointsArray);

        // var p_buffer = gl1.createBuffer();
        // gl1.bindBuffer(gl1.ARRAY_BUFFER, p_buffer);
        // gl1.bufferData(gl1.ARRAY_BUFFER, flatten(pointsArray), gl1.STATIC_DRAW);

        gl1.deleteBuffer(gl1.p_buffer);
        gl1.p_buffer = gl1.createBuffer();
        gl1.bindBuffer(gl1.ARRAY_BUFFER, gl1.p_buffer);
        gl1.bufferData(gl1.ARRAY_BUFFER, flatten(pointsArray), gl1.STATIC_DRAW);

        var a_Position = gl1.getAttribLocation(program, "a_Position");
        gl1.vertexAttribPointer(a_Position, 4, gl1.FLOAT, false, 0, 0);
        gl1.enableVertexAttribArray(a_Position);
    }
    
    main1();

    var fovy = 45.0; //angl1es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 12.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 5.0);


    var projectMatrix = gl1.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl1.uniformMatrix4fv(projectMatrix, gl1.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl1.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl1.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    function render(){
        gl1.clear( gl1.COLOR_BUFFER_BIT | gl1.DEPTH_BUFFER_BIT);
        for(var i = 0; i < index; i+=3)
            gl1.drawArrays(gl1.TRIANGLES, i , 3);
    }

    render();

    var increment = document.getElementById("increment1");

    var decrement = document.getElementById("decrement1");


    increment.addEventListener("click", function () {
        if(numTimesToSubdivide < 5){
            numTimesToSubdivide ++;
            index = 0;
            pointsArray = [];
            main1()
            render();
        }
    });

    decrement.addEventListener("click", function () {
        if(numTimesToSubdivide > 0){
            numTimesToSubdivide --;
            index = 0;
            pointsArray = [];
            main1()
            render();
        }
    });

}

init();