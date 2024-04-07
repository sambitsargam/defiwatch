import React, { useEffect, useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import useAxios from 'axios-hooks';
import { useDispatch } from 'react-redux';
import { setWalletBalance } from '../../../Store/actionCreatos/wallets';
import { toggleLoading } from '../../../Store/actionCreatos/auth';
import Loading from '../../Loading';
import Item from './Item';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const COVALENT_URL = 'https://api.covalenthq.com/v1';
const APIKEY= 'cqt_rQGjyBRhD8P7hHyCy936CM3x3Try';

const Holdings = ({
  title,
  refetchInterval,
  reqBody,
  toggleLoading,
  isDataLoading,
  chainId,
}) => {
  const dispatch = useDispatch();
  const { currentTheme } = useThemeSwitcher();

  const [ethData, setETHData] = useState([]);
  const [bscData, setBSCData] = useState([]);
  const [ftmData, setFTMData] = useState([]);
  const [maticData, setMATICData] = useState([]);
  const [showValue, setShowValue] = useState('ETH');

  const [
    { data: ETHData, loading: isETHLoading, error: ethError },
    refetchETH,
    cancelRequestETH,
  ] = useAxios({
    url: `${COVALENT_URL}/1/address/${reqBody.address}/balances_v2/?key=${APIKEY}`,
    method: 'GET',
    timeout: 25000,
  });

  const [
    { data: BSCData, loading: isBSCLoading, error: bscError }, 
    refetchBSC,
    cancelRequestBSC,
  ] = useAxios({
    url: `${COVALENT_URL}/56/address/${reqBody.address}/balances_v2/?key=${APIKEY}`,
    method: 'GET',
    timeout: 25000,
  });

  const [
    { data: FTMData, loading: isFTMLoading, error: ftmError },
    refetchFTM,
    cancelRequestFTM,
  ] = useAxios({
    url: `${COVALENT_URL}/250/address/${reqBody.address}/balances_v2/?key=${APIKEY}`,
    method: 'GET',
    timeout: 25000,
  });

  const [
    { data: MATICData, loading: isMATICLoading, error: maticError },
    refetchMATIC,
    cancelRequestMATIC,
  ] = useAxios({
    url: `${COVALENT_URL}/137/address/${reqBody.address}/balances_v2/?key=${APIKEY}`,
    method: 'GET',
    timeout: 25000,
  });

  useEffect(() => {
    async function fetchData() {
      await cancelRequestETH();
      await cancelRequestBSC();
      await cancelRequestFTM();
      await cancelRequestMATIC();
      try {
        setETHData([]);
        setBSCData([]);
        setFTMData([]);
        setMATICData([]);
        await refetchETH();
        await refetchBSC();
        await refetchFTM();
        await refetchMATIC();
      } catch (e) {
        console.error('Please try again');
      }
    }
    fetchData();
  }, [
    reqBody.address,
    cancelRequestBSC,
    cancelRequestETH,
    cancelRequestFTM,
    cancelRequestMATIC,
    refetchBSC,
    refetchETH,
    refetchFTM,
    refetchMATIC,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchETH();
      refetchBSC();
      refetchFTM();
      refetchMATIC();
    }, refetchInterval);
    return () => {
      clearInterval(interval);
    };
  }, [refetchBSC, refetchETH, refetchFTM, refetchInterval, refetchMATIC]);

  const getSum = (total, num) => {
    return total + num;
  };

  useEffect(() => {
    if (ETHData && ETHData.data?.items?.length > 0) {
      ETHData.data?.items.map((item) => item?.quote)?.reduce(getSum, 0);
      setETHData(ETHData);
    }
    if (BSCData && BSCData.data?.items?.length > 0) {
      setBSCData(BSCData);
    }
    if (FTMData && FTMData.data?.items?.length > 0) {
      setFTMData(FTMData);
    }
    if (MATICData && MATICData.data?.items?.length > 0) {
      setMATICData(MATICData);
    }
    toggleLoading(false);
  }, [BSCData, ETHData, FTMData, MATICData, toggleLoading]);

  useEffect(() => {
    let balance = 0;
    if (chainId === 1 && ETHData && ETHData.data?.items?.length > 0) {
      balance =
        balance +
        ETHData.data?.items.map((item) => item?.quote)?.reduce(getSum, 0);
    }
    if (chainId === 56 && BSCData && BSCData.data?.items?.length > 0) {
      balance =
        balance +
        BSCData.data?.items.map((item) => item?.quote)?.reduce(getSum, 0);
    }
    if (chainId === 250 && FTMData && FTMData.data?.items?.length > 0) {
      balance =
        balance +
        FTMData.data?.items.map((item) => item?.quote)?.reduce(getSum, 0);
    }
    if (chainId === 137 && MATICData && MATICData.data?.items?.length > 0) {
      balance =
        balance +
        MATICData.data?.items.map((item) => item?.quote)?.reduce(getSum, 0);
    }
    dispatch(setWalletBalance(balance));
  }, [BSCData, ETHData, dispatch, chainId, FTMData, MATICData]);

  const shouldETHDisplay = useMemo(
    () => showValue === 'ETH' && !isETHLoading && !ethError && !isDataLoading,
    [isETHLoading, ethError, isDataLoading, showValue]
  );
  const shouldBSCDisplay = useMemo(
    () => showValue === 'BSC' && !isBSCLoading && !bscError && !isDataLoading,
    [isBSCLoading, bscError, isDataLoading, showValue]
  );
  const shouldFTMDisplay = useMemo(
    () => showValue === 'FTM' && !isFTMLoading && !ftmError && !isDataLoading,
    [showValue, isFTMLoading, ftmError, isDataLoading]
  );
  const shouldMaticDisplay = useMemo(
    () =>
      showValue === 'POLYGON' &&
      !isMATICLoading &&
      !maticError &&
      !isDataLoading,
    [showValue, isMATICLoading, maticError, isDataLoading]
  );

  const data = [ethData, bscData, ftmData, maticData];
  const shouldValues = [
    shouldETHDisplay,
    shouldBSCDisplay,
    shouldFTMDisplay,
    shouldMaticDisplay,
  ];

  const names = ['ETH', 'BSC', 'FTM', 'POLYGON'];
  return (
    <div className="col-sm-6 col-xl-4 ">
      <div className="card stat-widget ">
        <div
          className="card-body"
          style={{
            height: '440px',
            padding: '30px',
            overflow: 'hidden',
          }}
        >
          <div
            className="card-body-header"
            style={{
              position: 'sticky',
              top: 0,
              minHeight: '10%',
              padding: '0px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h5 className="card-title" style={{ marginBlock: '10px' }}>
              {title}
            </h5>
            <div class="card-header w-100" style={{ padding: '0 0 15px 5px' }}>
              <ul class="nav nav-tabs card-header-tabs d-flex w-100">
                {names.map((name) => (
                  <li class="nav-item">
                    <button
                      onClick={() => setShowValue(name)}
                      className="holdings-tab"
                      style={{
                        backgroundColor:
                          showValue === name
                            ? currentTheme === 'dark'
                              ? '#2b3b52'
                              : '#f3f6f9'
                            : currentTheme === 'dark'
                            ? '#253347'
                            : '#fff',
                      }}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {(isETHLoading ||
            isBSCLoading ||
            isFTMLoading ||
            isMATICLoading ||
            isDataLoading) &&
            !(ethError && bscError) && <Loading />}

          {(ethError || bscError || ftmError || maticError) && (
            <p>
              There seems to be some problem while fetching the data. Please try
              again.
            </p>
          )}
          <div
            style={{
              height: '80%',
              overflow: 'hidden scroll',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.map((ditem, index) => {
              if (shouldValues[index]) {
                return (
                  <TransitionGroup
                    className="todo-list w-100 d-flex mt-1"
                    style={{
                      flexDirection: 'column',
                    }}
                  >
                    {ditem?.data?.items?.length > 0 ? (
                      <>
                        {ditem?.data?.items?.map((item, index) => (
                          <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="item"
                          >
                            <Item item={item} index={index} />
                          </CSSTransition>
                        ))}
                      </>
                    ) : (
                      <p>You don't have any holdings</p>
                    )}
                  </TransitionGroup>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chainId: state.auth.chainId,
  isDataLoading: state.auth.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  toggleLoading: (isLoading) => {
    dispatch(toggleLoading(isLoading));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Holdings);
