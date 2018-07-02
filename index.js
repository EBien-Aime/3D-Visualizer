
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
      camera.position.set(10000,0,20000);

				var controls = new THREE.OrbitControls( camera, renderer.domElement );

        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.target.set(0, 0, 0);
        controls.rotateSpeed = 0.3;
        controls.zoomSpeed = 1.0;
        controls.panSpeed = 2.0;

        controls.update();

    //scene
      var scene = new THREE.Scene();
      // scene.fog = new THREE.FogExp2( 0xCCCFFF, 0.007 );

    //object arrays
      var cubes = [];
      var octahedrons = [];


      //render plane
      var planeGeometry = new THREE.PlaneGeometry (800,800, 20, 20);
      var planeMaterial = new THREE.MeshBasicMaterial( {
        color: 0x000000, wireframe: true
      });
      var plane = new THREE.Mesh(planeGeometry, planeMaterial)
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
        octMesh.position.x = Math.random() * 15000 - 800;
        octMesh.position.y = Math.random() * 15000 - 800;
        octMesh.position.z = Math.random() * 15000 - 800;
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



      //   controls
      //   document.addEventListener('keydown', onKeyDown, false);
      //
      //   function onKeyDown(){
      //   var speed = 100
      //   //up
      //   if(event.keyCode == 87){
      //     camera.position.x -= Math.sin(camera.rotation.y) * 50;
      //     camera.position.z -= Math.cos(camera.rotation.y) * 50;
      //   }
      //   //down
      //   else if (event.keyCode == 83) {
      //     camera.position.x += Math.sin(camera.rotation.y) * 50;
      //     camera.position.z += Math.cos(camera.rotation.y) * 50;
      //   }
      //   else if (event.keyCode == 65) {
      //     camera.rotation.y += 0.1
      //   }
      //   else if (event.keyCode == 68) {
      //     camera.rotation.y -= 0.1
      //   }
      // };


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
          cube.rotation.x += 0.03;
          cube.rotation.y += 0.03;
          cube.scale.x = dataArray[50] * Math.PI/180;
          cube.scale.y = dataArray[50] * Math.PI/180;
          cube.scale.z = dataArray[50] * Math.PI/180;
        }


        for (var i = 0; i < octahedrons.length; i++) {
          var octMesh = octahedrons[i];
          octMesh.rotation.x += 0.03;
          octMesh.rotation.y += 0.03;
        }


        // controls.update();
        requestAnimationFrame(render);




        renderer.render(scene, camera);

      }

};
