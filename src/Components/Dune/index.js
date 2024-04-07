import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AnalyticsChart from "../../Utils/AnalyticsChart";

const Dune = ({ monitored_wallet }) => {
  const [data, setData] = useState({ deposited: [] });

  const sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };
  useEffect(() => {
    const fetchAnalytics = async () => {
      const header = {
        "x-dune-api-key": process.env.REACT_APP_DUNE_API_KEY,
      };
      const resp1 = axios.post(
        "https://api.dune.com/api/v1/query/1262797/execute",
        {},
        { headers: header }
      );

      const [resp2] = await Promise.all([resp1]);

      await sleep(60000);

      const response = await axios.get(
        `https://api.dune.com/api/v1/execution/${resp2.data.execution_id}/results`,
        { headers: header }
      );

      if (response.data?.state === "QUERY_STATE_COMPLETED") {
        setData((prev) => ({
          ...prev,
          deposited: response?.data?.result?.rows,
        }));
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="page-content">
      <div className="main-wrapper">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card" style={{ height: "95%" }}>
              <div className="card-body">
                <div className="d-flex" style={{ alignItems: "center" }}>
                  <h5 className="card-title" style={{ flex: 1 }}>
                    On-Chain Analysis
                  </h5>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div
                    className="card"
                    style={{ width: "50%", margin: "0px 5px" }}
                  >
                    <div className="card-body analytics-chart">
                      <h4>Staking Pools Depositors</h4>
                      <table className="dune">
                        <thead>
                          <tr>
                            <th>Entity</th>
                            <th>Deposited ETH</th>
                            <th>Market Share</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.deposited?.map((item) => (
                            <tr>
                              <td>{item.entity}</td>
                              <td>{item.deposited_eth}</td>
                              <td>{item.marketshare}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div
                    className="card"
                    style={{ width: "48%", margin: "0px 5px" }}
                  >
                    {/* <div className="card-body analytics-chart">
                      <AnalyticsChart
                        title={"NFT Marketplaces Volume"}
                        xseries={[
                          {
                            name: "Marine Sprite",
                            data: [44, 55, 41, 37, 22, 43, 21],
                          },
                          {
                            name: "Striking Calf",
                            data: [53, 32, 33, 52, 13, 43, 32],
                          },
                          {
                            name: "Tank Picture",
                            data: [12, 17, 11, 9, 15, 11, 20],
                          },
                          {
                            name: "Bucket Slope",
                            data: [9, 7, 5, 8, 6, 9, 4],
                          },
                          {
                            name: "Reborn Kid",
                            data: [25, 12, 19, 32, 25, 24, 10],
                          },
                        ]}
                        opts={{
                          chart: {
                            type: "bar",
                            height: 350,
                            stacked: true,
                          },
                        }}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  monitored_wallet: state.wallet.monitored_wallet,
});

export default connect(mapStateToProps)(Dune);
