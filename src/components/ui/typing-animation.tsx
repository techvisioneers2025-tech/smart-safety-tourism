
'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypingAnimation({ text, className, speed = 50 }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [key, setKey] = useState(0);

  // When the text prop changes (e.g., language switch), reset the animation
  useEffect(() => {
    setDisplayedText('');
    setKey(prevKey => prevKey + 1); // Update key to re-trigger the typing effect
  }, [text]);

  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        const char = text.charAt(i);
        // Handle HTML tags like <br />
        if (char === '<') {
          const closingTagIndex = text.indexOf('>', i);
          if (closingTagIndex !== -1) {
            const tag = text.substring(i, closingTagIndex + 1);
            setDisplayedText(prev => prev + tag);
            i = closingTagIndex + 1;
          } else {
             setDisplayedText(prev => prev + char);
             i++;
          }
        } else {
            setDisplayedText(prev => prev + char);
            i++;
        }
        setTimeout(type, speed);
      }
    };
    const timer = setTimeout(type, speed);
    return () => clearTimeout(timer);
  }, [text, speed, key]);

  return (
    <h1 className={cn(className, "typing-container")} key={key}>
      <span dangerouslySetInnerHTML={{ __html: displayedText }} />
      <span className="typing-cursor" />
    </h1>
  );
}
