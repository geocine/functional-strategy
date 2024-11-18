import { FanMonitor } from '@components/FanMonitor/FanMonitor';
import { useServerFanStrategy } from './serverFanStrategy';
import { FanStrategyProvider } from '@components/FanMonitor/FanStrategyContext';

export const ServerFan = () => {
  return (
    <div className="fan-container">
      <h2>Server Fan</h2>
      <div className="strategy-summary">
        <h3>Strategy Rules</h3>
        <ul>
          <li>Starts at speed 5 for safety</li>
          <li>Warning at speeds below 3 (overheating risk)</li>
          <li>Warning at speeds above 8 (check temperature)</li>
          <li>Optimized for thermal safety</li>
        </ul>
        <div className="state-type">Strategy: Server Thermal Safety</div>
        <div className="state-type">State Management: useState</div>
      </div>
      <FanStrategyProvider strategy={useServerFanStrategy}>
        <FanMonitor />
      </FanStrategyProvider>
    </div>
  );
};
