import { useState } from 'react';
import { Button, Typography } from 'antd';

const BurnerWallet = () => {
  const [address, setAddress] = useState();
  const [mnemonic, setMnemonic] = useState();
  const [privateKey, setPrivateKey] = useState();

  const createBurnerWallet = () => {

  }
  
  return (
    <>
      <Typography.Title level={2}>
        Create Burner Wallet
      </Typography.Title>
    
      <Button onClick={createBurnerWallet}  type="primary">
        Create
      </Button>
    </>
  )
}

export default BurnerWallet;