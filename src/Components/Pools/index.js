import React from 'react';
import { connect } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import PairPool from './PairPool';

const Pools = ({ monitored_wallet }) => {
  const { account } = useWeb3React();

  return (
    <div className="page-content">
      <div className="main-wrapper">
        <div className="row">
          <PairPool
            title={'Pool analytics'}
            refetchInterval={30000}
            reqBody={{
              address: monitored_wallet.length > 0 ? monitored_wallet : account,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  monitored_wallet: state.wallet.monitored_wallet,
});

export default connect(mapStateToProps)(Pools);
