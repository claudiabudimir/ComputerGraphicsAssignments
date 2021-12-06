

function init() {

    canvas = document.getElementById("gl-canvas4");
    gl4 = WebGLUtils.setupWebGL(canvas);

    if (!gl4) {
        alert("WebGL isn�t available");
    }

    gl4.viewport(0, 0, canvas.width, canvas.height);
    gl4.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl4.clear(gl4.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl4, "vertex-shader-4", "fragment-shader-4");
    gl4.useProgram(program);

    gl4.enable(gl4.DEPTH_TEST);
    gl4.enable(gl4.CULL_FACE);
    gl4.cullFace(gl4.BACK); // Changing this changes the color FRONT VS BACK

    function tetrahedron(a, b, c, d, n){
        divideTriangl4e(a, b, c, n);
        divideTriangl4e(d, c, b, n);
        divideTriangl4e(a, d, b, n);
        divideTriangl4e(a, c, d, n);
    }

    function divideTriangl4e(a, b, c, count){
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangl4e(a, ab, ac, count - 1);
            divideTriangl4e(ab, b, bc, count - 1);
            divideTriangl4e(bc, c, ac, count - 1);
            divideTriangl4e(ab, bc, ac, count - 1);
        } else {
            triangl4e(a, b, c);
        }
    }

    function triangl4e(a, b, c){
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);

        normalsArray.push(vec4(a[0], a[1], a[2], 0.0));
        normalsArray.push(vec4(b[0], b[1], b[2], 0.0));
        normalsArray.push(vec4(c[0], c[1], c[2], 0.0));

        index += 3;
    }

    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    var index = 0;
    var pointsArray = [];
    var normalsArray = [];
    var numTimesToSubdivide = 4;
   
    var lightPosition = vec4(0.0, 0.0, 1.0, 0.0); //if last  value is zero, becomes a directional source in the direction (0, 0, -1)

    gl4.p_buffer = null;
    gl4.n_buffer = null;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);

    var theta = 0;

    function main1(){

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        console.log(pointsArray);
        gl4.deleteBuffer(gl4.p_buffer);
        gl4.p_buffer = gl4.createBuffer();
        gl4.bindBuffer(gl4.ARRAY_BUFFER, gl4.p_buffer);
        gl4.bufferData(gl4.ARRAY_BUFFER, flatten(pointsArray), gl4.STATIC_DRAW);

        var a_Position = gl4.getAttribLocation(program, "a_Position");
        gl4.vertexAttribPointer(a_Position, 4, gl4.FLOAT, false, 0, 0);
        gl4.enableVertexAttribArray(a_Position);

        gl4.deleteBuffer(gl4.n_buffer);

        gl4.n_buffer = gl4.createBuffer();
        gl4.bindBuffer(gl4.ARRAY_BUFFER, gl4.n_buffer);
        gl4.bufferData(gl4.ARRAY_BUFFER, flatten(normalsArray), gl4.STATIC_DRAW);

        var a_Normal = gl4.getAttribLocation(program, "a_Normal");
        gl4.vertexAttribPointer(a_Normal, 4, gl4.FLOAT, false, 0, 0);
        gl4.enableVertexAttribArray(a_Normal);

        //Possible solution nr2, use with normalmatrix in html

        // eye = vec3(5.0*Math.sin(theta), 0.0, 5.0*Math.cos(theta));
        // modelViewMatrix = lookAt(eye, at, up);
        // var N = normalMatrix(modelViewMatrix, true);
        // gl4.uniformMatrix3fv(gl4.getUniformLocation(program, "normalMatrix"), false, flatten(N));
    }
    
    main1();
    var diffuseProduct = vec4(0.0, 0.8, 1.0, 1.0);

    gl4.uniform4fv(gl4.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl4.uniform4fv(gl4.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

    var fovy = 45.0; //angl4es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 10.0;


    eye = vec3(0.0, 0.0, 5.0);

    normalMatrixLoc = gl4.getUniformLocation( program, "normalMatrix" );

    var projectMatrix = gl4.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl4.uniformMatrix4fv(projectMatrix, gl4.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl4.getUniformLocation(program, "modelViewMatrix");
    
    var animate = true; 

    function render(){
        if(animate)
            theta += 0.01;
        eye = vec3(5.0*Math.sin(theta), 0.0, 5.0*Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        
        
        gl4.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

        gl4.clear( gl4.COLOR_BUFFER_BIT | gl4.DEPTH_BUFFER_BIT);
        for(var i = 0; i < index; i+=3)
            gl4.drawArrays(gl4.TRIANGLES, i , 3);

        window.requestAnimFrame(render);
    }

    render();

    var increment = document.getElementById("increment4");
    var decrement = document.getElementById("decrement4");
    var animation = document.getElementById("animation4");
    var Ka = document.getElementById("Ka4");
    var Kd = document.getElementById("Kd4");
    var Ks = document.getElementById("Ks4");
    var α = document.getElementById("α4");
    var Le = document.getElementById("Le4");

    var Kav = document.getElementById("Kav4");
    var Kdv = document.getElementById("Kdv4");
    var Ksv = document.getElementById("Ksv4");
    var αv = document.getElementById("αv4");
    var Lev = document.getElementById("Lev4");


    increment.addEventListener("click", function () {
        if(numTimesToSubdivide < 5){
            numTimesToSubdivide ++;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    decrement.addEventListener("click", function () {
        if(numTimesToSubdivide > 0){
            numTimesToSubdivide --;
            index = 0;
            pointsArray = [];
            normalsArray = [];
            main1()
        }
    });

    animation.addEventListener("click", function () {
        if(animate)
            animate = false;
        else animate = true;
    });

    var kai = 0.1;
    var kdi = 0.6;
    var ksi = 1.0;
    var alphai = 100;
    var lei = 1.35;

    gl4.uniform1f(gl4.getUniformLocation(program, "Ka"), kai);
    gl4.uniform1f(gl4.getUniformLocation(program, "Kd"), kdi);
    gl4.uniform1f(gl4.getUniformLocation(program, "Ks"), ksi);
    gl4.uniform1f(gl4.getUniformLocation(program, "alpha"), alphai);
    gl4.uniform1f(gl4.getUniformLocation(program, "le"), lei);


    Kav.innerHTML = kai;
    Ka.addEventListener('input', function(){
        Kav.innerHTML = this.value;

        var ka = parseFloat(Kav.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "Ka"), ka);

        console.log(ka);
        
    });

    Kdv.innerHTML = kdi;
    Kd.addEventListener('input', function(){
        Kdv.innerHTML = this.value;
        var kd = parseFloat(Kdv.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "Kd"), kd);
        console.log(kd);
    });

    Ksv.innerHTML = ksi;
    Ks.addEventListener('input', function(){
        Ksv.innerHTML = this.value;
        var ks = parseFloat(Ksv.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "Ks"), ks);
        console.log(ks);
    });

    αv.innerHTML = alphai;
    α.addEventListener('input', function(){
        αv.innerHTML = this.value;
        var alpha = parseFloat(αv.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "alpha"), alpha);
        console.log(alpha);
    });

    Lev.innerHTML = lei;
    Le.addEventListener('input', function(){
        Lev.innerHTML = this.value;
        var le = parseFloat(Lev.innerHTML);
        gl4.uniform1f(gl4.getUniformLocation(program, "le"), le);
        console.log(le);
    });

}

init();