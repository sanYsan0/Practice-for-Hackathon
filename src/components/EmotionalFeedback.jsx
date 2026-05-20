import React, { useEffect, useState } from 'react';
import './EmotionalFeedback.css';

const EmotionalFeedback = ({ message, trigger, isMini }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger > 0 && message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger, message]);

  if (!visible) return null;

  return (
    <div className={`feedback-bubble ${isMini ? 'mini-bubble' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default EmotionalFeedback;
