import React from 'react';
import { connect } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import PortfolioGrowth from './PortfolioGrowth';
import WalletChart from './WalletChart';
import LongBox from './LongBox';
import Holdings from './Holdings';
import Transactions from './Transactions';

const Dashboard = ({ wallet_balance, monitored_wallet }) => {
  const { account } = useWeb3React();

  return (
    <div className="page-content">
      <div className="main-wrapper">
        <div className="row">
          <PortfolioGrowth
            title="Portfolio Growth"
            address={monitored_wallet.length > 0 ? monitored_wallet : account}
          />
          <WalletChart
            title="Wallet Balance"
            data={`$${wallet_balance.toFixed(2)}`}
            address={monitored_wallet.length > 0 ? monitored_wallet : account}
          />
        </div>
        <div className="row">
          <Holdings
            title="Current Holdings"
            refetchInterval={300000}
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
            height="440px"
          />
          <Transactions
            reqBody={{
              address: monitored_wallet.length > 0 ? monitored_wallet : account,
            }}
            height="440px"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  wallet_balance: state.wallet.balance,
  monitored_wallet: state.wallet.monitored_wallet,
});

export default connect(mapStateToProps)(Dashboard);
