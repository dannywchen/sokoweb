import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap"; // Import GSAP library

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
  const textRef = useRef(null);

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
    renderer.setClearColor("#f0e6f6"); // Set to a pastel color background
    mountRef.current.appendChild(renderer.domElement);

    // Load the cloud texture
    const cloudTextureLoader = new THREE.TextureLoader();
    const cloudTexture = cloudTextureLoader.load(
      "/models/scene/textures/nuven_baseColor.png"
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.enablePan = false;

    const loader = new GLTFLoader();
    loader.setPath("/models/scene/");
    loader.load(
      "scene.gltf",
      (gltf) => {
        gltf.scene.traverse((object) => {
          if (object.isMesh) object.material.map = cloudTexture;
        });
        scene.add(gltf.scene);

        // Add text to the 3D model
        const fontLoader = new FontLoader();
        fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
          const textGeometry = new TextGeometry("Soko's Magical Journey", {
            font: font,
            size: 0.5,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });

          const textMaterial = new THREE.MeshPhongMaterial({
            color: 0xffb6c1, // Pastel color
            flatShading: true,
          });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.set(0, 2, 0);
          textRef.current = textMesh;
          scene.add(textMesh);
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

    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const scrollThreshold = 100; // Adjust this value to change when the animation starts

      if (scrollPosition > scrollThreshold && textRef.current) {
        gsap.to(textRef.current.position, {
          y: -2,
          duration: 1,
          ease: "power2.out",
        });
      } else if (scrollPosition <= scrollThreshold && textRef.current) {
        gsap.to(textRef.current.position, {
          y: 2,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("scroll", handleScroll);
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
