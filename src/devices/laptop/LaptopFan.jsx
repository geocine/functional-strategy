import { FanMonitor } from '../../components/FanMonitor';
import { useLaptopFanStrategy } from './laptopFanStrategy';

export const LaptopFan = () => {
  const strategy = useLaptopFanStrategy();

  return (
    <div className="fan-container">
      <h2>Laptop Fan</h2>
      <div className="strategy-summary">
        <h3>Strategy Rules</h3>
        <ul>
          <li>Starts at speed 0 to save power</li>
          <li>Warning at speeds 4-6 (moderate power consumption)</li>
          <li>Warning at speeds 7+ (high power consumption)</li>
          <li>Optimized for battery life awareness</li>
        </ul>
        <div className="state-type">Strategy: Laptop Power Efficiency</div>
        <div className="state-type">State Management: Redux</div>
      </div>
      <FanMonitor strategy={strategy} />
    </div>
  );
};
