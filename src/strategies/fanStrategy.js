/**
 * @typedef {Object} FanState
 * @property {number} speed - Current fan speed
 * @property {boolean} isRunning - Fan running status
 */

/**
 * @typedef {Object} FanAction
 * @property {string} type - Action type
 * @property {*} payload - Action payload
 */

/**
 * @typedef {Object} FanStrategy
 * @property {function(number): FanAction} handleSpeedChange - Handles speed changes
 * @property {function(): FanState} getInitialState - Gets initial state
 * @property {function(number): boolean} [validateSpeed] - Optional speed validation
 */

/**
 * Creates a base fan monitoring strategy
 * @returns {FanStrategy}
 */
export const createBaseFanStrategy = () => ({
  handleSpeedChange: (speed) => {
    console.log('Base Strategy: Setting speed to', speed);
    return {
      type: 'SET_FAN_SPEED',
      payload: speed
    };
  },
  
  getInitialState: () => ({
    speed: 0,
    isRunning: false
  }),
  
  validateSpeed: (speed) => true
});

/**
 * Creates a device-specific strategy
 * @param {FanStrategy} [baseStrategy] - Base strategy to extend
 * @returns {FanStrategy}
 */
export const createDevice1Strategy = (baseStrategy = createBaseFanStrategy()) => ({
  ...baseStrategy,
  
  handleSpeedChange: (speed) => {
    console.group('Device 1 Strategy');
    console.log('Processing speed change:', speed);
    
    if (speed > 5) {
      console.warn('Speed exceeds recommended level');
      console.groupEnd();
      return {
        type: 'SET_FAN_SPEED_WITH_WARNING',
        payload: { speed, warning: 'High speed mode' }
      };
    }
    
    console.log('Speed within normal range');
    console.groupEnd();
    return baseStrategy.handleSpeedChange(speed);
  },
  
  validateSpeed: (speed) => {
    const isValid = speed >= 0 && speed <= 10;
    if (!isValid) {
      console.error('Device 1 Strategy: Invalid speed value:', speed);
    }
    return isValid;
  }
});

/**
 * Creates a composed strategy from multiple enhancers
 * @param {FanStrategy} baseStrategy - Base strategy to enhance
 * @param {Array<function(FanStrategy): FanStrategy>} enhancers - Strategy enhancers
 * @returns {FanStrategy}
 */
export const createComposedStrategy = (baseStrategy, enhancers) => {
  console.group('Creating Composed Strategy');
  console.log('Base strategy:', baseStrategy);
  console.log('Number of enhancers:', enhancers.length);
  console.groupEnd();
  return enhancers.reduce((strategy, enhance) => enhance(strategy), baseStrategy);
};

/**
 * Example enhancer that adds logging
 * @param {FanStrategy} strategy - Strategy to enhance
 * @returns {FanStrategy}
 */
export const addLoggingToStrategy = (strategy) => ({
  ...strategy,
  handleSpeedChange: (speed) => {
    console.group('Enhanced Strategy');
    console.log('Speed change requested:', speed);
    
    const result = strategy.handleSpeedChange(speed);
    console.log('Action dispatched:', result);
    console.groupEnd();
    return result;
  }
});
