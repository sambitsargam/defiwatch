import * as ActionTypes from '../ActionTypes';

const initState = {
  gasPrice: 0,
  isLoading: false,
  message: '',
};

const utilsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.GAS_PRICE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.GAS_PRICE_SUCCESS:
      return {
        ...state,
        gasPrice: action.gasPrice,
        isLoading: false,
      };

    case ActionTypes.GAS_PRICE_FAILED:
      return {
        ...state,
        message: action.message,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default utilsReducer;
