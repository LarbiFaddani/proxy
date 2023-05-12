import React from 'react';
import {useState} from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  NotificationOutlined,
  DollarOutlined,
  ClusterOutlined,
  DesktopOutlined,
  EnvironmentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { MenuProps, theme } from 'antd';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Business from './Business/business';
import PlacementManagement from './Placement/placement';
import Schedule from './Schedule/shedule';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
// import CampaignTable from './campaign/campaignForm'
import BusinessTypeManagement from './businessType/businessType';
import Params from './parametres/parameters';
import BusinessActivities from './businessActivity/businessActivity';
const logo = require("./../../../assests/images/logo.png");
const { Content, Sider } = Layout;

const items: MenuProps['items'] = [
  { name: "Businesses", icon: ShopOutlined, path: "/" },
  { name: "Placements", icon: DesktopOutlined, path: "/placements" },
  { name: "Schedule", icon: ClockCircleOutlined, path: "/schedules" },
  { name: "Advertisers", icon: NotificationOutlined, path: "/advertisers" },
  { name: "Locations", icon: EnvironmentOutlined, path: "/locations" },
  { name: "Campaigns", icon: VideoCameraOutlined, path: "/campaigns" },
  { name: "Business types", icon: ClusterOutlined, path: "/types" },
  { name: "Business activities", icon: AppstoreOutlined, path: "/activities" },
  { name: "Parameters", icon: DollarOutlined, path: "/parameters" },
  { name: "Tracking", icon: BarChartOutlined, path: "/tracking" },
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: <Link to={item.path}>{item.name}</Link>
}));
const LayoutApp: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          {!isFullscreen?
          <Link to="/">
              <img src={logo} alt="logo" style={{ width: '180px', height: '60px' , margin: 10}}/>
          </Link>
          :<Link to="/">
              <img src={logo} alt="logo" style={{ width: '60px', height: '60px' , margin: 10}}/>
          </Link>}
          
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft:isFullscreen? 75 : 200}}>
          <Header style={{ padding: 0, background: colorBgContainer , marginLeft:"500"}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => {
                setCollapsed(!collapsed);
                setIsFullscreen(!isFullscreen);
              },
            })}
          </Header>
          <Content
            style={{
              height: '100%',
            }}
          >
            <Routes>
              <Route path="/" element={<Business />} /> 
              <Route path="/placements" element={<PlacementManagement />} />
              <Route path="/schedules" element={<Schedule />} /> 
              <Route path="/types" element={<BusinessTypeManagement/>} />
              {/* <Route path="/campaigns" element={<CampaignTable/>} /> */}
              <Route path="/activities" element={<BusinessActivities/>}/>
              <Route path="/Parameters" element={<Params/>} />
              {/* <Route path="Locations" element={} */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
export default LayoutApp;
