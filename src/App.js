import './App.scss';
import configureStore from './store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppRouter from './routes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
toast.configure()

const { persistor, store } = configureStore();

function App() {
  // disable right click
  // useEffect(() => {
  //   document.addEventListener('contextmenu', (e) => {
  //     e.preventDefault();
  //   });
  // }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App">
          <AppRouter />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
          />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
