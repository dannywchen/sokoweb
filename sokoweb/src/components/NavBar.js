import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../components/NavBar';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  color: #333;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  font-family: 'Indie Flower', cursive;
`;

const SentenceContainer = styled(motion.div)`
  margin-bottom: 40px;
  font-size: 2rem;
  line-height: 1.5;
  max-width: 700px;
  text-align: center;
  margin: 0 auto;
`;

const letterVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const sentenceVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const sentencesPart1 = [
  'SOKO BEGINNING',
  'SOKO BEGINNING PART 1',
];

const sentencesPart2 = [
  'soko school',
  'grad',
];

const Button = styled(motion.button)`
  display: block;
  margin: 40px auto;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const curtainVariants = {
  hidden: { x: '-100%' },
  visible: { x: '0%', transition: { duration: 0.5 } },
  exit: { x: '100%', transition: { duration: 0.5 } },
};

const curtainContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const LifeStory = () => {
  const [visibleSentences, setVisibleSentences] = useState([]);
  const [isPart2, setIsPart2] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSentences((prevVisibleSentences) => {
        const currentSentences = isPart2 ? sentencesPart2 : sentencesPart1;
        if (prevVisibleSentences.length === currentSentences.length) {
          clearInterval(interval);
          if (!isPart2) setShowButton(true);
          return prevVisibleSentences;
        }
        return [...prevVisibleSentences, currentSentences[prevVisibleSentences.length]];
      });
    }, isPart2 ? 3000 : 5000);

    return () => clearInterval(interval);
  }, [isPart2]);

  const handleTransition = () => {
    setShowButton(false);
    setCurtainVisible(true);
    setTimeout(() => {
      setCurtainVisible(false);
      setVisibleSentences([]);
      setIsPart2(true);
    }, 500); 
  };

  return (
    <>
      <NavBar />
      <Container>
        <Title>SOKOS nature</Title>
        <AnimatePresence>
          {visibleSentences.map((sentence, index) => (
            <SentenceContainer
              key={index}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sentenceVariants}
            >
              {sentence.split('').map((letter, i) => (
                <motion.span key={`${index}-${i}`} custom={i} variants={letterVariants}>
                  {letter}
                </motion.span>
              ))}
            </SentenceContainer>
          ))}
        </AnimatePresence>
        {showButton && (
          <AnimatePresence>
            <Button
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={curtainVariants}
              onClick={handleTransition}
            >
              Continue the Story
            </Button>
          </AnimatePresence>
        )}
        <AnimatePresence>
          {curtainVisible && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={curtainContainerVariants}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#fff' }}
            />
          )}
        </AnimatePresence>
        <div style={{ height: '2000px' }} />
      </Container>
    </>
  );
};

export default LifeStory;
