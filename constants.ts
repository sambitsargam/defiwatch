import {
  sepolia,
  scrollSepolia,
  mantleTestnet,
  celoAlfajores,
  filecoinCalibration,
  polygonMumbai,
} from "wagmi/chains";
import { Chain } from "@wagmi/core";

export const chainIdToAddresses: {
  [chainId: number]: {
    DAI: `0x${string}`;
    aDAI: `0x${string}`; 
  };
} = {
  [sepolia.id]: {
    DAI: "0x4fEe0DA6C3B8baEAABFaaa2959bdE62D85074CC6",
    aDAI: "0x0d92849fA073415297f25adEC0112Fa80abCf89A",
  },
  [scrollSepolia.id]: {
    DAI: "0xfA91c4C5C12C18ed73E5DD8eE3Ddcc145e6A67F2",
    aDAI: "0xe3aa62D983E06CE9e098Daf5669395AE1f5B9155",
  },
  [mantleTestnet.id]: {
    DAI: "0x5931CD0bD6AE26623107eA805ed422F878dbc594",
    aDAI: "0x7d459a283fbB1bdf76F682a8e33F22526804D595",
  },
  [celoAlfajores.id]: {
    DAI: "0x5444Ef47042b76178d1C21Ff519f84d7A621d175",
    aDAI: "0x0cA783F57ae475dF23Fb5d2a819cd262f3C3ffbB",
  },
  [filecoinCalibration.id]: {
    DAI: "0x5444Ef47042b76178d1C21Ff519f84d7A621d175",
    aDAI: "0x0cA783F57ae475dF23Fb5d2a819cd262f3C3ffbB",
  },
  [polygonMumbai.id]: {
    DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    aDAI: "0x27F8D03b3a2196956ED754baDc28D73be8830A6e",
  },
};

export const okx1 = {
  id: 43_114,
  name: "OKX1",
  network: "OKX1",
  nativeCurrency: {
    decimals: 18,
    name: "OKX1",
    symbol: "OKX1",
  },
  rpcUrls: {
    public: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
  },
  blockExplorers: {
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;
