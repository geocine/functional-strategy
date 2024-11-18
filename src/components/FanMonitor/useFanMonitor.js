const useFanMonitor = (strategyHook) => {
    const strategy = strategyHook();
    const { state, setSpeed, reset, validateSpeed } = strategy;
    const { speed, isRunning, warning } = state;
  
    return {
      speed,
      isRunning,
      warning,
      reset,
      setSpeed,
      validateSpeed
    };
  };

export default useFanMonitor;