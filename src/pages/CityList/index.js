import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Toast } from "antd-mobile";
import { List, AutoSizer } from "react-virtualized";
import axios from "axios";
import { baseUrl } from "../../assests/constant";
import "./index.less";
import "react-virtualized/styles.css";

const TITLE_HEIGHT = 36;
const NAME_HEIGHT = 50;

const VirtualizedList = (props) => {
  const { cityList, cityIndex, width, height, getActiveIndex, activeIndex, cityListComponent } = props;
  const infos = ["北京", "上海", "广州", "深圳"];

  function calcHeight({ index }) {
    return cityList[cityIndex[index]].length * NAME_HEIGHT + TITLE_HEIGHT;
  }

  const navigate = useNavigate();
  function changeCity(label) {
    if (infos.includes(label)) {
      navigate("/home", { 
        state: {
          activeCity: label
        }
      });
    } else {
      Toast.show({
        content: "当前城市无房源"
      })
    }
  }

  function rowRenderer({
    key, index,
    isScrolling,  // 当前项是否在滚动中
    isVisible,    // 当前项是否可见
    style
  }) {
    return (
      <div key={key} style={style}>
        <div className="citylist_title">{cityIndex[index]}</div>
        {cityList[cityIndex[index]].map(item => (
          <div
            className="citylist_name"
            key={item.value}
            onClick={() => changeCity(item.label)}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  function onRowsRendered({
    startIndex
  }) {
    getActiveIndex(startIndex);
  }

  return (
    <List
      ref={cityListComponent}
      width={width}
      height={height}
      rowCount={cityIndex.length}
      rowHeight={calcHeight}
      rowRenderer={rowRenderer}
      onRowsRendered={onRowsRendered}
      scrollToAlignment="start"   // 保证点击项出现在页面最顶部
    />
  );
};

const CityPage = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/home");
  };

  const [citylist, setCitylist] = useState([]);
  const [activeIndex, setActiveIndex] = useState("a"); 

  useEffect(() => {
    getCitylist()
  }, []);

  async function getCitylist() {
    const res = await axios.get(`${baseUrl}/area/city`, {
      params: {
        level: 1
      }
    });
    setCitylist(res.data.body);
  }

  const formatCitylist = {};
  let formatIndex = [];
  if (citylist.length) {
    citylist.forEach(item => {
      let first = item.pinyin.slice(0, 1);
      if (formatCitylist.hasOwnProperty(first)) {
        formatCitylist[first].push(item);
      } else {
        formatCitylist[first] = [item];
      }
    });
    formatIndex = Object.keys(formatCitylist).sort();
  }

  let isReady = false;
  const cityListComponent = React.createRef();

  function changeActiveIndex(e) {
    if (!isReady) {
      cityListComponent.current.measureAllRows();
      isReady = true;
    }

    let cur = e.target.innerHTML;
    if (cur !== activeIndex) {
      setActiveIndex(cur);
      // 点击索引 页面跳转到对应位置
      cityListComponent.current.scrollToRow(formatIndex.indexOf(cur));
    }
  }

  function getActiveIndex(scrollIndex) {
    if (scrollIndex !== activeIndex) {
      setActiveIndex(formatIndex[scrollIndex]);
    }
  }

  return (
    <div className="citylist">
      <NavBar
        className="citylist_navbar"
        back="返回" onBack={backToHome}
        style={{ "--border-bottom": "1px #eee solid" }}>
        城市选择
      </NavBar>
      <AutoSizer>
        {
          ({ width, height }) =>
            <VirtualizedList
              cityList={formatCitylist} cityIndex={formatIndex}
              width={width} height={height}
              getActiveIndex={getActiveIndex}
              activeIndex={activeIndex}
              cityListComponent={cityListComponent}
            />
        }
      </AutoSizer>

      <ul className="citylist_index">
        {formatIndex.map(item => (
          <li
            key={item}
            className={`citylist_index_item ${activeIndex === item ? "active" : ""}`}
            onClick={(e) => changeActiveIndex(e)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default CityPage;