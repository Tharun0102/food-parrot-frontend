import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import user from "./reducers/User";

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
  });

  const rootReducer = (state, action) => {
    return appReducer(state, action);
  };

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );

  const persistor = persistStore(store);

  return { persistor, store };
}