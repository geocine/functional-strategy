import { useContext, useCallback, useState, useEffect } from 'react';
import { FanStrategyContext } from '../contexts/FanStrategyContext';
import { createBaseFanStrategy } from '../strategies/fanStrategy';

/**
 * Custom hook for managing fan strategy
 * @param {import('../strategies/fanStrategy').FanStrategy} [customStrategy] - Optional custom strategy
 * @returns {import('../strategies/fanStrategy').FanStrategy}
 */
export const useFanStrategy = (customStrategy) => {
  const contextStrategy = useContext(FanStrategyContext);
  const defaultStrategy = createBaseFanStrategy();
  
  return customStrategy || contextStrategy || defaultStrategy;
};

/**
 * Custom hook for fan monitor functionality
 * @param {import('../strategies/fanStrategy').FanStrategy} [customStrategy] - Optional custom strategy
 * @returns {{
 *   handleSpeedChange: function(number): void,
 *   initialState: import('../strategies/fanStrategy').FanState,
 *   warning: string | null,
 *   currentSpeed: number,
 *   setCurrentSpeed: function(number): void
 * }}
 */
export const useFanMonitor = (customStrategy) => {
  const strategy = useFanStrategy(customStrategy);
  const [warning, setWarning] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(strategy.getInitialState().speed);

  useEffect(() => {
    const initialState = strategy.getInitialState();
    setCurrentSpeed(initialState.speed);
    setWarning(null);
  }, [strategy]);

  const handleSpeedChange = useCallback((newSpeed) => {
    console.group('Fan Monitor');
    console.log('Current speed:', currentSpeed);
    console.log('New speed requested:', newSpeed);

    if (strategy.validateSpeed?.(newSpeed) ?? true) {
      const action = strategy.handleSpeedChange(newSpeed);
      console.log('Action result:', action);

      if (action.type === 'SET_FAN_SPEED_WITH_WARNING') {
        setWarning(action.payload.warning);
      } else {
        setWarning(null);
      }
    }
    console.groupEnd();
  }, [strategy, currentSpeed]);

  return {
    handleSpeedChange,
    initialState: strategy.getInitialState(),
    warning,
    currentSpeed,
    setCurrentSpeed
  };
};
