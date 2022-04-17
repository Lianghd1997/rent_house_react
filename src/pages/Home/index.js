import React from 'react';
import { Route, Routes } from "react-router-dom";
import Search from "../Search";
import News from "../News";
import Profile from "../Profile";
import TabBarButtom from '../../components/TabBarButtom';
import "./index.css";

export default class Home extends React.Component {

  render() {
    return (
      <React.Fragment>
        {/* 渲染子路由 */}
        <div className="home_content">
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>

        {/* TabBar */}
        <div className="tabbar_buttom">
          <TabBarButtom />
        </div>
      </React.Fragment>
    );
  }
}

