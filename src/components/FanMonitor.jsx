import PropTypes from 'prop-types';
import { useFanStrategy } from '../contexts/FanStrategyContext';

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

export const FanMonitor = ({ strategy }) => {
  const contextStrategy = useFanStrategy;
  const {
    speed,
    isRunning,
    warning,
    reset,
    setSpeed,
    validateSpeed
  } = useFanMonitor(strategy || contextStrategy);

  const getStatusColor = () => {
    if (warning) return 'warning';
    if (speed > 0) return 'running';
    return '';
  }

  const handleSpeedInput = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    if (validateSpeed?.(newSpeed) ?? true) {
      setSpeed(newSpeed);
    }
  };

  return (
    <div className="fan-monitor">
      <div className="fan-controls">
        <label htmlFor="speed-input">Fan Speed:</label>
        <div className="speed-control">
          <input
            id="speed-input"
            type="range"
            min="0"
            max="10"
            value={speed}
            onChange={handleSpeedInput}
            className={warning ? 'warning' : ''}
            step="1"
            aria-label="Fan speed control"
          />
          <span className={`speed-value ${warning ? 'warning' : ''}`}>
            {speed}
          </span>
        </div>
      </div>
      <div className={`fan-status ${getStatusColor()}`}>
        <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
        {warning && (
          <p className="warning-message" role="alert">
            ⚠️ {warning}
          </p>
        )}
      </div>
      <button className="reset-button" onClick={reset}>
        Reset to Initial State
      </button>
    </div>
  );
};

FanMonitor.propTypes = {
  strategy: PropTypes.func // Optional since it can also use context
};
