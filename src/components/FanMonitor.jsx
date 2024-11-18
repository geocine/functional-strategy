import PropTypes from 'prop-types';
import { useFanMonitor } from '../hooks/useFanStrategy';

/**
 * Fan Monitor component
 * @param {Object} props
 * @param {import('../strategies/fanStrategy').FanStrategy} [props.strategy] - Optional custom strategy
 */
export const FanMonitor = ({ strategy }) => {
  const {
    handleSpeedChange,
    warning,
    currentSpeed,
    setCurrentSpeed
  } = useFanMonitor(strategy);

  const handleSpeedInput = (event) => {
    // Get the raw DOM event
    const nativeEvent = event.nativeEvent;
    const target = event.target;
    const newSpeed = parseInt(target.value, 10);
    
    // Log the speed change attempt
    console.group('Fan Speed Change');
    console.log('Event details:', {
      type: nativeEvent.type,
      target: target.id,
      previousSpeed: currentSpeed,
      newSpeed: newSpeed
    });
    
    // Update local state and trigger strategy
    setCurrentSpeed(newSpeed);
    handleSpeedChange(newSpeed);
    
    console.groupEnd();
  };

  const getStatusColor = () => {
    if (warning) return 'warning';
    if (currentSpeed > 0) return 'running';
    return '';
  };

  return (
    <div className="fan-monitor">
      <h2>Fan Monitor</h2>
      <div className="fan-controls">
        <label htmlFor="speed-input">Fan Speed:</label>
        <div className="speed-control">
          <input
            id="speed-input"
            type="range"
            min="0"
            max="10"
            value={currentSpeed}
            onChange={handleSpeedInput}
            className={warning ? 'warning' : ''}
            step="1"
            aria-label="Fan speed control"
          />
          <span className={`speed-value ${warning ? 'warning' : ''}`}>
            {currentSpeed}
          </span>
        </div>
      </div>
      <div className={`fan-status ${getStatusColor()}`}>
        <p>Status: {currentSpeed > 0 ? 'Running' : 'Stopped'}</p>
        {warning && (
          <p className="warning-message" role="alert">
            ⚠️ {warning}
          </p>
        )}
      </div>
    </div>
  );
};

FanMonitor.propTypes = {
  strategy: PropTypes.shape({
    handleSpeedChange: PropTypes.func.isRequired,
    getInitialState: PropTypes.func.isRequired,
    validateSpeed: PropTypes.func
  })
};
