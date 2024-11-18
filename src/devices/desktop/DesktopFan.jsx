import { FanMonitor } from '../../components/FanMonitor';
import { useDesktopFanStrategy } from './desktopFanStrategy';

export const DesktopFan = () => {
  const strategy = useDesktopFanStrategy();

  return (
    <div className="fan-container">
      <h2>Desktop PC Fan</h2>
      <div className="strategy-summary">
        <h3>Strategy Rules</h3>
        <ul>
          <li>Starts at low speed (2) for quiet operation</li>
          <li>Maximum speed limited to 8 for noise control</li>
          <li>Warns if speed exceeds 7 (noise level warning)</li>
          <li>Optimized for balanced performance and noise</li>
        </ul>
        <div className="state-type">Strategy: Desktop Noise Control</div>
        <div className="state-type">State Management: useReducer</div>
      </div>
      <FanMonitor strategy={strategy} />
    </div>
  );
}
