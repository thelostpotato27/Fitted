import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './reviewSidebar.css'
import {useReviewGlobalContext} from './global_context'
import { Outlet, Link } from "react-router"
import React, { useState } from "react";
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



function ReviewSidebar(){
  const { globalVariable, setGlobalVariable } = useReviewGlobalContext();
  function rand(){
    console.log("rand run good")
  }
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return(
    <>
      {/* <Sidebar className="sidebar">
        <Menu menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}>
          <SubMenu label="Charts" active={true} open={1}>
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/home" />} active={true}> Documentation </MenuItem>
          <MenuItem component={rand()} active={true}> Calendar </MenuItem>
        </Menu>
      </Sidebar> */}
      <div>
        <Sidebar
          className={`app ${toggled ? "toggled" : ""}`}
          style={{ height: "100%", position: "absolute" }}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        >
          <main>
            <Menu>
              {collapsed ? (
                <MenuItem
                  icon={<FiChevronsRight />}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<FiChevronsLeft />}
                  onClick={handleCollapsedChange}
                >
                  <div
                    style={{
                      padding: "9px",
                      // textTransform: "uppercase",
                      fontWeight: "bold",
                      fontSize: 14,
                      letterSpacing: "1px"
                    }}
                  >
                    YOUR LOGO!..
                  </div>
                </MenuItem>
              )}
              <hr />
            </Menu>

            <Menu>
              <MenuItem icon={<RiHome4Line />}>Dashboard</MenuItem>
              <SubMenu defaultOpen label={"Professors"} icon={<RiTeamLine />}>
                <MenuItem icon={<RiUserFollowLine />}>Active </MenuItem>
                <MenuItem icon={<RiUserUnfollowLine />}>Ex Professors</MenuItem>
                <MenuItem icon={<RiCalendar2Line />}>Probation Period</MenuItem>
              </SubMenu>
              <SubMenu defaultOpen label={"Records"} icon={<RiFolder2Line />}>
                <MenuItem icon={<RiStackLine />}>Senior Students</MenuItem>
                <MenuItem icon={<RiPlantLine />}>Junior Students</MenuItem>
              </SubMenu>
            </Menu>
          </main>
        </Sidebar>
      </div>
    </>
  )
}

export default ReviewSidebar;