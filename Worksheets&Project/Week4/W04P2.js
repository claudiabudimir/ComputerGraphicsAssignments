

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
    var program = initShaders(gl2, "vertex-shader-2", "fragment-shader-2");
    gl2.useProgram(program);

    gl2.enable(gl2.DEPTH_TEST);
    gl2.enable(gl2.CULL_FACE);
    gl2.frontFace(gl2.CW); // Changing this changes the color FRONT VS BACK

    function tetrahedron(a, b, c, d, n){
        divideTriangl2e(a, b, c, n);
        divideTriangl2e(d, c, b, n);
        divideTriangl2e(a, d, b, n);
        divideTriangl2e(a, c, d, n);
    }

    function divideTriangl2e(a, b, c, count){
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangl2e(a, ab, ac, count - 1);
            divideTriangl2e(ab, b, bc, count - 1);
            divideTriangl2e(bc, c, ac, count - 1);
            divideTriangl2e(ab, bc, ac, count - 1);
        } else {
            triangl2e(a, b, c);
        }
    }

    function triangl2e(a, b, c){
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);

        //SECOND METHOD OF DOIND PART2

        // colors.push(point2Color(a));
        // colors.push(point2Color(b));
        // colors.push(point2Color(c));
        index += 3;
    }

    //SECOND METHOD OF DOING PART2
    
    // function point2Color(a){
    //     return vec3((a[0]*0.5) + 0.5, (a[1]*0.5) + 0.5, (a[2]*0.5) + 0.5)
    // }

    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    var index = 0;
    var pointsArray = [];
    var colors = [];
    var numTimesToSubdivide = 1;
    
    gl2.p_buffer = null;

    function main1(){

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        //SECOND METHOD OF DOING PART2

        // var c_buffer = gl2.createBuffer();
        // gl2.bindBuffer(gl2.ARRAY_BUFFER, c_buffer);
        // gl2.bufferData(gl2.ARRAY_BUFFER, flatten(colors), gl2.STATIC_DRAW);

        // var a_Color = gl2.getAttribLocation(program, "a_Color");
        // gl2.vertexAttribPointer(a_Color, 3, gl2.FLOAT, false, 0, 0);
        // gl2.enableVertexAttribArray(a_Color);

        console.log(colors);
        console.log(pointsArray);
        gl2.deleteBuffer(gl2.p_buffer);
        gl2.p_buffer = gl2.createBuffer();
        gl2.bindBuffer(gl2.ARRAY_BUFFER, gl2.p_buffer);
        gl2.bufferData(gl2.ARRAY_BUFFER, flatten(pointsArray), gl2.STATIC_DRAW);

        var a_Position = gl2.getAttribLocation(program, "a_Position");
        gl2.vertexAttribPointer(a_Position, 4, gl2.FLOAT, false, 0, 0);
        gl2.enableVertexAttribArray(a_Position);
    }


    
    
    
    main1();

    var fovy = 45.0; //angl2es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 10.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 5.0);


    var projectMatrix = gl2.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl2.uniformMatrix4fv(projectMatrix, gl2.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl2.getUniformLocation(program, "modelViewMatrix");
    modelViewMatrix = lookAt(eye, at, up);
    gl2.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    function render(){
        gl2.clear( gl2.COLOR_BUFFER_BIT | gl2.DEPTH_BUFFER_BIT);
        for(var i = 0; i < index; i+=3)
            gl2.drawArrays(gl2.TRIANGLES, i , 3);   
    }

    render();
    var facet = true;

    var increment = document.getElementById("increment2");

    var decrement = document.getElementById("decrement2");

    var face = document.getElementById("face2");


    increment.addEventListener("click", function () {
        if(numTimesToSubdivide < 5){
            numTimesToSubdivide ++;
            index = 0;
            pointsArray = [];
            colors = [];
            main1()
            render();
        }
    });

    decrement.addEventListener("click", function () {
        if(numTimesToSubdivide > 0){
            numTimesToSubdivide --;
            index = 0;
            pointsArray = [];
            colors = [];
            main1()
            render();
        }
    });

    face.addEventListener("click", function () {
        if(facet){
            gl2.frontFace(gl2.CW);
            facet = false;
        }else{
            gl2.frontFace(gl2.CCW);
            facet = true;
        }
        render();
    });

}

init();