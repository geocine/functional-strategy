import { useState } from 'react';

export const useServerFanStrategy = () => {
  const [state, setState] = useState({
    speed: 5, // Start at medium speed for safety
    isRunning: true
  });

  const handleSpeedChange = (speed) => {
    let warning = null;
    
    if (speed < 3) {
      warning = 'Low speed may cause overheating';
    } else if (speed > 8) {
      warning = 'High speed mode - Check temperature';
    }

    setState({
      speed,
      isRunning: speed > 0
    });

    return {
      type: warning ? 'SET_FAN_SPEED_WITH_WARNING' : 'SET_FAN_SPEED',
      payload: warning ? { speed, warning } : speed
    };
  };

  const reset = () => {
    setState({
      speed: 5,
      isRunning: true
    });
  };

  return {
    getState: () => state,
    handleSpeedChange,
    reset,
    validateSpeed: (speed) => speed >= 0 && speed <= 10
  };
};
