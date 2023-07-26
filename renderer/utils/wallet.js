import { ethers } from 'ethers';
import { NETWORK } from '../network';

export const sendETH = async (to, amount, walletAddress, signer, messageApi, network) => {
  const connection = new ethers.providers.JsonRpcProvider(NETWORK[network].rpc);
  const gasPrice = await connection.getGasPrice();
  
  const tx = {
    from: walletAddress,
    to: to,
    value: ethers.utils.parseUnits(amount, "ether"),
    gasPrice: gasPrice,
    gasLimit: ethers.utils.hexlify(100000),
    nonce: await connection.getTransactionCount(
      walletAddress,
      "latest"
    )
  }

  const transaction = await signer.sendTransaction(tx);
  const data = await transaction.wait();
  
  messageApi.open({
    type: 'success',
    content: `Send ${amount} ${NETWORK[network].tokenSymbol} success`,
    duration: 20,
  });

  return data;
}