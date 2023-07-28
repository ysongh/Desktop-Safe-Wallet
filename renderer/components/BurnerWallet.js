import { useState } from 'react';
import { Button, Typography } from 'antd';

import { createWallet } from '../utils/wallet';

const BurnerWallet = ({ provider }) => {
  const [address, setAddress] = useState();
  const [mnemonic, setMnemonic] = useState();
  const [privateKey, setPrivateKey] = useState();

  const createBurnerWallet = () => {
    const wallet = createWallet(provider);
    console.log(wallet);
    setAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
    setPrivateKey(wallet.privateKey);
  }
  
  return (
    <>
      <Typography.Title level={2}>
        Create Burner Wallet
      </Typography.Title>
    
      <Button onClick={createBurnerWallet}  type="primary">
        Create
      </Button>

      <br />
      <br />

      <p>{address}</p>
      <p>{mnemonic}</p>
      <p>{privateKey}</p>
    </>
  )
}

export default BurnerWallet;