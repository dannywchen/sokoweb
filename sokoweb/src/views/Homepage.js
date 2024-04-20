import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styled from "styled-components";

const SceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Homepage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#e5e5e5");
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = false; // Right click does nothing

    const loader = new GLTFLoader();
    loader.setPath("/models/scene/"); // Setting the path for the base folder
    loader.load(
      "scene.gltf", // Assumes 'scene.gltf' is in the '/public/models/scene/' directory
      (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.map = new THREE.TextureLoader().load(
              "/models/scene/textures/nuven.baseColor.png"
            );
          }
        });
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the GLTF model:", error);
      }
    );

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <SceneContainer ref={mountRef}></SceneContainer>;
};

export default Homepage;
