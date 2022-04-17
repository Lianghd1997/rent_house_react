import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CityList from "./pages/CityList";

function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

function App() {
  return (
    <Router initialEntries={['/home']}>
      <div className="app">
        {/* 配置路由 */}
        <Routes>
          {/* 匹配""/"时 重定向到"/home" */}
          <Route path="/" element={<Redirect to="/home" />}></Route>
          <Route path="/home/*" element={<Home />}></Route>
          <Route path="/citylist" element={<CityList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
