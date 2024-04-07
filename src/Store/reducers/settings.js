import * as ActionTypes from '../ActionTypes';

const initState = {
  isSidebarVisible: true,
};

const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarVisible: action.isSidebarVisible,
      };

    default:
      return state;
  }
};

export default settingsReducer;
