import React, { useState } from 'react';
import DefaultCoin from '../assets/default_coin.png';

const Image = ({ contract_ticker_symbol }) => {
  const [src, setSrc] = useState(
    `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/${contract_ticker_symbol?.toLowerCase()}.webp`
  );
  const onError = () => {
    setSrc(DefaultCoin);
  };
  return <img src={src} alt="Coin" onError={onError} width={30} />;
};

export default Image;
