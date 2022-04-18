import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SearchBar, Grid } from "antd-mobile";
import axios from "axios";
import { baseUrl } from "../../assests/constant"
import {
  EnvironmentOutline,
  UserAddOutline,
  CompassOutline,
  PayCircleOutline,
  DownFill
} from "antd-mobile-icons";
import "./index.less";

// navigator.geolocation.getCurrentPosition(position => {
//   console.log(position);
// });

const SearchBox = (props) => {
  const navigate = useNavigate();

  return (
    <div className="search_box">
      <div
        className="search_box_citylist"
        onClick={() => { navigate("/citylist") }}>
        <span>{props.activeCity}</span>
        <DownFill fontSize={12} />
      </div>
      <SearchBar
        className="search_box_input"
        placeholder="请输入小区或地址"
        style={{ "--background": "#fff", "--border-radius": "0" }}
        onFocus={() => { navigate("/home/search") }}
      />
    </div>
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
      <div className="swiper">
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
    { name: "地图找房", icon: <CompassOutline />, pathname: "/map" },
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

const Groups = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    const res = await axios.get(`${baseUrl}/home/groups`, {
      params: {
        area: "AREA%7C88cff55c-aaa4-e2e0"
      }
    });
    setGroups(res.data.body);
  }

  const gridItems = groups.map(item => (
    <Grid.Item key={item.id} className="groups_item">
      <div className="groups_intro">
        <div>{item.title}</div>
        <div>{item.desc}</div>
      </div>
      <img src={`${baseUrl}${item.imgSrc}`} alt="" />
    </Grid.Item>
  ));

  return (
    <div className="groups">
      <div className="groups_title">
        <h3>租房小组</h3>
        <h4>更多</h4>
      </div>
      <Grid columns={2} gap={8}>
        {gridItems}
      </Grid>
    </div>
  )
};

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews();
  }, []);

  async function getNews() {
    const res = await axios.get(`${baseUrl}/home/news`, {
      params: {
        area: "AREA%7C88cff55c-aaa4-e2e0"
      }
    });
    setNews(res.data.body);
  }

  const newItems = news.map(item => (
    <div className="news_content" key={item.id}>
      <img src={`${baseUrl}${item.imgSrc}`} alt=""></img>
      <div className="news_desc">
        <h3>{item.title}</h3>
        <div className="news_info">
          <span>{item.from}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="news">
      <h3>最新资讯</h3>
      {newItems}
    </div>
  )
}

const HomePage = () => {
  const { activeCity = "上海" } = useLocation().state;

  return (
    <React.Fragment>
      <SearchBox activeCity={activeCity} />
      <SwiperCard />
      <NavMenu />
      <Groups />
      <News />
    </React.Fragment>
  );
}

export default HomePage;