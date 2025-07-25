import React, { useEffect, useState } from 'react';

interface DigitRollerProps {
  targetDigit: string;
  delay: number;
}

export const DigitRoller: React.FC<DigitRollerProps> = ({ targetDigit, delay }) => {
  const [isRolling, setIsRolling] = useState(true);
  const digitHeight = 40; // Fixed height for each digit

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRolling(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const styles = {
    container: {
      background: 'var(--bg-secondary)',
      padding: 'clamp(2px, 1vw, 4px) clamp(1px, 0.5vw, 2px)',
      borderRadius: '2px',
      width: 'clamp(30px, 8vw, 40px)',
      height: `${digitHeight}px`,
      overflow: 'hidden',
      position: 'relative' as const,
      border: '2px solid var(--text-primary)',
      boxShadow: 'var(--shadow-sm)'
    },
    digitContainer: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      animation: isRolling ? 'rollDigits 0.15s linear infinite' : 'none',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      transform: !isRolling ? `translateY(${-digitHeight * parseInt(targetDigit)}px)` : undefined,
      transition: !isRolling ? 'transform 0.2s ease-out' : undefined
    },
    digit: {
      height: `${digitHeight}px`,
      fontSize: 'clamp(24px, 6vw, 32px)',
      fontWeight: 400,
      color: 'var(--text-primary)',
      fontFamily: "'VT323', monospace",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.digitContainer}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={styles.digit}>
            {i}
          </div>
        ))}
        {[0,1,2,3,4,5,6,7,8,9].map((n) => (
          <div key={`repeat-${n}`} style={styles.digit}>
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}; 