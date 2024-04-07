import React, { useEffect } from 'react';
import { TrendingDown, TrendingUp } from 'react-feather';
import { connect, useDispatch } from 'react-redux';
import { fetchPortfolio } from '../../Store/actionCreatos/covalent';

const PortfolioGrowth = ({ title, chainId, address, portfolio }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPortfolio(chainId, address));
  }, [chainId, address, dispatch]);

  const calculateGrowth = () => {
    const high = portfolio[0];
    const low = portfolio[1];

    const growth = (high - low) / low;
    return Math.round(growth * 100);
  };

  const growth = calculateGrowth();

  return (
    <div className="col-xl-3 col-md-6">
      <div className="card" style={{ height: '12rem' }}>
        <div className="card-body">
          <h5 className="card-title mb-4">{title}</h5>
          <div className="w-100 d-flex align-items-center">
            <h2 style={{ marginRight: '10px' }}>{growth}%</h2>
            {growth > 0 ? (
              <TrendingUp color="green" />
            ) : (
              <TrendingDown color="red" />
            )}
          </div>
          <p>For last month</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chainId: state.auth.chainId,
  portfolio: state.covalent.portfolio,
});

export default connect(mapStateToProps)(PortfolioGrowth);
