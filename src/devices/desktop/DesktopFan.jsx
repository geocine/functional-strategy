import { FanMonitor } from '@components/FanMonitor/FanMonitor';
import { useDesktopFanStrategy } from './desktopFanStrategy';
import { FanStrategyProvider } from '@components/FanMonitor/FanStrategyContext';

export const DesktopFan = () => {
  return (
    <div className="fan-container">
      <h2>Desktop Fan</h2>
      <div className="strategy-summary">
        <h3>Strategy Rules</h3>
        <ul>
          <li>Starts at speed 2 for quiet operation</li>
          <li>Maximum speed limited to 8 for noise control</li>
          <li>Warning at speeds above 7 (noise warning)</li>
          <li>Optimized for quiet operation</li>
        </ul>
        <div className="state-type">Strategy: Desktop Quiet Operation</div>
        <div className="state-type">State Management: useReducer</div>
      </div>
      <FanStrategyProvider strategy={useDesktopFanStrategy}>
        <FanMonitor />
      </FanStrategyProvider>
    </div>
  );
};
