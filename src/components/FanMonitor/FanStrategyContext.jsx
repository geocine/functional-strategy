import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const FanStrategyContext = createContext(null);

export const useFanStrategy = () => {
  const strategy = useContext(FanStrategyContext);
  if (!strategy) {
    throw new Error('useFanStrategy must be used within a FanStrategyProvider');
  }
  return strategy();  // Call the strategy hook to get the actual implementation
};

export const FanStrategyProvider = ({ strategy, children }) => (
  <FanStrategyContext.Provider value={strategy}>
    {children}
  </FanStrategyContext.Provider>
);

FanStrategyProvider.propTypes = {
  strategy: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
