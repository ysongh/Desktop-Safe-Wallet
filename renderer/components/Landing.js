import React from 'react';
import { Typography, Select, Button } from 'antd';
import { MetaMaskSDK } from '@metamask/sdk';
import { ethers } from 'ethers';

import BurnerWallet from './BurnerWallet';

const NETWORK_LIST = [
  {
    value: 'polygon',
    label: 'Polygon Mumbai',
  },
  {
    value: 'chiado',
    label: 'Chiado Testnet',
  }
];

const options = {
  useDeeplink: false,
  communicationServerUrl: 'https://metamask-sdk-socket.metafi.codefi.network/',
  autoConnect: {
    enable: true
  },
  dappMetadata: {name: "My Dapp", url: "http://localhost:8000"},
  logging: {
    developerMode: true,
  },
  storage: {
    enabled: true,
  }
};

const Home = ({ network, setNetwork, setWalletAddress, setProvider, setSigner, setBalance }) => {

  const handleChange = (value) => {
    setNetwork(value);
  }

  const loginWithMetaMask = async () => {
    const MMSDK = new MetaMaskSDK(options);
    const ethereum = MMSDK.getProvider();
    const accounts = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
    setWalletAddress(accounts[0]);
    const provider = new ethers.providers.Web3Provider(ethereum);
    setProvider(provider);
    const signer = provider.getSigner();
    setSigner(signer);

    const balance = await provider.getBalance(accounts[0]);
    setBalance(balance.toString());
  }

  return (
    <center>
      <Typography.Title level={2} style={{ marginTop: '10rem', marginBottom: '2rem' }}>
        Desktop Safe Wallet
      </Typography.Title>
      <Select
        placeholder="Select a Network"
        style={{
          width: 200,
        }}
        onChange={handleChange}
        options={NETWORK_LIST}
      />
      <br />
      <br />
      <Button onClick={loginWithMetaMask} type="primary" size='large' disabled={!network}>
        Login
      </Button>
      <br />
      <br />
      <BurnerWallet />
    </center>
  )
}

export default Home;