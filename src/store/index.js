import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import user from "./reducers/User";
import CartReducer from './reducers/Cart.js';

import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const config = {
    key: "root",
    storage,
    debug: true
  };

  // reducers
  const appReducer = persistCombineReducers(config, {
    user: user,
    cart: CartReducer
  });

  const rootReducer = (state, action) => {
    return appReducer(state, action);
  };

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  const persistor = persistStore(store);

  return { persistor, store };
}