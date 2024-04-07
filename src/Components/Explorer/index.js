import React from 'react';
import { connect } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import LongBox from '../Dashboard/LongBox';
import Transactions from '../Dashboard/Transactions';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import WhaleTx from './WhaleTx';
import NftDetail from './NftDetail';

const Explorer = ({ monitored_wallet }) => {
  const { account } = useWeb3React();
  const { currentTheme } = useThemeSwitcher();

  return (
    <div className="page-content">
      <div className="main-wrapper">
        <div className="row">
          <NftDetail
            title={'NFT market analytics'}
            refetchInterval={30000}
            reqBody={{
              address: monitored_wallet.length > 0 ? monitored_wallet : account,
            }}
          />
        </div>
        <div className="row">
          <Transactions
            reqBody={{
              address: monitored_wallet.length > 0 ? monitored_wallet : account,
            }}
          />
          <LongBox
            title="News &#38; Updates"
            url={
              'https://newsdata.io/api/1/news?apikey=pub_59168cf7f92216a344f256a33d01bd77ac86&q=crypto'
            }
            refetchInterval={60000}
            height="573px"
          />
          <div class="col-sm-6 col-xl-4 ">
            <iframe
              src={`https://app.uniswap.org/#/swap?theme=${
                currentTheme === 'dark' ? 'dark' : 'light'
              }&exactField=output&exactAmount=1&inputCurrency=ETH&outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359`}
              height="96%"
              width="100%"
              title="Uniswap"
              style={{
                border: 0,
                margin: '0 auto',
                display: 'block',
                borderRadius: '20px',
                maxWidth: '600px',
                minWidth: '300px',
              }}
              id="myId"
            />
          </div>
        </div>
        <div className="row mt-4">
          <WhaleTx refetchInterval={60000} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  monitored_wallet: state.wallet.monitored_wallet,
});

export default connect(mapStateToProps)(Explorer);
