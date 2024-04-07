import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchPortfolio } from '../../Store/actionCreatos/covalent';
import SmallChart from '../../Utils/SmallChart';

const WalletChart = ({ title, data, chainId, address }) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState('#FF1654');
  const [series, setSeries] = useState([
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
  ]);
  useEffect(() => {
    dispatch(fetchPortfolio(chainId, address))
      .then((response) => {
        if (!response.error) {
          setSeries([{ data: response.data }]);
          if (response.data[0] > response.data[29]) {
            setColor('#FF1654');
          } else {
            setColor('#00C853');
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [chainId, address, dispatch]);

  return (
    <div className="col-xl-9 col-md-12">
      <div className="card stat-widget box-portfolio-value">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="dashboard-portfolio-card">
            <h3 className="dashboard-portfolio-card-heading">{data}</h3>
            <SmallChart series={series} color={color} width={460} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chainId: state.auth.chainId,
});

export default connect(mapStateToProps)(WalletChart);
