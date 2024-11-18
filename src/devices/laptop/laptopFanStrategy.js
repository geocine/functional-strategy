import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  speed: 0, // Start stopped to save power
  isRunning: false
};

const laptopSlice = createSlice({
  name: 'laptop',
  initialState,
  reducers: {
    setSpeed: (state, action) => {
      state.speed = action.payload;
      state.isRunning = action.payload > 0;
    },
    reset: () => initialState
  }
});

export const { setSpeed, reset } = laptopSlice.actions;
export const laptopReducer = laptopSlice.reducer;

export const useLaptopFanStrategy = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.laptop);

  const handleSpeedChange = (speed) => {
    let warning = null;
    
    // New rules for laptop fan
    if (speed >= 4 && speed <= 6) {
      warning = 'Moderate power consumption - Consider closing unused apps';
    } else if (speed > 6) {
      warning = 'High power consumption - Battery drain warning';
    }

    dispatch(setSpeed(speed));

    return {
      type: warning ? 'SET_FAN_SPEED_WITH_WARNING' : 'SET_FAN_SPEED',
      payload: warning ? { speed, warning } : speed
    };
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return {
    getState: () => state,
    handleSpeedChange,
    reset: handleReset,
    validateSpeed: (speed) => speed >= 0 && speed <= 10
  };
};
