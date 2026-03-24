import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import './index.scss';

interface Props {
  darkMode: boolean;
  onFinish: () => void;
}

export default function DarkModeAnimation({ darkMode, onFinish }: Props) {
  const [mode] = useState<boolean>(!darkMode);

  const variants: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: [0, 1, 1],
      transition: {
        duration: 1.6,
        times: [0, 0.2, 1]
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className={`dark-animation ${mode ? 'to-dark' : 'to-light'}`}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      onAnimationComplete={(variantName) => {
        if (variantName === 'enter') {
          onFinish();
        }
      }}
    >
      <div className='sky' />
      <div className='planet' />
      <div className="stars" />
    </motion.div>
  );
}
