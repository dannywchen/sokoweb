import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import styled, { keyframes } from "styled-components";

const SceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const TitleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: ${TitleAnimation} 1s ease-out forwards;
  z-index: 1;
`;

const BentoBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const BentoBox = styled.div`
  width: 300px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  color: #333;
`;

const Homepage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f0e6f6");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = false;

    const loader = new GLTFLoader();
    loader.setPath("/models/scene/");
    loader.load(
      "scene.gltf",
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the GLTF model:", error);
      }
    );

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    // Load the font and create text
    const fontLoader = new FontLoader();
    fontLoader.load(
      `${process.env.PUBLIC_URL}/fonts/font.json`,
      function (font) {
        const textGeometry = new TextGeometry("Soko journey", {
          font: font,
          size: 10,
          height: 2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 0.8,
          bevelSegments: 5,
        });

        const textMaterial = new THREE.MeshPhongMaterial({
          color: 0x123456,
          specular: 0xffffff,
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-30, 0, 0);
        scene.add(textMesh);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the font:", error);
      }
    );

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

  return (
    <>
      <SceneContainer ref={mountRef} />
      <Title>Sokolovski's Journey</Title>
      <BentoBoxContainer>
        <BentoBox>Temporary Text 1</BentoBox>
        <BentoBox>Temporary Text 2</BentoBox>
        <BentoBox>Temporary Text 3</BentoBox>
        <BentoBox>Temporary Text 4</BentoBox>
      </BentoBoxContainer>
    </>
  );
};

export default Homepage;
