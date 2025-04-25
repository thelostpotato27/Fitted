import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './reviewSidebar.css'
import {useReviewGlobalContext} from './global_context'
import { Outlet, Link } from "react-router"
import React, { useState, useEffect } from "react";
import {
  RiHome4Line,
  RiTeamLine,
  RiCalendar2Line,
  RiFolder2Line,
  RiUserFollowLine,
  RiPlantLine,
  RiStackLine,
  RiUserUnfollowLine
} from "react-icons/ri";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { BiCheckbox, BiCheckboxChecked  } from "react-icons/bi";


function ReviewSidebar(){
  const { globalVariable, setGlobalVariable } = useReviewGlobalContext();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const [gender, setgender] = useState(null);
  const [clothingType, setclothingType] = useState(null);
  const [searchType, setsearchType] = useState(null);
  const [aboveStar, setaboveStar] = useState(null);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const Genderset = (myVar) => {
    if (gender == myVar){
      return (<BiCheckboxChecked/>)
    }
    return (<BiCheckbox/>)
  }

  const clothingset = (myVar) => {
    if (clothingType == myVar){
      return (<BiCheckboxChecked/>)
    }
    return (<BiCheckbox/>)
  }

  const SearchBy = (myVar) => {
    if (searchType == myVar){
      return (<BiCheckboxChecked/>)
    }
    return (<BiCheckbox/>)
  }

  const StarRating = (myVar) => {
    if (aboveStar == myVar){
      return (<BiCheckboxChecked/>)
    }
    return (<BiCheckbox/>)
  }

  function updateRequest(){
    console.log("update global ran:")
    console.log("Gender: ", gender)
    console.log("clothing type: ", clothingType)
    console.log("search type: ", searchType)
    setGlobalVariable({gender:gender, clothing:clothingType, search:searchType, minstar:aboveStar})
  }

  return(
    <div className="sidebar">
      <Sidebar
        className={`app  ${toggled ? "toggled" : ""}`}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      >
        <main>
          <Menu>
            <div
              style={{
                padding: "9px",
                // textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 20,
                letterSpacing: "1px"
              }}
            >
              Fitted
            </div>
          </Menu>

          <Menu>
            <SubMenu defaultClose label={"Men/Women"}>
              <MenuItem icon={Genderset("M")} onClick={() => gender == "M" ? setgender(null) : setgender("M")} className='menustyling'>Men </MenuItem>
              <MenuItem icon={Genderset("F")} onClick={() => gender == "F" ? setgender(null) : setgender("F")} className='menustyling'>Women </MenuItem>
            </SubMenu>
            <SubMenu defaultClose label={"Clothing Types"} >
              <MenuItem icon={clothingset("T")} onClick={() => clothingType == "T" ? setclothingType(null) : setclothingType("T")} className='menustyling'>Tops </MenuItem>
              <MenuItem icon={clothingset("B")} onClick={() => clothingType == "B" ? setclothingType(null) : setclothingType("B")} className='menustyling'>Bottoms </MenuItem>
            </SubMenu>
            <SubMenu defaultClose label={"Search By"}>
              <MenuItem icon={SearchBy("H")} onClick={() => searchType == "H" ? setsearchType(null) : setsearchType("H")} className='menustyling'>Hot/Trending</MenuItem>
              <MenuItem icon={SearchBy("P")} onClick={() => searchType == "P" ? setsearchType(null) : setsearchType("P")} className='menustyling'>Popular</MenuItem>
              <MenuItem icon={SearchBy("MR")} onClick={() => searchType == "MR" ? setsearchType(null) : setsearchType("MR")} className='menustyling'>Most Reviews</MenuItem>
              <MenuItem icon={SearchBy("HR")} onClick={() => searchType == "HR" ? setsearchType(null) : setsearchType("HR")} className='menustyling'>Highest Rating</MenuItem>
            </SubMenu>
            {/* <SubMenu defaultClose label={"Advanced Search"} >
              <MenuItem icon={StarRating("SR")} onClick={() => aboveStar == "SR" ? setaboveStar(null) : setaboveStar("SR")} className='menustyling'>Above Star rating</MenuItem>
            </SubMenu> */}
            <button onClick={updateRequest} className='updateButton'>Search</button>
          </Menu>
        </main>
      </Sidebar>
    </div>
  )
}

export default ReviewSidebar;