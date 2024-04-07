import axios from 'axios';
import * as ActionTypes from '../ActionTypes';

export const fetchGas = (chainId) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GAS_PRICE_REQUEST });
    return await axios
      .get(
        `https://owlracle.info/${
          chainId === 1
            ? 'eth'
            : chainId === 56
            ? 'bsc'
            : chainId === 250
            ? 'ftm'
            : 'poly'
        }/gas`
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.GAS_PRICE_SUCCESS,
            gasPrice: response.data.speeds[1].gasPrice,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.GAS_PRICE_FAILED,
          message: 'Something went wrong. Please try again',
        });
      });
  };
};
