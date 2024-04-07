import axios from 'axios';
import * as ActionTypes from '../ActionTypes';

const COVALENT_URL = 'https://api.covalenthq.com/v1';
const APIKEY= 'cqt_rQGjyBRhD8P7hHyCy936CM3x3Try';


export const fetchPortfolio = (chainId, address) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.PORTFOLIO_BALANCE_REQUEST });
    return await axios
      .get(
        `${COVALENT_URL}/${chainId}/address/${address}/portfolio_v2/?quote-currency=USD&format=JSON&key=${APIKEY}`
      )
      .then((response) => {
        if (response.status === 200) {
          const value = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
          ];
          try {
            for (let i = 0; i < response.data.data.items.length; i++) {
              for (let j = 0; j < 30; j++) {
                const itemPrice =
                  response.data.data.items[i].holdings[j].close.quote;
                value[j] += itemPrice;
              }
            }
          } catch (err) {
            console.error(err);
          }
          dispatch({
            type: ActionTypes.PORTFOLIO_BALANCE_SUCCESS,
            high: value[0],
            low: value[29],
          });
          return { error: false, data: value.reverse() };
        }
        return { error: true };
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.PORTFOLIO_BALANCE_FAILED,
          message: 'Something went wrong. Please try again',
        });
        return { error: true };
      });
  };
};

export const fetchWhaleTx = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.WHALE_TX_REQUEST });
    const date = new Date();
    const cla = '60d943694cf64cc0608ec80b20b1b165';
    date.setDate(new Date().getDate() - 7);
    return await axios
      .get(
        `https://api.clankapp.com/v2/explorer/tx?s_amount_usd=desc&size=10&%3E_amount=1000000&%3E_date=${
          date.toISOString().split('.')[0]
        }&api_key=${cla}`
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.WHALE_TX_SUCCESS,
          });
          return { error: false, data: response.data.data };
        }
        dispatch({
          type: ActionTypes.WHALE_TX_FAILED,
        });
        return { error: true };
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.WHALE_TX_FAILED,
          message: 'Something went wrong. Please try again',
        });
        return { error: true };
      });
  };
};

export const fetchNFTDetails = (chainId) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.NFT_DETAILS_REQUEST });
    return await axios
      .get(
        `https://api.covalenthq.com/v1/${chainId}/nft_market/?key=${APIKEY}&page-size=10`
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: ActionTypes.NFT_DETAILS_SUCCESS,
          });
          return { error: false, data: response.data.data.items };
        }
        dispatch({
          type: ActionTypes.NFT_DETAILS_FAILED,
        });
        return { error: true };
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.NFT_DETAILS_FAILED,
          message: 'Something went wrong. Please try again',
        });
        return { error: true };
      });
  };
};
