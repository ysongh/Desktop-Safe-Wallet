import { useState, useEffect } from 'react';
import { Layout, Menu, message } from 'antd';
import { NETWORK } from '../network';

import 'antd/dist/reset.css';
import Navbar from '../components/Navbar';
import Overview from '../components/Overview';
import Receive from '../components/Receive';
import TransferForm from '../components/TransferForm';
import BurnerWallet from '../components/BurnerWallet';
import Landing from '../components/Landing';

const { Content, Sider } = Layout;

const Dashboard = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [network, setNetwork] = useState("");
  const [walletAddress, setWalletAddress] = useState();
  const [balance, setBalance] = useState(0);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  
  const [currentTab, setCurrentTab] = useState("Overview");

  return (
    <>
      { !walletAddress
        ? <Landing
            network={network}
            setNetwork={setNetwork}
            setWalletAddress={setWalletAddress}
            setProvider={setProvider}
            setSigner={setSigner}
            setBalance={setBalance} />
        : <Layout>
          <Navbar networkName={NETWORK[network]?.networkName} setWalletAddress={setWalletAddress} />
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
                <Menu.Item key="BurnerWallet">
                  Burner Wallet
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
                {currentTab === "Overview" && <Overview network={network} walletAddress={walletAddress} balance={balance} />}
                {currentTab === "Send" && <TransferForm balance={balance} messageApi={messageApi} walletAddress={walletAddress} signer={signer} network={network} />}
                {currentTab === "Receive" && <Receive walletAddress={walletAddress} />}
                {currentTab === "BurnerWallet" && <BurnerWallet provider={provider} />}
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
