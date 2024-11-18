import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  speed: 0, // Start stopped to save power
  isRunning: false,
  warning: null
};

const laptopSlice = createSlice({
  name: 'laptop',
  initialState,
  reducers: {
    setFanState: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState
  }
});

export const { setFanState, reset } = laptopSlice.actions;
export const laptopReducer = laptopSlice.reducer;

export const useLaptopFanStrategy = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.laptop);

  const setSpeed = (speed) => {
    let warning = null;
    
    // New rules for laptop fan
    if (speed >= 4 && speed <= 6) {
      warning = 'Moderate power consumption - Consider closing unused apps';
    } else if (speed > 6) {
      warning = 'High power consumption - Battery drain warning';
    }

    dispatch(setFanState({
      speed,
      isRunning: speed > 0,
      warning
    }));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const validateSpeed = (speed) => speed >= 0 && speed <= 10;

  return {
    state,
    setSpeed,
    reset: handleReset,
    validateSpeed
  };
};
