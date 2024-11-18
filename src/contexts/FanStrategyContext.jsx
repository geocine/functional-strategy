import { createContext } from 'react';
import PropTypes from 'prop-types';


export const FanStrategyContext = createContext(null);

export const FanStrategyProvider = ({ strategy, children }) => (
  <FanStrategyContext.Provider value={strategy}>
    {children}
  </FanStrategyContext.Provider>
);

FanStrategyProvider.propTypes = {
  strategy: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
