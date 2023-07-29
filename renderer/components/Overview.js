import { Tag, Typography } from 'antd';

import { NETWORK } from '../network';

const Overview = ({ network, balance, walletAddress }) => {
  return (
    <div>
      <Typography.Title level={2}>
        Overview
      </Typography.Title>
      <Tag color="purple" style={{ marginBottom: '1rem' }}>{NETWORK[network]?.networkName}</Tag>
      <a href={`${NETWORK[network]?.explorer}/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">{walletAddress}</a>
      <p>{balance / 10 ** 18} {NETWORK[network]?.tokenSymbol}</p>
    </div>
  )
}

export default Overview;