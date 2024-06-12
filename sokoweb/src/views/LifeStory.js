import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import NavBar from "../components/NavBar";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const flyIn = keyframes`
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: translateY(0) rotate(360deg);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: "Cormorant Garamond", serif;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  background-color: #f1d3b2;
  border-right: 2px solid #ccc;
  position: relative;
`;

const ImageFrame = styled.div`
  width: 80%;
  position: absolute;
  animation: ${slideUp} 1s ease-in-out forwards;
  &.fade-out {
    animation: ${fadeOut} 1s ease-in-out forwards;
  }
`;

const Image = styled.img`
  width: 100%;
  border: 10px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: rotate(${() => Math.random() * 10 - 5}deg);
`;

const TextContainer = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #46211a;
  color: #fff;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 5rem;
  color: #fff5e1;
  font-family: "Cinzel", serif;
`;

const SentenceContainer = styled(motion.div)`
  margin-bottom: 40px;
  font-size: 2rem;
  line-height: 1.5;
  max-width: 700px;
  text-align: center;
  margin: 0 auto;
  color: #fff5e1;
  font-family: "Cinzel", serif;
`;

const ArtisticButton = styled(motion.button)`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  background: linear-gradient(45deg, #6b0f1a, #b91372);
  color: #fff;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(45deg, #b91372, #6b0f1a);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-45deg);
    transition: all 0.5s;
  }

  &:before {
    transform: skewX(-45deg) translateX(-50%);
  }

  &:after {
    transform: skewX(-45deg) translateX(-100%);
  }

  &:hover:before {
    transform: skewX(-45deg) translateX(100%);
  }

  &:hover:after {
    transform: skewX(-45deg) translateX(200%);
  }
`;

const Confetti = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: ${() => `hsl(${Math.random() * 360}, 100%, 70%)`};
  opacity: 0.7;
  animation: fall 10s linear infinite;
  transform: rotate(${() => Math.random() * 360}deg);

  @keyframes fall {
    0% {
      transform: translateY(0) rotate(${() => Math.random() * 360}deg);
    }
    100% {
      transform: translateY(100vh) rotate(${() => Math.random() * 360}deg);
    }
  }
`;

const FlyingEmoji = styled.div`
  position: absolute;
  top: 100vh;
  font-size: 2rem;
  animation: ${flyIn} ${() => Math.random() * 5 + 5}s linear infinite;

  &:nth-child(odd) {
    animation-direction: reverse;
  }
`;

const emojis = ["🎨", "🖼️", "🌟", "✨", "🎉"];

const titles = [
  "The Making of a Teacher in the Ural Mountains",
  "A New Chapter in the Big Apple",
  "The Rewards of Sharing a Passion",
  "A Teacher's Heart and a Student's Journey",
  "A Love Affair with Art and Culture",
  "Memorable Moments and Unexpected Surprises",
  "Achievements and the Pursuit of Knowledge",
  "The Power of Optimism",
  "Sokolovski's Special Message",
  "A Toast to Life and Learning",
];

const sentences = [
  [
    "In the heart of Russia, where the majestic Ural Mountains meet the sky, a young Sokolovski found her calling. Inspired by the passionate educators at her Specialized French Gymnasium, she dreamt of a life filled with knowledge and the joy of teaching. She embarked on a journey at the Ural State Pedagogical University, delving into the world of language and literature. It was a world full of possibilities!",
  ],
  [
    "Life took an unexpected turn, leading Sokolovski to the bustling streets of New York City. She began her teaching career, but her heart yearned to share her deep love for her homeland. Fate smiled upon her when she landed a position teaching Russian at Brooklyn Tech, fulfilling her dream and allowing her to introduce American students to the rich tapestry of Russian language and culture.",
  ],
  [
    "For Sokolovski, teaching Russian was far more than grammar and vocabulary drills. It was about witnessing the spark of understanding in her students' eyes, the joy of discovering a new world. The heartfelt thank-you notes and stories from former students, recounting how her lessons had broadened their horizons and shaped their lives, were her most cherished rewards.",
  ],
  [
    "Sokolovski believed in creating a positive and encouraging environment for her students. She knew that mistakes were just stepping stones on the path to learning. With patience and understanding, she guided her students through the intricacies of the Russian language, offering extra help and showing them that progress was more important than perfection. She also believed in making memories, capturing moments of laughter and learning in class photos and videos.",
  ],
  [
    "Art was another of Sokolovski's passions. She was particularly drawn to the vibrant colors and emotions of Impressionism. Sokolovski found joy in sharing her love for art with her students, incorporating paintings into her lessons to bring Russian culture to life. The stories behind the artists and their masterpieces fascinated her, and she made sure her students learned not only the language but also the artistic soul of Russia.",
  ],
  [
    "Sokolovski's teaching career was filled with memorable moments: surprise birthday flowers from her students, heartfelt thank-you cards, and lively end-of-year celebrations at 'Elena's Café.' She also cherished the opportunity to chaperone students on an exchange program to Russia, where they experienced the culture firsthand and forged lifelong friendships.",
  ],
  [
    "Sokolovski's thirst for knowledge led her to earn two master's degrees in education. She also proudly supervised the Art Club and Maker Space project, where students could unleash their creativity under the guidance of a resident artist. She was proud of the many creative projects they had accomplished together.",
  ],
  [
    "Sokolovski believed in the power of optimism. Her positive energy and encouraging spirit radiated throughout her classroom and life. She often quoted Mary Lou Retton's words: 'Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you.'",
  ],
  [
    "Sokolovski's special message is simple yet profound: 'Live and learn.' Embrace the journey of continuous learning, explore the world with an open mind, and never lose your curiosity.",
  ],
  [
    "As Sokolovski would say, 'На здоровье!' Cheers to life, learning, and all the exciting adventures that await us!",
  ],
];

const images = [
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
  "https://via.placeholder.com/300x400",
];

const letterVariants = {
  hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const sentenceVariants = {
  hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    filter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const LifeStory = () => {
  const [visibleSentences, setVisibleSentences] = useState([]);
  const [currentPart, setCurrentPart] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [fadeOutCurrent, setFadeOutCurrent] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSentences((prevVisibleSentences) => {
        const currentSentences = sentences[currentPart - 1];
        if (prevVisibleSentences.length === currentSentences.length) {
          clearInterval(interval);
          if (currentPart < sentences.length) setShowButton(true);
          return prevVisibleSentences;
        }
        return [
          ...prevVisibleSentences,
          currentSentences[prevVisibleSentences.length],
        ];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPart]);

  const handleNextPart = () => {
    setShowButton(false);
    setFadeOutCurrent(true);
    setTimeout(() => {
      setFadeOutCurrent(false);
      setVisibleSentences([]);
      setCurrentPart(currentPart + 1);
      gsap.fromTo(
        `.image-frame-${currentPart}`,
        { opacity: 0, y: "100%" },
        { opacity: 1, y: 0, duration: 1 }
      );
    }, 500);
  };

  const handlePreviousPart = () => {
    setShowButton(false);
    setFadeOutCurrent(true);
    setTimeout(() => {
      setFadeOutCurrent(false);
      setVisibleSentences([]);
      setCurrentPart(currentPart - 1);
    }, 500);
  };

  return (
    <>
      <NavBar />
      <Container>
        <ImageContainer>
          {images.slice(0, currentPart).map((image, index) => (
            <ImageFrame
              key={index}
              className={`image-frame-${index + 1} ${
                index + 1 === currentPart && fadeOutCurrent ? "fade-out" : ""
              }`}
            >
              <Image src={image} alt={`Life story ${index + 1}`} />
            </ImageFrame>
          ))}
          {!fadeOutCurrent && (
            <ImageFrame
              key={currentPart}
              className={`image-frame-${currentPart}`}
            >
              <Image
                src={images[currentPart - 1]}
                alt={`Life story ${currentPart}`}
              />
            </ImageFrame>
          )}
        </ImageContainer>
        <TextContainer>
          <Title>
            Episode {currentPart}: {titles[currentPart - 1]}
          </Title>
          <AnimatePresence>
            {visibleSentences.map((sentence, index) => (
              <SentenceContainer
                key={index}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={sentenceVariants}
              >
                {sentence.split("").map((letter, i) => (
                  <motion.span
                    key={`${index}-${i}`}
                    custom={i}
                    variants={letterVariants}
                  >
                    {letter}
                  </motion.span>
                ))}
              </SentenceContainer>
            ))}
          </AnimatePresence>
          {showButton && currentPart < sentences.length && (
            <AnimatePresence>
              <ArtisticButton
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={handleNextPart}
              >
                Continue the Story
              </ArtisticButton>
            </AnimatePresence>
          )}
          {showButton && currentPart > 1 && (
            <AnimatePresence>
              <ArtisticButton
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={handlePreviousPart}
              >
                Previous Part
              </ArtisticButton>
            </AnimatePresence>
          )}
        </TextContainer>
        {Array.from({ length: 100 }).map((_, index) => (
          <Confetti
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
        {Array.from({ length: 50 }).map((_, index) => (
          <FlyingEmoji
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </FlyingEmoji>
        ))}
      </Container>
    </>
  );
};

export default LifeStory;
