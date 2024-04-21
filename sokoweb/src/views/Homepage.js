import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";

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

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  color: #333;
  line-height: 1.6;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ff9999;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }

  li {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  blockquote {
    font-size: 1.5rem;
    font-style: italic;
    color: #777;
    margin: 2rem 0;
    padding: 1rem;
    border-left: 5px solid #ff9999;
    background-color: #fff;
  }
`;

const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  opacity: 0;
  animation: ${FadeInAnimation} 1s ease-out forwards;
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

const Star = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  animation: twinkle 1.5s infinite;

  @keyframes twinkle {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const MiniStar = styled(Star)`
  width: 2px;
  height: 2px;
`;

const BigStar = styled(Star)`
  width: 4px;
  height: 4px;
`;

const Homepage = () => {
  const mountRef = useRef(null);
  const textRef = useRef(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

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
            depth: 0.1,
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

    // Curtain animation
    const curtain = document.querySelector(Curtain);
    gsap.to(curtain, {
      x: "100%",
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => setIsAnimationComplete(true),
    });

    // Generate random stars
    const numMiniStars = 100;
    const numBigStars = 20;

    for (let i = 0; i < numMiniStars; i++) {
      const star = document.createElement("div");
      star.classList.add(MiniStar);
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      curtain.appendChild(star);
    }

    for (let i = 0; i < numBigStars; i++) {
      const star = document.createElement("div");
      star.classList.add(BigStar);
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      curtain.appendChild(star);
    }

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <SceneContainer ref={mountRef} />
      {!isAnimationComplete && <Curtain />}
      {isAnimationComplete && (
        <>
          <Title>Sokolovski's Journey</Title>
          <Content>
            <Section>
              <h2>Inspiration to Become a Russian Teacher</h2>
              <p>
                I graduated from the Russian Federation Ural State Pedagogical
                University philology department as a teacher of language and
                literature. My teachers at Specialized French Gymnasium # 39
                inspired me to choose the profession of an educator. I admired
                their pedagogical skills, vast knowledge, and caring and loving
                attitude toward the students. They raised us in a nurturing
                environment to become kind, honest, independent, and hardworking
                people, who would succeed in the future. I decided to become a
                teacher who would influence children's development following my
                teachers' footsteps.
              </p>
            </Section>
            <Section>
              <h2>Rewards of Teaching Russian</h2>
              <p>
                The most rewarding aspect of teaching Russian is the moments
                when my students write thank you letters to me, expressing how
                much they've learned about Russia in their foreign language
                journey, how their knowledge broadened their worldview, and
                changed their perspective on different world cultures. I love
                when the students come back from college and share stories about
                how my teaching helped them continue with Russian, or how they
                met Russian-speaking people and were able to communicate with
                them.
              </p>
            </Section>
            <Section>
              <h2>Favorite Aspect of Russian Culture</h2>
              <p>
                I enjoy teaching any topic related to Russian culture, such as
                family life, education, holidays, traditions, famous Russian
                people, landmarks, literature, music, ballet, and theater. But
                most of all, I love to teach art and incorporate paintings into
                many of my units. Art has always been an integral part of
                Russian culture, shaping the identity of the country and its
                people.
              </p>
            </Section>
            <Section>
              <h2>Favorite Artwork and Paintings</h2>
              <p>
                My favorite art school is Impressionism, and my favorite artists
                include Amadeo Modigliani, Renoir, Clod Monet, and Edgar Degas.
                Modigliani's portraits inspire and captivate with their
                unexplainable charm, as if all his models want to come alive and
                tell their stories. From Russian art, I love Karl Brulov, Ivan
                Ayvasovskiy, and Boris Kustodiev. It is hard to pick one
                favorite painting since there are so many artistic schools, but
                I enjoy Russian realism of the 19th-20th century in Tretyakov's
                Gallery of Russian Art.
              </p>
            </Section>
            <Section>
              <h2>Memorable Experiences as a Russian Teacher</h2>
              <p>
                I have many remarkable moments to remember, such as students
                surprising me with flowers for my birthday and Women's Day;
                greetings and thank you cards from the kids and their parents;
                our holidays and end-of-year parties at "Elena's café"; and Tech
                proms where kids come to say thank you and take pictures for
                memories. Most of all, I enjoyed being a chaperone for the
                cultural and educational exchange program with Russia. Nothing
                is better than traveling and seeing the culture for yourself,
                meeting people, and making new friends in Moscow and
                Saint-Petersburg.
              </p>
            </Section>
            <Section>
              <h2>Achievements and Milestones</h2>
              <ul>
                <li>
                  Completing two master's degrees in the educational field.
                </li>
                <li>
                  Supervising the Art Club and Maker Space project (Painting of
                  Murals) in affiliation with Sundog Theatre Inc. and resident
                  artist Samuel Vega, leading to many creative projects over 8
                  years.
                </li>
              </ul>
            </Section>
            <Section>
              <h2>Favorite Quotes and Sayings</h2>
              <blockquote>
                "Optimism is a happiness magnet. If you stay positive, good
                things and good people will be drawn to you." — Mary Lou Retton
              </blockquote>
            </Section>
            <Section>
              <h2>Sokolovski's Special Inspirational Message</h2>
              <p>
                «LIVE AND LEARN» - «ВЕК ЖИВИ, ВЕК УЧИСЬ». (Never lose desire for
                knowledge)
              </p>
            </Section>
          </Content>
        </>
      )}
    </>
  );
};

export default Homepage;
