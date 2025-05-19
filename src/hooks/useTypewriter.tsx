import { useState, useEffect } from 'react';

const useTypewriter = (str: string, speed: number = 50, delay: number = 0) => {
  const [text, setText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Reset state when text changes
    setText('');
    setIsComplete(false);

    // Initial delay before starting to type
    const startTyping = () => {
      let i = 0;

      const typing = () => {
        if (i < str.length) {
          setText(str.substring(0, i + 1));
          i++;
          timeout = setTimeout(typing, speed);
        } else {
          setIsComplete(true);
        }
      };

      timeout = setTimeout(typing, 0);
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [str, speed, delay]);

  return { text, isComplete };
};

export default useTypewriter;
