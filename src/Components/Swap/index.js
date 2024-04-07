import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useThemeSwitcher } from "react-css-theme-switcher";

const Swap = ({ monitored_wallet }) => {
  const [count, setCount] = useState(1);
  const { currentTheme } = useThemeSwitcher();

  useEffect(() => {
    if (count < 4) {
      setCount(count + 1);
    }
  }, [count]);

  if (count % 2 === 1) return null;
  return (
    <div className="page-content">
      <div className="main-wrapper">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card" style={{ height: "95%" }}>
              <div className="card-body">
                <div className="d-flex" style={{ alignItems: "center" }}>
                  <h5 className="card-title" style={{ flex: 1 }}>
                    Swap Tokens
                  </h5>
                </div>
                <div className="card">
                  <iframe
                    src={`https://app.uniswap.org/#/swap?theme=${
                      currentTheme === "dark" ? "dark" : "light"
                    }&exactField=output&exactAmount=1&inputCurrency=ETH`}
                    height="96%"
                    width="100%"
                    title="Uniswap"
                    style={{
                      border: 0,
                      margin: "0 auto",
                      display: "block",
                      borderRadius: "20px",
                      maxWidth: "1000px",
                      minWidth: "800px",
                      minHeight: "600px",
                    }}
                    id="myId"
                  />
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

export default connect(mapStateToProps)(Swap);
