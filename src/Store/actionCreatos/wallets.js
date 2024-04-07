import * as ActionTypes from '../ActionTypes';

export const setMonitorWallet = (wallet) => {
  return {
    type: ActionTypes.SET_MONITOR_WALLET,
    wallet: wallet,
  };
};

export const setWalletBalance = (balance) => {
  return {
    type: ActionTypes.SET_WALLET_BALANCE,
    balance: balance,
  };
};
