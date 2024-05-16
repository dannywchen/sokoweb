import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import SideNav from '../components/SideNav';
import NavBar from '../components/NavBar';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  color: #333;
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

const sentences = `
Elena Sokolovski always felt a deep connection to her roots. Growing up in the Russian Federation, she was inspired by the teachers at Specialized French Gymnasium #39. They weren't just educators; they were role models who nurtured kindness, honesty, independence, and hard work. Their pedagogical skills, vast knowledge, and loving attitudes created an environment where students thrived, and Elena was no exception. She admired them deeply and knew early on that she wanted to follow in their footsteps, becoming a teacher who could influence children's development in the same nurturing way.
Elena graduated from the Ural State Pedagogical University, armed with a degree in philology and a passion for education. Her journey took a significant turn when she immigrated to the United States. Despite the challenges of adapting to a new country, she found a home in the NYC Department of Education, initially as an elementary teacher. Her perseverance and dedication soon led her to a role that felt like a dream come true—teaching Russian at one of New York’s top schools.
In her classroom, Elena discovered that the most rewarding moments came when her students expressed their gratitude. They would write heartfelt letters, sharing how much they had learned about Russia and how their knowledge had broadened their worldview. Some spoke of continuing their Russian studies in college, while others recounted their experiences of meeting Russian-speaking people in various walks of life, feeling a sense of connection and accomplishment. Elena cherished these stories, seeing them as proof of the impact she was making.
Elena’s teaching style was a blend of positivity, optimism, and encouragement. She was always open to questions and ready to help any student, understanding the challenges of learning a new language. She provided extra preparation time and helpful retakes for those who struggled, emphasizing that improvement, effort, and the joy of learning were more important than scores. She also believed in creating lasting memories, often taking class photos or videos of her students singing Russian songs, which she would share with everyone.
Her favorite aspect of Russian culture was art. Elena enjoyed teaching various topics, from family life and famous Russian landmarks to literature and theater. However, art held a special place in her heart. She believed that art was integral to Russian culture and vital in shaping the identity of its people. Art education, she knew, was linked to improved critical thinking, increased academic achievement, and overall well-being. It was a powerful tool for self-expression and cultural preservation.
Elena's favorite artists included Impressionists like Amedeo Modigliani, Renoir, Claude Monet, and Edgar Degas. She was captivated by Modigliani’s portraits, which seemed to come alive with unexplainable charm. She loved reading about the lives of these artists, particularly Modigliani, whose fame came posthumously. His story of poverty and eventual recognition resonated with her deeply. Among Russian artists, she admired Karl Brulov, Ivan Aivazovsky, and Boris Kustodiev, finding it hard to pick just one favorite painting. She enjoyed the realism of the 19th and 20th centuries, often visiting the Tretyakov Gallery in her memories.
Her teaching career was filled with memorable experiences. She fondly recalled students surprising her with flowers on her birthday and Women’s Day, heartfelt cards from students and parents, and joyful end-of-year parties at “Elena’s Café.” The Tech proms were particularly special, where former students would seek her out to express their gratitude and take pictures together. But perhaps the most unforgettable experiences were as a chaperone for cultural exchange programs with Russia. She believed that there was no better learning than from firsthand experience, and these trips allowed students to immerse themselves in the culture, meet new people, and forge lasting friendships.
Elena was proud of her professional achievements, including completing two master’s degrees in the field of education. She also supervised the Art Club and Maker Space project, collaborating with Sundog Theatre Inc. and resident artist Samuel Vega. Over eight years, they completed numerous creative projects, including painting murals, fostering a space where students could explore their creativity.
In her classroom, a favorite quote always hung on the wall: “Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you.” This quote by Mary Lou Retton reflected her teaching philosophy. She also loved the Russian saying, “LIVE AND LEARN” - «ВЕК ЖИВИ, ВЕК УЧИСЬ». It reminded her and her students never to lose the desire for knowledge.
Elena Sokolovski’s story is one of passion, dedication, and the joy of teaching. Her journey from a small gymnasium in Russia to a prominent school in New York is a testament to the power of education and the lasting impact a teacher can have on their students’ lives.
`.trim().split('. ');

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const LifeStory = () => {
  const [revealLimit, setRevealLimit] = React.useState(1); // Number of sentences to reveal initially

  return (
    <>
      <NavBar />
      <SideNav />
      <Container>
        <Title>Elena Sokolovski's Life Story</Title>
        {sentences.slice(0, revealLimit).map((text, index) => (
          <InView
            key={index}
            threshold={0.5}
            triggerOnce={true}
            onChange={(inView) => {
              if (inView && index === revealLimit - 1) {
                setRevealLimit((prev) => prev + 1);
              }
            }}
          >
            {({ inView, ref }) => (
              <SentenceContainer
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={{
                  hidden: {},
                  visible: {},
                }}
              >
                {text.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                  >
                    {letter}
                  </motion.span>
                ))}
              </SentenceContainer>
            )}
          </InView>
        ))}
      </Container>
    </>
  );
};

export default LifeStory;
