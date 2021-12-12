function init() {

    canvas = document.getElementById("gl-canvas4");
    gl = WebGLUtils.setupWebGL(canvas);

    //Set the viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Init shaders
    gl.clear(gl.COLOR_BUFFER_BIT);


    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader-4", "fragment-shader-4");
    gl.useProgram(program);

    //Enable a depth test
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);//Enable back face culling, The initial value of glCullFace is GL_BACK.
    gl.cullFace(gl.BACK);

    //Approximation of a sphere by recursive subdivision algorithm
    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    function tetrahedron(a, b, c, d, n) {
        divideTriangle(a, b, c, n);
        divideTriangle(d, c, b, n);
        divideTriangle(a, d, b, n);
        divideTriangle(a, c, d, n);
    }

    function divideTriangle(a, b, c, count) {
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

    function triangle(a, b, c) {
        pointsArray.push(a);
        pointsArray.push(b);
        pointsArray.push(c);

        normalsArray.push(vec4(a[0], a[1], a[2], 0.0));
        normalsArray.push(vec4(b[0], b[1], b[2], 0.0));
        normalsArray.push(vec4(c[0], c[1], c[2], 0.0));

        index += 3;
    }

    //Create sphere by using the division algorithm
    var numTimesToSubdivide = 0; //initial values
    var index = 0;
    var pointsArray = [];
    var normalsArray = [];
    gl.p_buffer = null;
    gl.n_buffer = null;

    function createSphere() {

        tetrahedron(va, vb, vc, vd, numTimesToSubdivide);

        gl.deleteBuffer(gl.p_buffer);
        gl.p_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.p_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(program, "a_Position");
        gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        gl.deleteBuffer(gl.n_buffer);

        gl.n_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.n_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

        var v_Normal = gl.getAttribLocation(program, "v_Normal");
        gl.vertexAttribPointer(v_Normal, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(v_Normal);
    }
    createSphere();

    //uniform variables transmission
    var lightPosition = vec4(0.0, 0.0, 1.0, 0.0);
    var diffuseProduct = vec4(1.0, 0.8, 0.0, 1.0);
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

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
    //var modelViewMatrix = lookAt(eye, at, up);
    //gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    //orbit rotation variables
    var rotateAroundOrbit = true;
    var theta = 0;

    function render() {
        if (rotateAroundOrbit)
            theta += 0.01;

        eye = vec3(5.0 * Math.sin(theta), 0.0, 5.0 * Math.cos(theta));
        var modelViewMatrix = lookAt(eye, at, up);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        for (var cnt = 0; cnt < index; cnt += 3)
            gl.drawArrays(gl.TRIANGLES, cnt, 3);
        window.requestAnimFrame(render);
    }
    render();//initial render call
    
    //Events
    var increment = document.getElementById("incr_button4");
    var decrement = document.getElementById("decr_button4");
    var orbit = document.getElementById("orbit_button2");

    increment.addEventListener("click", function () {
        if (numTimesToSubdivide < 5) {
            index = 0;//reset index
            pointsArray = [];//reset points array 
            normalsArray = [];//reset normals vector
            numTimesToSubdivide++;
            createSphere()//sphere recreation
            //render();//sphere redraw
        }
    });

    decrement.addEventListener("click", function () {
        if (numTimesToSubdivide > 0) {
            index = 0;//reset index
            pointsArray = [];//reset points array 
            normalsArray = [];//reset normals vector
            numTimesToSubdivide--;
            createSphere()//sphere recreation
            //render();//sphere redraw
        }
    });

    orbit.addEventListener("click", function () {
        if (rotateAroundOrbit)
            rotateAroundOrbit = false;//stop rotation around orbit
        else
            rotateAroundOrbit = true;//start rotation around orbit
    });
    
    var ka_initial = 0.22;
    var kd_initial = 0.85;
    var ks_initial = 0.36;
    var alpha_initial = 41;
    var le_initial = 0.88;

    gl.uniform1f(gl.getUniformLocation(program, "Ka"), ka_initial);
    gl.uniform1f(gl.getUniformLocation(program, "Kd"), kd_initial);
    gl.uniform1f(gl.getUniformLocation(program, "Ks"), ks_initial);
    gl.uniform1f(gl.getUniformLocation(program, "alpha"), alpha_initial);
    gl.uniform1f(gl.getUniformLocation(program, "le"), le_initial);

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

    Kav.innerHTML = ka_initial;
    Ka.addEventListener('input', function () {
        Kav.innerHTML = this.value;
        var ka = parseFloat(Kav.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "Ka"), ka);
    });

    Kdv.innerHTML = kd_initial;
    Kd.addEventListener('input', function () {
        Kdv.innerHTML = this.value;
        var kd = parseFloat(Kdv.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "Kd"), kd);
    });

    Ksv.innerHTML = ks_initial;
    Ks.addEventListener('input', function () {
        Ksv.innerHTML = this.value;
        var ks = parseFloat(Ksv.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "Ks"), ks);
    });

    αv.innerHTML = alpha_initial;
    α.addEventListener('input', function () {
        αv.innerHTML = this.value;
        var alpha = parseFloat(αv.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "alpha"), alpha);
    });

    Lev.innerHTML = le_initial;
    Le.addEventListener('input', function () {
        Lev.innerHTML = this.value;
        var le = parseFloat(Lev.innerHTML);
        gl.uniform1f(gl.getUniformLocation(program, "le"), le);
    });
}

init();