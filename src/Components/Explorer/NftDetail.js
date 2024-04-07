import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchNFTDetails } from '../../Store/actionCreatos/covalent';

const NftDetail = ({ title, chainId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchNFTDetails(chainId)).then((res) => {
      if (!res.error) {
        setData(res.data);
      }
    });
  }, [dispatch, chainId]);

  return (
    <div className="col-md-12 col-lg-12">
      <div className="card table-widget" style={{ height: '95%' }}>
        <div className="card-body">
          <div className="d-flex" style={{ alignItems: 'center' }}>
            <h5 className="card-title" style={{ flex: 1 }}>
              {title}
            </h5>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="bold-header">
                  <th scope="col">Collection name</th>
                  <th scope="col">Volume of sales(24H)</th>
                  <th scope="col">Total transactions</th>
                  <th scope="col">Total unique wallets</th>
                  <th scope="col">Market price</th>
                  <th scope="col">Max price</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span className="badge bg-info">
                        {item.collection_name}
                      </span>
                    </td>
                    <td>
                      {item.volume_quote_24h
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>

                    <td>
                      {item.transaction_count_alltime
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td>
                      {item.unique_wallet_purchase_count_alltime
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td>
                      $
                      {item.market_cap_quote
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                    <td>
                      $
                      {item.max_price_quote
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chainId: state.auth.chainId,
});

export default connect(mapStateToProps)(NftDetail);
