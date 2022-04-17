import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { TabBar } from "antd-mobile";
import {
  AppOutline,
  ContentOutline,
  EnvironmentOutline,
  UserOutline,
} from 'antd-mobile-icons';

const TabBarButtom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = value => {
    navigate(value);
  };

  const tabItems = [
    {
      key: '/home/index',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/home/search',
      title: '找房',
      icon: <EnvironmentOutline />,
    },
    {
      key: '/home/news',
      title: '资讯',
      icon: <ContentOutline />,
    },
    {
      key: '/home/profile',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabItems.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default TabBarButtom;