
  audio_file.onchange = function(){
    var files = this.files;
    var file = URL.createObjectURL(files[0]);
    audio_player.src = file;


    //captures audio context
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio_player);
    var analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    console.log(bufferLength);
    audio_player.play();

    //renderer
      var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
      renderer.setClearColor(0xffffff);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);


window.addEventListener('resize', onWindowResize, false);

      function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    }

      //creates camera
      var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
      // camera.lookAt
      camera.position.set(10000,0,20000);


				// var controls = new THREE.OrbitControls( camera, renderer.domElement );
        //
        // controls.enableDamping = true;
        // controls.enableZoom = true;
        // controls.target.set(0, 0, 0);
        // controls.rotateSpeed = 0.3;
        // controls.zoomSpeed = 1.0;
        // controls.panSpeed = 2.0;

        // controls.update();


      var canvas = document.getElementsByTagName("canvas")[0],
    mouseSensitivity = 500,
    changeCallback = function(e){
      if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas) {
        // Pointer was just locked
        // Enable the mousemove listener
        document.addEventListener("mousemove", moveCallback, false);
      } else {
        // Pointer was just unlocked
        // Disable the mousemove listener
        document.removeEventListener("mousemove", moveCallback, false);
      }
    },
    moveCallback = function(e){

      var movementX = e.movementX ||
                      e.mozMovementX ||
                      e.webkitMovementX ||
                      0,

          movementY = e.movementY ||
                      e.mozMovementY ||
                      e.webkitMovementY ||
                      0;

                      player = {
                      body : new THREE.Object3D()
                    }
      player.body.rotation.y -= movementX/mouseSensitivity;
      camera.rotation.x -= movementY/mouseSensitivity;
      camera.rotation.y -= movementX/mouseSensitivity;
    };

canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock ||
                            canvas.webkitRequestPointerLock;


canvas.onclick=function(){

  // Ask the browser to lock the pointer)
  canvas.requestPointerLock();
};


// Hook pointer lock state change events
document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

// Ask the browser to release the pointer
document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock ||
                           document.webkitExitPointerLock;

document.exitPointerLock();



        var gui = new dat.GUI;

        var params = {
          octahedrons: 0xCCCFFF,
          background: 0xffffff,
          floor: 0x000000,
          cubeMaterial: "",
          cubeColor: 0xCCCFFF,
          wireframe: false
        };

        var changeBackground = gui.addColor(params, 'background').name('Skybox');
        var changeOctColor = gui.addColor(params, 'octahedrons').name('Octahedrons');
        var changeFloor = gui.addColor(params, 'floor').name('Floor');

        // var cubeFolder = gui.addFolder('Cubes');
        // var changeMaterial = cubeFolder.add(params, 'cubeMaterial', ['Normal','Basic','Lambert']).name('Cube Material');
        // var changeColor = cubeFolder.addColor(params, 'cubeColor').name('Cube Color');
        //
        // changeMaterial.onChange(function() {
        //   cube.material.set( params.cubeMaterial );
        // });
        // changeColor.onChange(function() {
        //   cube.material.color.set( params.cubeColor );
        // });
        changeBackground.onChange(function() {
          skybox.material.color.set( params.background );
        });
        changeFloor.onChange(function() {
          plane.material.color.set( params.floor );
        });

        gui.close();

        var moveForward = false;
        var moveBackward = false;
        var moveLeft = false;
        var moveRight = false;
        var moveUp = false;
        var moveDown = false;

//define velocity as a vector3
    var velocity = new THREE.Vector3();
    var prevTime = performance.now();

//moveforward is true when 'up' or 'w' is pressed
var onKeyDown = function ( event ) {
      switch ( event.keyCode ) {
        case 87: // w
        moveForward = true;
        break;
        case 83: //s
        moveBackward = true;
        break;
        case 65: //a
        moveLeft = true;
        break;
        case 68: //d
        moveRight = true;
        break;
        case 81: //q
        moveDown = true;
        break;
        case 69: //e
        moveUp = true;
        break;
     }
 }

//moveforward is false when 'up' or 'w' is not pressed
  var onKeyUp = function ( event ) {
    switch( event.keyCode ) {
    case 87: // w
      moveForward = false;
      break;
      case 83: //s
      moveBackward = false;
      break;
      case 65: //a
      moveLeft = false;
      break;
      case 68: //d
      moveRight = false;
      break;
      case 81: //q
      moveDown = false;
      break;
      case 69: //e
      moveUp = false;
      break;
      }
  }


  //make sure our document knows what functions to call when a key is pressed.
  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );




    //scene
      var scene = new THREE.Scene();

    //object arrays
      var cubes = [];
      var octahedrons = [];

      //skybox
      var skyGeometry = new THREE.BoxGeometry(10000, 10000, 10000)
      var skyMaterial = new THREE.MeshBasicMaterial( {
        color: 0xffffff, side: THREE.DoubleSide
      });
      var skybox = new THREE.Mesh(skyGeometry,skyMaterial);
      skybox.position.set(10000,3000,10000);
      skybox.scale.set(10,10,10);
      scene.add(skybox);


      //render plane
      var planeGeometry = new THREE.PlaneGeometry (800,800, 20, 20);
      var planeMaterial = new THREE.MeshBasicMaterial( {
        color: 0x000000, wireframe: true
      });
      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(10000,-500,10000);
      plane.scale.set(50,50,50);
      plane.rotation.x = -0.5 * Math.PI;
      scene.add(plane);

      //octahedrons get put in a for loop
      for (var i = 0; i < 600; i++) {
        var octMaterial = new THREE.MeshBasicMaterial( {
          color: 0xCCCFFF, wireframe: true
        });
        var octGeometry = new THREE.OctahedronGeometry(100, 0);
        var octMesh = new THREE.Mesh(octGeometry, octMaterial);
        //random placement
        octMesh.position.x = Math.random() * 25000 - 800;
        octMesh.position.y = Math.random() * 25000 - 800;
        octMesh.position.z = Math.random() * 25000 - 800;
        scene.add(octMesh);
        octahedrons.push(octMesh);
      }

      //cubes get put in a for loop
      for (var i = 0; i < 500; i++) {
        var cubeGeometry = new THREE.BoxGeometry(200, 200, 200);
        var cubeMaterial = new THREE.MeshNormalMaterial
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // cube.position.set(0, 0, -2000);
        cube.position.x = Math.random() * 25000 - 800;
        cube.position.y = Math.random() * 25000 - 800;
        cube.position.z = Math.random() * 25000 - 800;
        scene.add(cube);
        cubes.push(cube);

};

    //lights
      var light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);

      var light1 = new THREE.PointLight(0xffffff, 0.5);
        scene.add(light1);

    //RENDER LOOP
    requestAnimationFrame(render);

    function render() {
      // console.log(dataArray);

        analyser.getByteFrequencyData(dataArray);

        for (var i = 0; i < cubes.length; i++) {
          var cube = cubes[i];
          cube.rotation.x += 0.02;
          cube.rotation.y += 0.02;
          cube.scale.x = dataArray[50] * Math.PI/180;
          cube.scale.y = dataArray[50] * Math.PI/180;
          cube.scale.z = dataArray[50] * Math.PI/180;
        }


        for (var i = 0; i < octahedrons.length; i++) {
          var octMesh = octahedrons[i];
          octMesh.rotation.x += 0.02;
          octMesh.rotation.y += 0.02;
        }

        changeOctColor.onChange(function() {
        for (var i = 0; i < octahedrons.length; i++) {
          var octMesh = octahedrons[i];
          octMesh.material.color.set( params.octahedrons );
          }
        });

        // controls.update();
        requestAnimationFrame(render);

        renderer.render(scene, camera);
        var time = performance.now();
            var delta = ( time - prevTime ) / 1000;

      			//reset z velocity to be 0 always. But override it if user presses up or w. See next line...
      					velocity.z -= velocity.z * 10.0 * delta;
      					velocity.x -= velocity.x * 10.0 * delta;
      					velocity.y -= velocity.y * 10.0 * delta;

            //if the user pressed 'up' or 'w', set velocity.z to a value > 0.
            if ( moveForward ) velocity.z -= 20000.0 * delta;
            if ( moveBackward ) velocity.z += 20000.0 * delta;
            if ( moveLeft ) velocity.x -= 20000.0 * delta;
            if ( moveRight ) velocity.x += 20000.0 * delta;
            if ( moveUp ) velocity.y += 20000.0 * delta;
            if ( moveDown ) velocity.y -= 20000.0 * delta;

            //pass velocity as an argument to translateZ and call it on camera.
            camera.translateZ( velocity.z * delta );
            camera.translateX( velocity.x * delta );
            camera.translateY( velocity.y * delta );

            	prevTime = time;



      }

};
