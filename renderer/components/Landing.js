import React from 'react';
import { Typography, Select, Button } from 'antd';
import { MetaMaskSDK } from '@metamask/sdk';
import { ethers } from 'ethers';

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
  injectProvider: false,
  communicationLayerPreference: 'webrtc',
  dappMetadata: {name: "My Dapp", url: "http://localhost:8000"}
};

const Home = ({ network, setNetwork, setWalletAddress, setProvider, setSigner }) => {

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
    </center>
  )
}

export default Home;