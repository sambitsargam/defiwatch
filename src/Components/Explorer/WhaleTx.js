import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWhaleTx } from "../../Store/actionCreatos/covalent";
import Image from "../../Utils/CoinImage";
import { showAlert } from "../../Utils/Alert";

const WhaleTx = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchWhaleTx()).then((res) => {
      if (!res.error) {
        setData(res.data);
      } else {
      }
    });
  }, [dispatch]);

  return (
    <div className="col-md-12 col-lg-12">
      <div className="card table-widget" style={{ height: "95%" }}>
        <div className="card-body">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h5 className="card-title" style={{ flex: 1 }}>
              Whale Transactions in last week
            </h5>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="bold-header">
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Sender</th>
                  <th scope="col">Receiver</th>
                  <th scope="col">Coin</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>
                      <span className="badge bg-info">
                        {item.transaction_type}
                      </span>
                    </td>
                    <td>{item.from_address}</td>
                    <td>{item.to_address}</td>
                    <td>
                      <Image contract_ticker_symbol={item?.symbol} />
                      {item.symbol}
                    </td>
                    <td>${item.format_amount_usd}</td>
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

export default WhaleTx;
