import React, { useState, useEffect } from 'react';

interface NumberCounterProps {
  endValue: number;
  duration: number;
  decimals?: number;
  text_class?: string;
}

const NumberCounter: React.FC<NumberCounterProps> = ({ endValue, duration, decimals = 0, text_class='' }) => {
  const [count, setCount] = useState(0);
  const step = (endValue / duration) * 80;

  useEffect(() => {
    let timer: any;
    if (count < endValue) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + step;
          return newCount >= endValue ? endValue : newCount;
        });
      }, 80);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count, endValue, step]);

  return (
    <div>
      <p className={text_class}>{count.toFixed(decimals)}</p>
    </div>
  );
};

export default NumberCounter;
