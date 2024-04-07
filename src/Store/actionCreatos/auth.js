import * as ActionTypes from '../ActionTypes';

export const toggleNetwork = (chainId) => {
  return {
    type: ActionTypes.TOGGLE_NETWORK,
    chainId: chainId,
  };
};
export const togglePool = (pool) => {
  return {
    type: ActionTypes.TOGGLE_POOL,
    pool: pool,
  };
};
export const toggleLoading = (isLoading) => {
  return {
    type: ActionTypes.TOGGLE_LOADING,
    isLoading: isLoading,
  };
};
