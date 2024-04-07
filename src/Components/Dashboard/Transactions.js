import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import useAxios from 'axios-hooks';
import { toggleLoading } from '../../Store/actionCreatos/auth';
import TransactionTransition from './TransactionTransition';
import Loading from '../Loading';
import { useWeb3React } from '@web3-react/core';

const COVALENT_URL = 'https://api.covalenthq.com/v1';

const Transactions = ({
  reqBody,
  chainId,
  toggleLoading,
  isDataLoading,
  monitored_wallet,
  height = '573px',
}) => {
  const { account } = useWeb3React();
  const [data, setData] = useState([]);

  const [{ data: apiData, loading: isLoading, error }, refetch, cancelRequest] =
    useAxios({
      url: `${COVALENT_URL}/${chainId}/address/${reqBody.address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=cqt_rQGjyBRhD8P7hHyCy936CM3x3Try`,
      method: 'GET',
      timeout: 20000,
    });

  useEffect(() => {
    async function fetchData() {
      await cancelRequest();
      try {
        setData([]);
        await refetch();
      } catch (e) {
        console.error('Please try again');
      }
    }
    fetchData();
  }, [account, monitored_wallet, cancelRequest, chainId, refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  useEffect(() => {
    if (apiData && apiData.data?.items) {
      setData(apiData.data.items);
      toggleLoading(false);
    }
  }, [apiData, toggleLoading]);

  const shouldDisplay = useMemo(
    () => !isLoading && !error && !isDataLoading && apiData,
    [isLoading, error, isDataLoading, apiData]
  );

  return (
    <>
      <div className="col-sm-6 col-xl-4 ">
        <div className="card stat-widget ">
          <div
            className="card-body"
            style={{
              height: height,
              padding: '30px',
            }}
          >
            <div
              className="card-body-header"
              style={{
                position: 'sticky',
                top: 0,
                height: '10%',
                padding: '0px',
              }}
            >
              <h5 className="card-title">Your Transactions</h5>
            </div>
            {(isLoading || isDataLoading) && !error && <Loading />}
            {error && (
              <p>
                There seems to be some problem while fetching the data. Please
                try again.
              </p>
            )}
            <div
              style={{
                height: '90%',
                overflow: 'hidden scroll',
              }}
            >
              {shouldDisplay && data && <TransactionTransition data={data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  chainId: state.auth.chainId,
  isDataLoading: state.auth.isLoading,
  monitored_wallet: state.wallet.monitored_wallet,
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoading: (isLoading) => {
    dispatch(toggleLoading(isLoading));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
