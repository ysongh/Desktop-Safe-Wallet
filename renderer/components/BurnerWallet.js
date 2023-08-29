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
    <div style={{ marginTop: "7rem" }}>
      <Typography.Title level={2}>
        Create Burner Wallet
      </Typography.Title>
    
      <Button onClick={createBurnerWallet}  type="primary">
        Create
      </Button>

      <br />
      <br />

      {address && <p style={{ textDecoration: "underline"}}>Address</p>}
      <p>{address}</p>
      {mnemonic && <p style={{ textDecoration: "underline"}}>Mnemonic</p>}
      <p>{mnemonic}</p>
      {privateKey && <p style={{ textDecoration: "underline"}}>Private Key</p>}
      <p>{privateKey}</p>
    </div>
  )
}

export default BurnerWallet;