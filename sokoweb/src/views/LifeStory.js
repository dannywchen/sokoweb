import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../components/NavBar';

const Container = styled.div`
  padding: 20px;
  max-width: max;
  margin: 0 auto;
  font-family: 'Cormorant Garamond', serif;
  color: #333;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
  background: url('https://media.discordapp.net/attachments/1185428336189648917/1244499505798451291/Work_Files.png?ex=665555fb&is=6654047b&hm=3a35f754d009d60c896f51aa20776bc2555e792fa1088f07f9e6a6cc16429fc2&=&format=webp&quality=lossless&width=756&height=424') no-repeat center center fixed;
  background-size: cover;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 5rem;
  font-family: 'caveat', serif;
  color: brown;
`;

const SentenceContainer = styled(motion.div)`
  margin-bottom: 40px;
  font-size: 2rem;
  font-style: italic;
  line-height: 1.5;
  max-width: 700px;
  text-align: center;
  margin: 0 auto;
  font-family: 'Cormorant Garamond', serif;
  color: #fdf5c9; 
`;

const flyKeyframes = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(100vw, 100vh) scale(0); }
`;

const Star = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  animation: ${flyKeyframes} 10s linear infinite;
  top: ${() => Math.random() * 100}%;
  left: ${() => Math.random() * 100}%;
`;

const letterVariants = {
  hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const sentenceVariants = {
  hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const sentencesPart1 = [
  'Elena Sokolovski always felt a deep connection to her roots.',
  'Growing up in the Russian Federation, she was inspired by the teachers at Specialized French Gymnasium #39.',
  'They weren\'t just educators; they were role models who nurtured kindness, honesty, independence, and hard work.',
  'Their pedagogical skills, vast knowledge, and loving attitudes created an environment where students thrived, and Elena was no exception.',
  'She admired them deeply and knew early on that she wanted to follow in their footsteps, becoming a teacher who could influence children\'s development in the same nurturing way.',
];

const sentencesPart2 = [
  'Elena graduated from the Ural State Pedagogical University, armed with a degree in philology and a passion for education.',
  'Her journey took a significant turn when she immigrated to the United States.',
  'Despite the challenges of adapting to a new country, she found a home in the NYC Department of Education, initially as an elementary teacher.',
  'Her perseverance and dedication soon led her to a role that felt like a dream come true—teaching Russian at one of New York\'s top schools.',
  'In her classroom, Elena discovered that the most rewarding moments came when her students expressed their gratitude.',
];

const sentencesPart3 = [
  'They would write heartfelt letters, sharing how much they had learned about Russia and how their knowledge had broadened their worldview.',
  'Some spoke of continuing their Russian studies in college, while others recounted their experiences of meeting Russian-speaking people in various walks of life, feeling a sense of connection and accomplishment.',
  'Elena cherished these stories, seeing them as proof of the impact she was making.',
  'Elena\'s teaching style was a blend of positivity, optimism, and encouragement.',
  'She was always open to questions and ready to help any student, understanding the challenges of learning a new language.',
];

const sentencesPart4 = [
  'She provided extra preparation time and helpful retakes for those who struggled, emphasizing that improvement, effort, and the joy of learning were more important than scores.',
  'She also believed in creating lasting memories, often taking class photos or videos of her students singing Russian songs, which she would share with everyone.',
  'Her favorite aspect of Russian culture was art.',
  'Elena enjoyed teaching various topics, from family life and famous Russian landmarks to literature and theater.',
  'However, art held a special place in her heart.',
];

const sentencesPart5 = [
  'She believed that art was integral to Russian culture and vital in shaping the identity of its people.',
  'Art education, she knew, was linked to improved critical thinking, increased academic achievement, and overall well-being.',
  'It was a powerful tool for self-expression and cultural preservation.',
  'Her favorite artists included Impressionists like Amedeo Modigliani, Renoir, Claude Monet, and Edgar Degas.',
  'Elena\'s teaching career was filled with memorable experiences.',
];

const Button = styled(motion.button)`
  display: block;
  margin: 20px auto;
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
  const [currentPart, setCurrentPart] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(false);

  const sentences = [sentencesPart1, sentencesPart2, sentencesPart3, sentencesPart4, sentencesPart5];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSentences((prevVisibleSentences) => {
        const currentSentences = sentences[currentPart - 1];
        if (prevVisibleSentences.length === currentSentences.length) {
          clearInterval(interval);
          if (currentPart < sentences.length) setShowButton(true);
          return prevVisibleSentences;
        }
        return [...prevVisibleSentences, currentSentences[prevVisibleSentences.length]];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPart]);

  const handleNextPart = () => {
    setShowButton(false);
    setCurtainVisible(true);
    setTimeout(() => {
      setCurtainVisible(false);
      setVisibleSentences([]);
      setCurrentPart(currentPart + 1);
    }, 500); 
  };

  const handlePreviousPart = () => {
    setShowButton(false);
    setCurtainVisible(true);
    setTimeout(() => {
      setCurtainVisible(false);
      setVisibleSentences([]);
      setCurrentPart(currentPart - 1);
    }, 500); 
  };

  return (
    <>
      <NavBar />
      <Container>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap" rel="stylesheet" />
        {Array.from({ length: 100 }).map((_, i) => (
          <Star key={i} />
        ))}
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
        {showButton && currentPart < sentences.length && (
          <AnimatePresence>
            <Button
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={curtainVariants}
              onClick={handleNextPart}
            >
              Continue the Story
            </Button>
          </AnimatePresence>
        )}
        {showButton && currentPart > 1 && (
          <AnimatePresence>
            <Button
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={curtainVariants}
              onClick={handlePreviousPart}
            >
              Previous Part
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
        <div style={{ height: '1200px' }} />
      </Container>
    </>
  );
};

export default LifeStory;
