import { useState, useEffect } from 'react';

// styles
import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

// Packages
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import { mainnet, goerli, polygon, polygonMumbai, optimism, arbitrum, zkSync, zkSyncTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { injectedWallet, rainbowWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { usePanelbear } from '@panelbear/panelbear-nextjs';

// Components & local util
import { APP_NAME } from '@/lib/consts';
import useLocalStorage from '@/lib/useLocalStorage';
import Header from '@/components/Header';

// Debug Note: infinte loop from ethersjs if this value does not exist
const alchemyId = process.env['NEXT_PUBLIC_ALCHEMY_ID'];

const App = ({ Component, pageProps }) => {
	const { getItem, setItem } = useLocalStorage();
	const [autoConnectEnabled, setAutoConnectEnabled] = useState(getItem('autoConnectEnabled', 'local') === 'true');
	const [siweSession, setSiweSession] = useState({
		address: null,
		error: null,
	});

	// PanelBear hook
	usePanelbear(process.env.NEXT_PUBLIC_PANEL_BEAR_ID || '', {
		// remove comment to send events on localhost
		// debug: true,
	});

	// apiKey for multiple chains https://github.com/wagmi-dev/wagmi/discussions/597
	const { chains, provider } = configureChains(
		[ polygonMumbai],
		[alchemyProvider({ apiKey: alchemyId }), publicProvider()]
	);

	const connectors = connectorsForWallets([
		{
			appName: APP_NAME,
			groupName: 'Recommended',
			wallets: [injectedWallet({ chains }), rainbowWallet({ chains }), metaMaskWallet({ chains })],
		},
	]);

	// const { connectors } = getDefaultWallets({ appName: APP_NAME, chains });
	const wagmiClient = createClient({ autoConnect: autoConnectEnabled, connectors, provider });

	const fetchSession = async () => {
		try {
			const res = await fetch('/api/me');
			const json = await res.json();
			setSiweSession(x => ({ ...x, address: json.address }));
		} catch (error) {
			setSiweSession(x => ({ ...x, error }));
		}
	};

	// Check if session exists on page load
	useEffect(() => {
		// 1. page loads
		fetchSession();

		// 2. window is focused (in case user logs out of another window)
		// window.addEventListener('focus', fetchSession);
		// return () => window.removeEventListener('focus', fetchSession);
	}, []);

	const props = {
		...pageProps,
		siweSession,
		setSiweSession,
		autoConnectEnabled,
		setAutoConnectEnabled,
		setItem,
	};

	return (
		<ThemeProvider>
			<Toaster />
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<Header siweSession={siweSession} setSiweSession={setSiweSession} />
					<Component {...props} />
				</RainbowKitProvider>
			</WagmiConfig>
		</ThemeProvider>
	);
};

export default App;
