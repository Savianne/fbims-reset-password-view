import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TimerProps {
  expirationDate: number;
  text?: string;
  onExpires: () => void;
}

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  /* font-style: italic; */
`;

const Time = styled.div`
  margin: 0 5px;
`;

const ExpirationTimer: React.FC<TimerProps> = ({ expirationDate, onExpires, text = "Expires within" }) => {
  const [timeLeft, setTimeLeft] = useState(Math.ceil((expirationDate - Date.now()) / 1000));

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpires();
    } else {
      const interval = setInterval(() => {
        setTimeLeft(Math.ceil((expirationDate - Date.now()) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [expirationDate, onExpires, timeLeft]);

  return (
    <TimerContainer>
      {
        timeLeft > 0? <>
          {text} 
          <Time>{timeLeft}s</Time>
        </> : "Expired!"
      }
    </TimerContainer>
  );
};

export default ExpirationTimer;
