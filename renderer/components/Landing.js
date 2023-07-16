import React from 'react';
import { Typography, Select, Button } from 'antd';
import { MetaMaskSDK } from '@metamask/sdk';

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
};

const Home = ({ network, setNetwork }) => {

  const handleChange = (value) => {
    setNetwork(value);
  }

  const loginWithMetaMask = () => {
    const MMSDK = new MetaMaskSDK(options);

    const ethereum = MMSDK.getProvider();
    ethereum.request({ method: 'eth_requestAccounts', params: [] });
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