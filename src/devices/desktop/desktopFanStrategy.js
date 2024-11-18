import { useReducer } from 'react';

const initialState = {
  speed: 2, // Start at low speed for quiet operation
  isRunning: true,
  warning: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAN_STATE':
      return {
        ...state,
        ...action.payload
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const useDesktopFanStrategy = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSpeed = (speed) => {
    let warning = null;
    const limitedSpeed = Math.min(speed, 8); // Limit max speed for noise
    
    if (speed > 7) {
      warning = 'High noise level';
    }

    dispatch({ 
      type: 'SET_FAN_STATE', 
      payload: {
        speed: limitedSpeed,
        isRunning: limitedSpeed > 0,
        warning
      }
    });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const validateSpeed = (speed) => speed >= 0 && speed <= 8;

  return {
    state,
    setSpeed,
    reset,
    validateSpeed
  };
};
