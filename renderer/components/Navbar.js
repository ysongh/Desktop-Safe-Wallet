import { Layout, Tag, Button } from 'antd';

const { Header } = Layout;

const Navbar = ({ networkName }) => {
  return (
    <Header className="header" style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>Welcome</h1>
      <Tag color="purple">{networkName}</Tag>
      <Button type="primary">Logout</Button>
    </Header>
  )
}

export default Navbar;