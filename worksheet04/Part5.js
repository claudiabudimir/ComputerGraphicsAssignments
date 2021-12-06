

function init() {

    canvas = document.getElementById("gl-canvas5");
    gl5 = WebGLUtils.setupWebGL(canvas);

    //Set the viewport
    gl5.viewport(0, 0, canvas.width, canvas.height);

    //Clear
    gl5.clearColor(0.3921, 0.5843, 0.9294, 1.0);
    gl5.clear(gl5.COLOR_BUFFER_BIT);

    //Init shaders
    gl5.clear(gl.COLOR_BUFFER_BIT);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl5, "vertex-shader-5", "fragment-shader-5");
    gl5.useProgram(program);

    gl5.enable(gl5.DEPTH_TEST);
    gl5.enable(gl5.CULL_FACE);
    gl5.cullFace(gl5.BACK);

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

    var va = vec4(0.0, 0.0, 1.0, 1);
    var vb = vec4(0.0, 0.942809, -0.333333, 1);
    var vc = vec4(-0.816497, -0.471405, -0.333333, 1);
    var vd = vec4(0.816497, -0.471405, -0.333333, 1);

    //Create sphere by using the division algorithm
    var numTimesToSubdivide = 0; //initial values
    var index = 0;
    var pointsArray = [];
    var normalsArray = [];
    gl5.p_buffer = null;
    gl5.n_buffer = null;

    function createSphere() {

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

        var v_Normal = gl5.getAttribLocation(program, "v_Normal");
        gl5.vertexAttribPointer(v_Normal, 4, gl5.FLOAT, false, 0, 0);
        gl5.enableVertexAttribArray(v_Normal);
    }
    createSphere();

    //uniform variables transmission
    var lightPosition = vec4(0.0, 0.0, 1.0, 0.0);
    var diffuseProduct = vec4(1.0, 0.8, 0.0, 1.0);
    gl5.uniform4fv(gl5.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct));
    gl5.uniform4fv(gl5.getUniformLocation(program, "lightPosition"), flatten(lightPosition));

    //projectMatrix & modelViewMatrixLoc
    var fovy = 45.0;
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 15.0;
    const up = vec3(0.0, 1.0, 0.0);
    var at = vec3(0.0, 0.0, 0.0);
    var eye = vec3(0.0, 0.0, 4.9);//is in one-point (front) perspective

    var projectMatrix = gl5.getUniformLocation(program, 'projectMatrix');
    var pj = perspective(fovy, aspect, near, far);
    gl5.uniformMatrix4fv(projectMatrix, gl5.FALSE, flatten(pj));

    var modelViewMatrixLoc = gl5.getUniformLocation(program, "modelViewMatrix");

    var rotateAroundOrbit = true;
    var theta = 0;

    function render() {
        if (rotateAroundOrbit)
            theta += 0.01;
        eye = vec3(5.0 * Math.sin(theta), 0.0, 5.0 * Math.cos(theta));
        modelViewMatrix = lookAt(eye, at, up);
        gl5.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl5.clear(gl5.COLOR_BUFFER_BIT | gl5.DEPTH_BUFFER_BIT);
        for (var i = 0; i < index; i += 3)
            gl5.drawArrays(gl5.TRIANGLES, i, 3);

        window.requestAnimFrame(render);
    }
    render();

    var increment = document.getElementById("incr_button5");
    var decrement = document.getElementById("decr_button5");
    var orbit = document.getElementById("orbit_button3");

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

    var ka_initial = 0.3;
    var kd_initial = 0.6;
    var ks_initial = 0.9;
    var alpha_initial = 96;
    var le_initial = 1.20;

    gl5.uniform1f(gl5.getUniformLocation(program, "Ka"), ka_initial);
    gl5.uniform1f(gl5.getUniformLocation(program, "Kd"), kd_initial);
    gl5.uniform1f(gl5.getUniformLocation(program, "Ks"), ks_initial);
    gl5.uniform1f(gl5.getUniformLocation(program, "alpha"), alpha_initial);
    gl5.uniform1f(gl5.getUniformLocation(program, "le"), le_initial);

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

    Kav.innerHTML = ka_initial;
    Ka.addEventListener('input', function () {
        Kav.innerHTML = this.value;
        var ka = parseFloat(Kav.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "Ka"), ka);
    });

    Kdv.innerHTML = kd_initial;
    Kd.addEventListener('input', function () {
        Kdv.innerHTML = this.value;
        var kd = parseFloat(Kdv.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "Kd"), kd);
    });

    Ksv.innerHTML = ks_initial;
    Ks.addEventListener('input', function () {
        Ksv.innerHTML = this.value;
        var ks = parseFloat(Ksv.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "Ks"), ks);
    });

    αv.innerHTML = alpha_initial;
    α.addEventListener('input', function () {
        αv.innerHTML = this.value;
        var alpha = parseFloat(αv.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "alpha"), alpha);
    });

    Lev.innerHTML = le_initial;
    Le.addEventListener('input', function () {
        Lev.innerHTML = this.value;
        var le = parseFloat(Lev.innerHTML);
        gl5.uniform1f(gl5.getUniformLocation(program, "le"), le);
    });
}
init();