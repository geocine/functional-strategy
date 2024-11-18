import { useState } from 'react';

export const useServerFanStrategy = () => {
  const [state, setState] = useState({
    speed: 5,
    isRunning: true,
    warning: null
  });

  const setSpeed = (newSpeed) => {
    let warning = null;
    
    if (newSpeed < 3) {
      warning = 'Low speed may cause overheating';
    } else if (newSpeed > 8) {
      warning = 'High speed mode - Check temperature';
    }

    setState({
      speed: newSpeed,
      isRunning: newSpeed > 0,
      warning
    });
  };

  const reset = () => {
    setState({
      speed: 5,
      isRunning: true,
      warning: null
    });
  };

  const validateSpeed = (speed) => speed >= 0 && speed <= 10;

  return {
    state,
    setSpeed,
    reset,
    validateSpeed
  };
};
