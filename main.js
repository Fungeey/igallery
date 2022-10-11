import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

import {scrapeig} from "./igscraper.js"

scrapeig();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.001, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const material = new THREE.MeshToonMaterial({color:0xffffff});

{
  const geometry = new THREE.PlaneGeometry(100, 100);
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-1/2*3.1415926);
  scene.add(plane);
}

// {
//   const fontLoader = new FontLoader();
//   const ttfLoader = new TTFLoader();
//   ttfLoader.load( 'Merriweather/Merriweather-Regular.ttf', function ( json ) {
//     const font = fontLoader.parse(json);
//     var textGeometry = new TextGeometry( "text", {
//       font: font,
//       size: 10,
//       height: 2,
//     });

//     var textMaterial = new THREE.MeshPhongMaterial( 
//       { color: 0xff0000, specular: 0xffffff }
//     );

//     var mesh = new THREE.Mesh( textGeometry, textMaterial );

//     scene.add( mesh );
//   });
// }

const pointLight = new THREE.PointLight(0xaae0a4);
pointLight.position.set(20, 20, 20);

const loader = new GLTFLoader();
loader.load('pothos.glb', function(gltf){
  scene.add(gltf.scene);
}, undefined, function(error){
  console.error(error);
});

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();