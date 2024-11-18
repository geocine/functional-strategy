import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ServerFan } from './devices/server/ServerFan';
import { DesktopFan } from './devices/desktop/DesktopFan';
import { LaptopFan } from './devices/laptop/LaptopFan';
import { laptopReducer } from './devices/laptop/laptopFanStrategy';
import './App.css';

const store = configureStore({
  reducer: {
    laptop: laptopReducer
  }
});

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Fan Control System</h1>
        <div className="fan-grid">
          <ServerFan />
          <DesktopFan />
          <LaptopFan />
        </div>
      </div>
    </Provider>
  );
}

export default App;
