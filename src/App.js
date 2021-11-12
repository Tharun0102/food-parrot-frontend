import './App.scss';
import configureStore from './store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppRouter from './routes';

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <AppRouter />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
