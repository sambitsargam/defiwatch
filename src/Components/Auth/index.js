import React, { useState } from "react";
import Modal from "../../Utils/Modal";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

import Logo from "../../assets/logo.png";
import WalletModal from "./WalletModal";

const Auth = () => {
  const [isOpen, toggle] = useState(false);

  const handleClick = () => {
    toggle(true);
  };

  const ModalContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 1.6rem 0 1.6rem;
  `;

  const config = {
    supportedChainIds: [1, 56], // 1 - ethereum mainnet, 56 - binance smart chain
    connectors: {
      walletconnect: {
        qrcode: true,
      },
      walletlink: {
        qrcode: true,
      },
    },
  };
  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-12 col-lg-4">
            <div className="card login-box-container">
              <div className="card-body">
                <div className="text-center">
                  <img src={Logo} alt="ValiDefi" width="60%" />
                </div>
                <div className="authent-text">
                  <p>Please connect your wallet</p>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-blue m-b-xs"
                    style={{ color: "#fff" }}
                    onClick={handleClick}
                  >
                    Connect to a wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        width={isMobile ? 85 : 35}
        height={isMobile ? 60 : 80}
        title="Connect to a wallet"
      >
        <ModalContent className="flex-column">
          <WalletModal
            isOpen={isOpen}
            onClose={() => toggle(false)}
            config={config}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Auth;
