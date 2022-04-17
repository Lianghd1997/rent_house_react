import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SearchBar } from 'antd-mobile';
import axios from 'axios';
import { baseUrl } from "../../assests/constant"
import {
  EnvironmentOutline,
  UserAddOutline,
  CompassOutline,
  PayCircleOutline,
} from 'antd-mobile-icons';
import "./index.less";

const SearchBox = () => {
  return (
    <SearchBar
      className="search_box"
      placeholder="请输入内容"
    />
  );
}

const SwiperCard = () => {
  const [swipers, setSwipers] = useState([]);
  useEffect(() => {
    getSwipers();
  }, []);

  // 获取轮播图数据
  async function getSwipers() {
    const res = await axios.get(`${baseUrl}/home/swiper`);
    setSwipers(res.data.body);
  }

  // 渲染轮播图结构
  const swiperItems = swipers.map(item => (
    <Swiper.Item key={item.id} >
      <div className="swiper_content">
        <img
          className="swiper_img"
          src={`${baseUrl}${item.imgSrc}`}
          alt={item.alt}
        />
      </div>
    </Swiper.Item>
  ));

  return (
    <Swiper
      autoplay loop
      autoplayInterval={2000}>
      {swiperItems}
    </Swiper>
  );
}

const NavMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "整租", icon: <EnvironmentOutline />, pathname: "/home/search" },
    { name: "合租", icon: <UserAddOutline />, pathname: "/home/search" },
    { name: "地图找房", icon: <CompassOutline /> },
    { name: "出租", icon: <PayCircleOutline /> }
  ];

  const redirectToList = pathname => {
    navigate(pathname);
  }

  return (
    <div className="nav_menu">
      {menuItems.map(item => (
        <div
          className="nav_menu_item"
          key={item.name}
          onClick={() => { item.pathname && redirectToList(item.pathname) }}>
          <div style={{ fontSize: 24 }}>
            {item.icon}
          </div>
          <span className="nav_menu_text">{item.name}</span>
        </div>
      ))}
    </div>
  )
};

const HomePage = () => {
  return (
    <React.Fragment>
      <SearchBox />
      <SwiperCard />
      <NavMenu />
    </React.Fragment>
  );
}

export default HomePage;