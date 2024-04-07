import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import Select from 'react-select';
import { toggleSidebar } from '../../Store/actionCreatos/settings';
import { toggleNetwork, togglePool } from '../../Store/actionCreatos/auth';
import Logo from '../../assets/logo.png';
import LogoDark from '../../assets/logo-dark.png';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import Loading from '../Loading';
import Gas from '../../assets/gas.svg';
import TextInput from '../../Utils/TextInput';
import { fetchGas } from '../../Store/actionCreatos/utils';
import { isAddress } from '../../Utils';
import { setMonitorWallet } from '../../Store/actionCreatos/wallets';
import { showAlert } from '../../Utils/Alert';

const TopHeader = ({
  isSidebarVisible,
  toggleSidebar,
  chainId,
  toggleNetwork,
  togglePool,
  gasPrice,
  fetchGasPrice,
  setMonitoredWallet,
  monitored_wallet,
}) => {
  const { currentTheme, status } = useThemeSwitcher();
  const [isDarkMode, setDarkMode] = useState(currentTheme === 'dark');
  const { account } = useWeb3React();
  const history = useHistory();

  useEffect(() => {
    setDarkMode(currentTheme === 'dark');
  }, [currentTheme]);

  useEffect(() => {
    fetchGasPrice(chainId);
  }, [chainId, fetchGasPrice]);

  if (status === 'loading') {
    return <Loading />;
  }
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#253345' : '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      color: isDarkMode
        ? state.isSelected
          ? 'rgba(225, 235, 245, 0.87)'
          : 'rgba(225, 235, 245, 0.4)'
        : state.isSelected
        ? 'white'
        : '#5b5b5b',
      backgroundColor: isDarkMode
        ? state.isSelected
          ? '#212d3d'
          : '#253345'
        : state.isSelected
        ? '#7888fc'
        : '#fff',
    }),
  };
  const options = [
    { value: 1, label: 'Ethereum Mainnet' },
    { value: 56, label: 'Binance Smart Chain' },
    { value: 250, label: 'Fantom' },
    { value: 137, label: 'Polygon' },
  ];
  const poolOptionsETH = [
    { value: 'uniswap_v2', label: 'Uniswap' },
    { value: 'sushiswap', label: 'Sushiswap' },
  ];
  const poolOptionsBSC = [
    { value: 'apeswap_v2', label: 'Apeswap' },
    { value: 'moonlift', label: 'Moonlift' },
    { value: 'pancakeswap_v2', label: 'Pancakeswap' },
    { value: 'sushiswap', label: 'Sushiswap' },
    { value: 'empiredex', label: 'Empiredex' },
  ];
  const poolOptionsMATIC = [
    { value: 'apeswap_v2', label: 'Apeswap' },
    { value: 'quickswap', label: 'Quickswap' },
    { value: 'sushiswap', label: 'Sushiswap' },
  ];
  const poolOptionsFANTOM = [
    { value: 'spiritswap', label: 'Spiritswap' },
    { value: 'spookyswap', label: 'Spookyswap' },
    { value: 'sushiswap', label: 'Sushiswap' },
  ];
  const toggle = () => {
    toggleSidebar(!isSidebarVisible);
  };

  const handleSubmit = (wallet) => {
    if (isAddress(wallet)) {
      setMonitoredWallet(wallet);
    } else {
      showAlert('Please enter a valid wallet address', 'error');
    }
  };

  const changeNetwork = (option) => {
    toggleNetwork(option.value);
  };

  const changePool = (option) => {
    togglePool(option.value);
  };

  let poolOptions = [];

  const handleOptions = () => {
    switch (chainId) {
      case 1:
        poolOptions = poolOptionsETH;
        break;
      case 56:
        poolOptions = poolOptionsBSC;
        break;

      case 250:
        poolOptions = poolOptionsFANTOM;
        break;

      case 137:
        poolOptions = poolOptionsMATIC;
        break;

      default:
        break;
    }
  };

  handleOptions();

  return (
    <div className="page-header">
      <nav className="navbar d-flex justify-content-between">
        <div id="navbarNav">
          <ul className="navbar-nav" id="leftNav">
            <li
              className="nav-item nav-link"
              onClick={toggle}
              id="sidebar-toggle"
            >
              <ArrowLeft />
            </li>
            <div className="logo align-items-center">
              <img
                src={isDarkMode ? LogoDark : Logo}
                alt="DeFiWatch"
                height="auto"
                width="100px"
              />
            </div>
          </ul>
        </div>

        <div id="headerNav">
          <ul className="navbar-nav w-100 align-items-center justify-content-end">
            {history.location.pathname === '/pools' && (
              <li
                className="nav-item dropdown dashboard-dropdown"
                style={{ width: '20%' }}
              >
                <Select
                  styles={customStyles}
                  defaultValue={poolOptions[0]}
                  isSearchable={false}
                  onChange={(option) => changePool(option)}
                  options={poolOptions}
                />
              </li>
            )}
            <li
              className="nav-item dropdown m-r-xs dashboard-search"
              style={{ flex: 1 }}
            >
              <div className="d-flex justify-content-center">
                <TextInput handleSubmit={handleSubmit} icon={<Search />} />
              </div>
            </li>
            <li
              className="nav-item dropdown dashboard-dropdown"
              style={{ width: '20%' }}
            >
              <Select
                styles={customStyles}
                defaultValue={options[0]}
                isSearchable={false}
                onChange={(option) => changeNetwork(option)}
                options={options}
              />
            </li>
            <li
              className="nav-item dropdown dashboard-dropdown dashboard-search"
              style={{ width: '20%', marginLeft: '8px' }}
            >
              <div className="d-flex justify-content-center">
                <span
                  className="form-control form-text"
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  {account
                    ? `${account?.slice(0, 8)}...${account?.slice(-3)}`
                    : `${monitored_wallet?.slice(
                        0,
                        8
                      )}...${monitored_wallet?.slice(-3)}`}
                </span>
              </div>
            </li>
            <li
              className="nav-item dropdown dashboard-dropdown dashboard-search"
              style={{ marginLeft: '8px' }}
            >
              <div className="d-flex justify-content-center">
                <span
                  className="form-control form-text"
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  <img src={Gas} alt="Gas Price" width={15} className="mx-1" />
                  {`${
                    Math.round((gasPrice + Number.EPSILON) * 100) / 100
                  } GWei`}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSidebarVisible: state.settings.isSidebarVisible,
  chainId: state.auth.chainId,
  gasPrice: state.utils.gasPrice,
  monitored_wallet: state.wallet.monitored_wallet,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: (isSidebarVisible) => {
    dispatch(toggleSidebar(isSidebarVisible));
  },
  toggleNetwork: (chainId) => {
    dispatch(toggleNetwork(chainId));
  },
  togglePool: (pool) => {
    dispatch(togglePool(pool));
  },
  fetchGasPrice: (chainId) => {
    dispatch(fetchGas(chainId));
  },
  setMonitoredWallet: (wallet) => {
    dispatch(setMonitorWallet(wallet));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
