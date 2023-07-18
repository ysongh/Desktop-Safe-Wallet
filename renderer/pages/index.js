import { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Tag, message } from 'antd';
import { NETWORK } from '../network';

import 'antd/dist/reset.css';
import Navbar from '../components/Navbar';
import Receive from '../components/Receive';
import TransferForm from '../components/TransferForm';
import Transaction from '../components/Transaction';
import Landing from '../components/Landing';

const { Content, Sider } = Layout;

const Dashboard = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [network, setNetwork] = useState("");
  const [walletAddress, setWalletAddress] = useState();
  const [balance, setBalance] = useState();
  const [safeAuth, setSafeAuth] = useState();
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [userData, setUserData] = useState();
  const [sfSdk, setSfSdk] = useState(null);
  
  const [currentTab, setCurrentTab] = useState("Overview");

  const Overview = () => {
    return (
      <div id='stripe-root'>
        <Typography.Title level={2}>
          Overview
        </Typography.Title>
        <Tag color="purple" style={{ marginBottom: '1rem' }}>{NETWORK[network]?.networkName}</Tag>
        <a href={`${NETWORK[network]?.explorer}/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">{walletAddress}</a>
        <p>{balance / 10 ** 18} {NETWORK[network]?.tokenSymbol}</p>
        {/* <Button onClick={() => createUserWalletToPB("")} type="primary" style={{ marginBottom: '2rem' }}>
          Add Fund
        </Button> */}
      </div>
    )
  }

  return (
    <>
      { !walletAddress
        ? <Landing
            network={network}
            setNetwork={setNetwork}
            setWalletAddress={setWalletAddress}
            setProvider={setProvider}
            setSigner={setSigner} />
        : <Layout>
          <Navbar networkName={NETWORK[network]?.networkName} />
          <Layout>
            <Sider width={150} style={{ backgroundColor: 'white' }}>
              <Menu
                onClick={(e) => setCurrentTab(e.key)}
                selectedKeys={[currentTab]}
                defaultOpenKeys={['Overview']}
                mode="inline"
              >
                <Menu.Item key="Overview">
                  Overview
                </Menu.Item>
                <Menu.Item key="Send">
                  Send
                </Menu.Item>
                <Menu.Item key="Receive">
                  Receive
                </Menu.Item>
                <Menu.Item key="Transaction">
                  Transaction
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  paddingTop: 10,
                  margin: 0,
                  minHeight: 480,
                }}
              >
                {currentTab === "Overview" && <Overview />}
                {currentTab === "Send" && <TransferForm balance={balance} messageApi={messageApi} walletAddress={walletAddress} signer={signer} network={network} />}
                {currentTab === "Receive" && <Receive walletAddress={walletAddress} />}
                {currentTab === "Transaction" && <Transaction />}
              </Content>
            </Layout>
          </Layout>
          {contextHolder}
        </Layout>
      }
    </>
  )
}

export default Dashboard;
