// import axios from '../axios';
import * as ActionTypes from '../ActionTypes';
// import { url } from '../../Urls';

export const toggleSidebar = (isSidebarVisible) => {
  return {
    type: ActionTypes.TOGGLE_SIDEBAR,
    isSidebarVisible: isSidebarVisible,
  };
};
