import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CityList from "./pages/CityList";

function App() {
  return (
    <Router initialEntries={['/home']}>
      <div className="app">
        {/* 配置导航菜单 */}
        <ul>
          <li>
            <Link to="/home/index">首页</Link>
          </li>
          <li>
            <Link to="/citylist">城市列表</Link>
          </li>
        </ul>

        {/* 配置路由 */}
        <Routes>
          <Route path="/home/*" element={<Home />}></Route>
          <Route path="/citylist" element={<CityList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
