import { combineReducers } from 'redux';
import authReducer from './auth';
import covalentReducer from './covalent';
import settingsReducer from './settings';
import walletReducer from './wallet';
import utilsReducer from './utils';

const rootReducer = combineReducers({
  auth: authReducer,
  covalent: covalentReducer,
  settings: settingsReducer,
  wallet: walletReducer,
  utils: utilsReducer,
});

export default rootReducer;
