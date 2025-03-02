import { useEffect, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';

import { sendETH } from '../utils/wallet';
import { NETWORK } from '../network';

const TransferForm = ({ walletAddress, messageApi, signer, network }) => {
  const [to, setTo] = useState();
  const [amount, setAmount] = useState();
  const [gas, setGas] = useState();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  // useEffect(() => {
  //   findGasPrice();
  //   findBalance();
  // }, [])
  
  // const findGasPrice = async() => {
  //   const price = await getGasFee();
  //   setGas(price);
  // }

  // const findBalance = async() => {
  //   const tokenAmount = await getBalance(walletAddress);
  //   setBalance(tokenAmount);
  // }

  const handleSubmit = async() => {
    try {
      setLoading(true);
      const tx = await sendETH(to, amount, walletAddress, signer, messageApi, network);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <Typography.Title level={2}>
        Transfer {NETWORK[network].tokenSymbol}
      </Typography.Title>
      <p>Balance {balance / 10 ** 18} {NETWORK[network].tokenSymbol}</p>
      <Form layout="vertical" >
        <Form.Item label="To">
          <Input placeholder="0x0" value={to} onChange={(e) => setTo(e.target.value)} />
        </Form.Item>
        <Form.Item label="Amount">
          <Input placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </Form.Item>

        {gas && <p>Fee: {gas / 10 ** 15} {NETWORK[network].tokenSymbol}</p>}
        
        <Button onClick={handleSubmit} type="primary" disabled={!to || !amount} loading={loading}>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default TransferForm;