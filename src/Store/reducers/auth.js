import * as ActionTypes from '../ActionTypes';

const initState = {
  isLoading: false,
  chainId: 1,
  pool: 'uniswap_v2',
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NETWORK:
      return {
        ...state,
        chainId: action.chainId,
      };

    case ActionTypes.TOGGLE_POOL:
      return {
        ...state,
        pool: action.pool,
      };

    case ActionTypes.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

export default authReducer;
