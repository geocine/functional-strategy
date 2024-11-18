import { createContext } from 'react';
import PropTypes from 'prop-types';

/**
 * @type {import('react').Context<import('../strategies/fanStrategy').FanStrategy|null>}
 */
export const FanStrategyContext = createContext(null);

/**
 * Strategy provider component
 * @param {Object} props
 * @param {import('../strategies/fanStrategy').FanStrategy} props.strategy - Strategy to provide
 * @param {import('react').ReactNode} props.children - Child components
 */
export const FanStrategyProvider = ({ strategy, children }) => (
  <FanStrategyContext.Provider value={strategy}>
    {children}
  </FanStrategyContext.Provider>
);

FanStrategyProvider.propTypes = {
  strategy: PropTypes.shape({
    handleSpeedChange: PropTypes.func.isRequired,
    getInitialState: PropTypes.func.isRequired,
    validateSpeed: PropTypes.func
  }).isRequired,
  children: PropTypes.node.isRequired
};
