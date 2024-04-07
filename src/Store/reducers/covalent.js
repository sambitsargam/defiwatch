import * as ActionTypes from '../ActionTypes';

const initState = {
  portfolio: [1, 1],
};

const covalentReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.PORTFOLIO_BALANCE_SUCCESS:
      const tempPortfolio = [1, 1];
      if (action.high > 0) {
        tempPortfolio[0] = action.high;
      }
      if (action.low > 0) {
        tempPortfolio[1] = action.low;
      }
      return {
        ...state,
        portfolio: tempPortfolio,
      };

    default:
      return state;
  }
};

export default covalentReducer;
