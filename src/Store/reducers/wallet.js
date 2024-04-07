import * as ActionTypes from '../ActionTypes';

const initState = {
  monitored_wallet: '',
  balance: 0,
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SET_WALLET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };

    case ActionTypes.SET_MONITOR_WALLET:
      return {
        ...state,
        monitored_wallet: action.wallet,
      };

    default:
      return state;
  }
};

export default settingsReducer;
