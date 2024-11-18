import PropTypes from 'prop-types';
import { useState } from 'react';

export const FanMonitor = ({ strategy }) => {
  const state = strategy.getState();
  const [warning, setWarning] = useState(null);

  const handleSpeedInput = (event) => {
    const newSpeed = parseInt(event.target.value, 10);
    if (strategy.validateSpeed?.(newSpeed) ?? true) {
      const action = strategy.handleSpeedChange(newSpeed);
      if (action.type === 'SET_FAN_SPEED_WITH_WARNING') {
        setWarning(action.payload.warning);
      } else {
        setWarning(null);
      }
    }
  };

  const handleReset = () => {
    strategy.reset();
    setWarning(null);
  };

  const getStatusColor = () => {
    if (warning) return 'warning';
    if (state.speed > 0) return 'running';
    return '';
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
            value={state.speed}
            onChange={handleSpeedInput}
            className={warning ? 'warning' : ''}
            step="1"
            aria-label="Fan speed control"
          />
          <span className={`speed-value ${warning ? 'warning' : ''}`}>
            {state.speed}
          </span>
        </div>
      </div>
      <div className={`fan-status ${getStatusColor()}`}>
        <p>Status: {state.isRunning ? 'Running' : 'Stopped'}</p>
        {warning && (
          <p className="warning-message" role="alert">
            ⚠️ {warning}
          </p>
        )}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset to Initial State
      </button>
    </div>
  );
};

FanMonitor.propTypes = {
  strategy: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    handleSpeedChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    validateSpeed: PropTypes.func
  }).isRequired
};
