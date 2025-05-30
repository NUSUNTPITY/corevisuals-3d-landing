import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextSplitterProps {
  text: string;
  mode: 'chars' | 'words';
  className?: string;
  charClassName?: string;
  wordClassName?: string;
  animationDelayBase?: number; //Base delay to calculate with
  animationDuration?: number;   //Duration of text
}

const TextSplitter: React.FC<TextSplitterProps> = ({
  text,
  mode,
  className,
  charClassName = "inline-block",
  wordClassName = "inline-block",
  animationDelayBase = 0.05,
  animationDuration = 0.75,
}) => {
  const [splitContent, setSplitContent] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let newContent: string[] = [];

    if (mode === 'chars') {
      newContent = text.split('');
    } else if (mode === 'words') {
      newContent = text.split(' ');
    }

    setSplitContent(newContent);
  }, [text, mode]);

  return (
    <div ref={componentRef} className={className}>
      {splitContent.map((item, index) => {
        const animationDelay = index * animationDelayBase;
        const baseStyle = {
          "--animation-delay": `${animationDelay}s`,
          "--animation-duration": `${animationDuration}s`,
        } as React.CSSProperties;

        if (mode === 'chars') {
          return (
            <span
              key={index}
              style={baseStyle}
              className={cn(
                "inline-block will-change-transform",
                charClassName,
                mounted ? 'animate-slide-in-char' : 'opacity-0' //Initial State for Anim
              )}
            >
              {item}
            </span>
          );
        } else {
          return (
            <span
              key={index}
              style={baseStyle}
              className={cn(
                "inline-block will-change-transform",
                wordClassName,
                mounted ? 'animate-slide-in-word' : 'opacity-0',  //Initial State for Anim
                index < splitContent.length - 1 ? ' ' : ''
              )}
            >
              {item}
            </span>
          );
        }
      })}
    </div>
  );
};

export default TextSplitter;