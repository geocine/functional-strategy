import { useState, useMemo } from 'react';
import { FanMonitor } from './components/FanMonitor';
import { FanStrategyProvider } from './contexts/FanStrategyContext';
import { 
  createBaseFanStrategy, 
  createDevice1Strategy, 
  createComposedStrategy,
  addLoggingToStrategy 
} from './strategies/fanStrategy';
import './App.css';

function App() {
  const [selectedStrategy, setSelectedStrategy] = useState('base');

  // Create strategies with proper logging
  const strategies = useMemo(() => {
    console.log('Initializing strategies...');
    const base = createBaseFanStrategy();
    const device1 = createDevice1Strategy();
    const enhanced = createComposedStrategy(
      createDevice1Strategy(),
      [addLoggingToStrategy]
    );

    return {
      base,
      device1,
      enhanced
    };
  }, []);

  const strategyInfo = useMemo(() => ({
    base: {
      name: 'Base Strategy',
      description: 'Basic fan control with no restrictions'
    },
    device1: {
      name: 'Device 1 Strategy',
      description: 'Device-specific strategy with speed limits and warnings'
    },
    enhanced: {
      name: 'Enhanced Strategy',
      description: 'Device strategy with added logging capabilities'
    }
  }), []);

  const handleStrategyChange = (event) => {
    // Get the selected option
    const select = event.target;
    const newStrategy = select.value;
    const selectedOption = select.options[select.selectedIndex];
    
    // Log strategy change details
    console.group('Strategy Change');
    console.log('Previous strategy:', selectedStrategy);
    console.log('New strategy:', newStrategy);
    console.log('Selected option:', selectedOption.text);
    console.log('Strategy details:', {
      previous: strategyInfo[selectedStrategy],
      new: strategyInfo[newStrategy]
    });
    console.groupEnd();

    // Update the selected strategy
    setSelectedStrategy(newStrategy);
  };

  return (
    <div className="app">
      <h1>Fan Control System</h1>
      
      <div className="strategy-selector">
        <label>
          Select Strategy:
          <select 
            value={selectedStrategy} 
            onChange={handleStrategyChange}
            aria-label="Select fan control strategy"
          >
            <option value="base">Base Strategy</option>
            <option value="device1">Device 1 Strategy</option>
            <option value="enhanced">Enhanced Strategy</option>
          </select>
        </label>
      </div>

      <div className="strategy-info">
        <h3>Current Strategy: {strategyInfo[selectedStrategy].name}</h3>
        <p>{strategyInfo[selectedStrategy].description}</p>
      </div>

      <div className="monitors">
        <div className="monitor-container">
          <h3>Strategy Provider Example</h3>
          <FanStrategyProvider strategy={strategies[selectedStrategy]}>
            <FanMonitor />
          </FanStrategyProvider>
        </div>

        <div className="monitor-container">
          <h3>Direct Strategy Example</h3>
          <FanMonitor strategy={strategies[selectedStrategy]} />
        </div>
      </div>

      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Base Strategy: No speed restrictions</li>
          <li>Device 1 Strategy: Speed limited to 0-10, warnings above 5</li>
          <li>Enhanced Strategy: Adds logging to Device 1 strategy</li>
        </ul>
        <p>Check the browser console to see strategy actions and logs</p>
      </div>
    </div>
  );
}

export default App;
