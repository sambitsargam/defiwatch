import React, { useLayoutEffect, useState } from 'react';
import Spinner from '../Loading/Spinner';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateLayout(params) {
  const { active, account } = useWeb3React();
  const { children, ...props } = params;
  const [status, setStatus] = useState('loading');
  const history = useHistory();

  useLayoutEffect(() => {
    if (typeof window !== undefined) {
      if ((active && account) || props.monitored_wallet.length > 0) {
        setStatus('success');
      } else {
        history.push('/login');
      }
    }
  }, [account, active, history, props.monitored_wallet]);
  return (
    <>
      {status === 'success' && React.cloneElement(children, { ...props })}
      {status === 'loading' && (
        <div className="d-flex p-4 justify-content-center align-items-center vw-100 vh-100 position-absolute top-0 left-0">
          <Spinner />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  monitored_wallet: state.wallet.monitored_wallet,
});

export default connect(mapStateToProps)(PrivateLayout);
