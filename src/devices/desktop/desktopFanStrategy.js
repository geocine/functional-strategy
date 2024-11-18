import { useReducer } from 'react';

const initialState = {
  speed: 2, // Start at low speed for quiet operation
  isRunning: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SPEED':
      return {
        ...state,
        speed: action.payload,
        isRunning: action.payload > 0
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const useDesktopFanStrategy = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSpeedChange = (speed) => {
    let warning = null;
    const limitedSpeed = Math.min(speed, 8); // Limit max speed for noise
    
    if (speed > 7) {
      warning = 'High noise level';
    }

    dispatch({ type: 'SET_SPEED', payload: limitedSpeed });

    return {
      type: warning ? 'SET_FAN_SPEED_WITH_WARNING' : 'SET_FAN_SPEED',
      payload: warning ? { speed: limitedSpeed, warning } : limitedSpeed
    };
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    getState: () => state,
    handleSpeedChange,
    reset,
    validateSpeed: (speed) => speed >= 0 && speed <= 8
  };
};
