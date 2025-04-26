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
import clothingDataTypes from "./allClothingTypes.json"

function ReviewSidebar(){
  const { globalVariable, setGlobalVariable } = useReviewGlobalContext();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const [gender, setgender] = useState(null);
  const [clothingType, setclothingType] = useState(null);
  const [searchType, setsearchType] = useState(null);
  const [aboveStar, setaboveStar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [searchChanged, setsearchChanged] = useState(false)
  const [clothingData, setclothingData] = useState({})

  useEffect(() => {
    setclothingData(clothingDataTypes)
    console.log("clothing data just set")
  }, clothingDataTypes)

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

  const items = [
    "Hoodie", "T-Shirt", "Sweater", "Jeans", "Joggers", 
    "Shorts", "Jacket", "Coat", "Sneakers", "Boots", 
    "Sandals", "Backpack", "Hat", "Scarf"
  ]

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchItemClick = (item) => {
    setSearchTerm(item); // Fills search box with clicked item
    setsearchChanged(false)
  };


  function autogenAllClothingOptions(genderinput){
    console.log("what is object.keys trying to parse: ", clothingData)
    console.log("what is gender input? ", genderinput)
    const allkeys = Object.keys(clothingDataTypes[genderinput])
    console.log("all keys: ", allkeys)
    return(
      <>
        {allkeys.map((key) => (
          <SubMenu defaultClose label={key}>
            {clothingDataTypes[genderinput][key].map((item) => (
              <MenuItem>{item}</MenuItem>
            ))}
          </SubMenu>
        ))}
      </>
    )
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
            <SubMenu defaultClose label={"Men"}>
              {clothingData == {} ? (<MenuItem defaultClose label={"Loading"}></MenuItem>) : autogenAllClothingOptions("male")}
            </SubMenu>

            <SubMenu defaultClose label={"Women"}>
              {/* <MenuItem icon={Genderset("female")} onClick={() => gender == "female" ? setgender(null) : setgender("female")} className='menustyling'>Women </MenuItem> */}
              {clothingData == {} ? (<MenuItem defaultClose label={"Loading"}></MenuItem>) : autogenAllClothingOptions("female")}
            </SubMenu>

            <SubMenu defaultClose label={"Clothing Types"} >
              <MenuItem icon={clothingset("Top")} onClick={() => clothingType == "Top" ? setclothingType(null) : setclothingType("Top")} className='menustyling'>Tops </MenuItem>
              <MenuItem icon={clothingset("Bottom")} onClick={() => clothingType == "Bottom" ? setclothingType(null) : setclothingType("Bottom")} className='menustyling'>Bottoms </MenuItem>
              <MenuItem className='search-item-style'>
                <div>
                  <input
                    type="text"
                    placeholder="Specific Search"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value); setsearchChanged(true)}}
                  />
                  {searchTerm != "" && searchChanged && (
                    <ul>
                      {filteredItems.map((item, index) => (
                        <li key={index} onClick={() => handleSearchItemClick(item)}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                </div>
                
              </MenuItem>
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