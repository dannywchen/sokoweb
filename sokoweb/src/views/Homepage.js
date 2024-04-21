// Homepage.js
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LifeStory from "./LifeStory";
import { useNavigate } from "react-router-dom";

const SceneContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/images/background2.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/background1.png");
  background-size: cover;
  background-position: center;
  clip-path: circle(150px at center);
  filter: blur(2px);
  transition: transform 0.3s ease-out;
`;

const titleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

const TitleLeft = styled.h1`
  font-size: 4rem;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: ${titleAnimation} 1s ease-out forwards;
  position: absolute;
  left: 20%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const TitleRight = styled.h1`
  font-size: 4rem;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: ${titleAnimation} 1s ease-out forwards;
  position: absolute;
  right: 20%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  position: absolute;
  bottom: 20%;
  z-index: 1;
  opacity: 0;
  animation: ${titleAnimation} 1s ease-out forwards;
`;

const Button = styled.button`
  font-size: 1.5rem;
  font-family: "Montserrat", sans-serif;
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CircleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
  border: 2px solid #fff;
  opacity: 0;
  animation: ${titleAnimation} 1s ease-out forwards;
`;

const CircleMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  clip-path: circle(150px at center);
  filter: blur(2px);
`;

const Curtain = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #b0e0e6;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Homepage = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showLifeStory, setShowLifeStory] = useState(false);
  const circleRef = useRef(null);
  const threeRef = useRef(null);
  const backgroundRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const curtain = document.querySelector(Curtain);
    gsap.to(curtain, {
      x: "100%",
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => setIsAnimationComplete(true),
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);

    if (threeRef.current) {
      threeRef.current.appendChild(renderer.domElement);
    }

    const loader = new GLTFLoader();
    loader.load(
      "/models/scene/scene.gltf",
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundPositionX = `${x * 50}px`;
        backgroundRef.current.style.backgroundPositionY = `${y * 50}px`;
        backgroundRef.current.style.transform = `scale(1.1) translate(${
          x * 20
        }px, ${y * 20}px)`;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const handleExploreClick = () => {
    const circleContainer = document.querySelector(CircleContainer);
    gsap.to(circleContainer, {
      scale: 20,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        setShowLifeStory(true);
        navigate("/lifestory");
      },
    });
  };

  return (
    <>
      <SceneContainer>
        <BackgroundImage ref={backgroundRef} />
        {!isAnimationComplete && <Curtain />}
        {isAnimationComplete && (
          <>
            <TitleLeft>SOKO</TitleLeft>
            <TitleRight>JOURNEY</TitleRight>
            <ButtonContainer>
              <Button>BOOKS</Button>
              <Button onClick={handleExploreClick}>EXPLORE</Button>
            </ButtonContainer>
            <CircleContainer ref={circleRef}>
              <CircleMask />
              <div ref={threeRef} />
            </CircleContainer>
          </>
        )}
      </SceneContainer>
    </>
  );
};

export default Homepage;
