import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import useAxios from 'axios-hooks';
import { toggleLoading } from '../../Store/actionCreatos/auth';
import NewsTransitionGroup from './NewsTransitionGroup';
import Loading from '../Loading';
import { useWeb3React } from '@web3-react/core';

const LongBox = ({
  url,
  refetchInterval,
  toggleLoading,
  isDataLoading,
  height = '573px',
}) => {
  const { account } = useWeb3React();
  const [data, setData] = useState([]);

  const [{ data: apiData, loading: isLoading, error }, refetch, cancelRequest] =
    useAxios({
      url: url,
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
  }, [account, cancelRequest, refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, refetchInterval);
    return () => {
      clearInterval(interval);
    };
  }, [refetch, refetchInterval]);

  useEffect(() => {
    if (apiData) {
      setData(apiData);
      toggleLoading(false);
    }
  }, [apiData, toggleLoading]);

  const shouldDisplay = useMemo(
    () => !isLoading && !error && !isDataLoading && apiData,
    [isLoading, error, isDataLoading, apiData]
  );

  return (
    <div className="col-sm-6 col-xl-4 ">
      <div className="card stat-widget ">
        <div
          className="card-body"
          style={{
            height: height,
            padding: '20px',
          }}
        >
          <div
            className="card-body-header"
            style={{
              position: 'sticky',
              top: 0,
              height: '10%',
              padding: '10px',
            }}
          >
            <h5 className="card-title">News & Updates</h5>
          </div>
          {(isLoading || isDataLoading) && !error && <Loading />}
          {error && (
            <p>
              There seems to be some problem while fetching the data. Please try
              again.
            </p>
          )}
          <div
            style={{
              height: '90%',
              overflow: 'hidden scroll',
            }}
          >
            {shouldDisplay && data.results && (
              <NewsTransitionGroup data={data.results} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isDataLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoading: (isLoading) => {
    dispatch(toggleLoading(isLoading));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LongBox);
