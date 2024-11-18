import { FanMonitor } from '../../components/FanMonitor';
import { useServerFanStrategy } from './serverFanStrategy';

export const ServerFan = () => {
  const strategy = useServerFanStrategy();

  return (
    <div className="fan-container">
      <h2>Server Room Fan</h2>
      <div className="strategy-summary">
        <h3>Strategy Rules</h3>
        <ul>
          <li>Starts at medium speed (5) for safety</li>
          <li>Warns if speed is below 3 (risk of overheating)</li>
          <li>Warns if speed exceeds 8 (temperature check required)</li>
          <li>Full speed range (0-10) available</li>
        </ul>
        <div className="state-type">Strategy: Server Room Safety</div>
        <div className="state-type">State Management: useState</div>
      </div>
      <FanMonitor strategy={strategy} />
    </div>
  );
};
