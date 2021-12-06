

function init() {

    canvas = document.getElementById("gl-canvas5");
    gl5 = WebGLUtils.setupWebGL(canvas);

    if (!gl5) {
        alert("WebGL isn�t available");
    }

    gl5.viewport(0, 0, canvas.width, canvas.height);
    gl5.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl5.clear(gl5.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl5, "vertex-shader-5", "fragment-shader-5");
    gl5.useProgram(program);

    gl5.enable(gl5.DEPTH_TEST);
    gl5.enable(gl5.CULL_FACE);
    gl5.cullFace(gl5.BACK); // Changing this changes the color FRONT VS BACK

    function tetrahedron(a, b, c, d, n){
        divideTriangl5e(a, b, c, n);
        divideTriangl5e(d, c, b, n);
        divideTriangl5e(a, d, b, n);
        divideTriangl5e(a, c, d, n);
    }

    function divideTriangl5e(a, b, c, count){
        if (count > 0) {
            var ab = normalize(mix(a, b, 0.5), true);
            var ac = normalize(mix(a, c, 0.5), true);
            var bc = normalize(mix(b, c, 0.5), true);
            divideTriangl5e(a, ab, ac, count - 1);
            divideTriangl5e(ab, b, bc, count - 1);
            divideTriangl5e(bc, c, ac, count - 1);
            divideTriangl5e(ab, bc, ac, count - 1);
        } else {
            triangl5e(a, b, c);
        }
    }

    function triangl5e(a, b, c){
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

    gl5.p_buffer = null;
    gl5.n_buffer = null;

    function main1(){

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        console.log(pointsArray);
        gl5.deleteBuffer(gl5.p_buffer);
        gl5.p_buffer = gl5.createBuffer();
        gl5.bindBuffer(gl5.ARRAY_BUFFER, gl5.p_buffer);
        gl5.bufferData(gl5.ARRAY_BUFFER, flatten(pointsArray), gl5.STATIC_DRAW);

        var a_Position = gl5.getAttribLocation(program, "a_Position");
        gl5.vertexAttribPointer(a_Position, 4, gl5.FLOAT, false, 0, 0);
        gl5.enableVertexAttribArray(a_Position);

        gl5.deleteBuffer(gl5.n_buffer);

        gl5.n_buffer = gl5.createBuffer();
        gl5.bindBuffer(gl5.ARRAY_BUFFER, gl5.n_buffer);
        gl5.bufferData(gl5.ARRAY_BUFFER, flatten(normalsArray), gl5.STATIC_DRAW);

        var a_Normal = gl5.getAttribLocation(program, "a_Normal");
        gl5.vertexAttribPointer(a_Normal, 4, gl5.FLOAT, false, 0, 0);
        gl5.enableVertexAttribArray(a_Normal);
    }
    
    main1();
    var diffuseProduct = vec4(0.0, 0.8, 1.0, 1.0);

    gl5.uniform4fv(gl5.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl5.uniform4fv(gl5.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

    var fovy = 45.0; //angl5es in degrees
    var aspect = canvas.width / canvas.height;
    var near = 0.1;
    var far = 10.0;

    const up = vec3(0.0, 1.0, 0.0);
    at = vec3(0.0, 0.0, 0.0);
    eye = vec3(0.0, 0.0, 5.0);


    var projectMatrix = gl5.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl5.uniformMatrix4fv(projectMatrix, gl5.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl5.getUniformLocation(program, "modelViewMatrix");
    
    var animate = true;

    var theta = 0;

    function render(){
        if(animate)
            theta += 0.01;
        eye = vec3(5.0*Math.sin(theta), 0.0, 5.0*Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl5.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl5.clear( gl5.COLOR_BUFFER_BIT | gl5.DEPTH_BUFFER_BIT);
        for(var i = 0; i < index; i+=3)
            gl5.drawArrays(gl5.TRIANGLES, i , 3);

        window.requestAnimFrame(render);
    }

    render();

    var increment = document.getElementById("increment5");
    var decrement = document.getElementById("decrement5");
    var animation = document.getElementById("animation5");
    var Ka = document.getElementById("Ka5");
    var Kd = document.getElementById("Kd5");
    var Ks = document.getElementById("Ks5");
    var α = document.getElementById("α5");
    var Le = document.getElementById("Le5");

    var Kav = document.getElementById("Kav5");
    var Kdv = document.getElementById("Kdv5");
    var Ksv = document.getElementById("Ksv5");
    var αv = document.getElementById("αv5");
    var Lev = document.getElementById("Lev5");


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

    gl5.uniform1f(gl5.getUniformLocation(program, "Ka"), kai);
    gl5.uniform1f(gl5.getUniformLocation(program, "Kd"), kdi);
    gl5.uniform1f(gl5.getUniformLocation(program, "Ks"), ksi);
    gl5.uniform1f(gl5.getUniformLocation(program, "alpha"), alphai);
    gl5.uniform1f(gl5.getUniformLocation(program, "le"), lei);

    


    Kav.innerHTML = kai;
    Ka.addEventListener('input', function(){
        Kav.innerHTML = this.value;

        var ka = parseFloat(Kav.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "Ka"), ka);

        console.log(ka);
        
    });

    Kdv.innerHTML = kdi;
    Kd.addEventListener('input', function(){
        Kdv.innerHTML = this.value;
        var kd = parseFloat(Kdv.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "Kd"), kd);
        console.log(kd);
    });

    Ksv.innerHTML = ksi;
    Ks.addEventListener('input', function(){
        Ksv.innerHTML = this.value;
        var ks = parseFloat(Ksv.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "Ks"), ks);
        console.log(ks);
    });

    αv.innerHTML = alphai;
    α.addEventListener('input', function(){
        αv.innerHTML = this.value;
        var alpha = parseFloat(αv.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "alpha"), alpha);
        console.log(alpha);
    });

    Lev.innerHTML = lei;
    Le.addEventListener('input', function(){
        Lev.innerHTML = this.value;
        var le = parseFloat(Lev.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "le"), le);
        console.log(le);
    });

}

init();