import React, {useContext ,useEffect} from 'react'
import { useHistory} from "react-router-dom";

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
  
  Media
} from "reactstrap";
import axios from 'axios'
import { GlobalContext } from '../../context/GlobalContext';


export default function SidebarProfile( props) {
      const {user, getCurrentUser} =useContext(GlobalContext)
    const userId = localStorage.getItem('userId');
        const history = useHistory();
    useEffect(() => {
        getCurrentUser(userId)
    }, [])
 
    const handleLogOut = (e)=>{
        e.preventDefault();
        const res= axios.get('http://localhost:5000/user/logout');
        if(res){
        localStorage.removeItem('usertoken');
        localStorage.removeItem('userId')
        history.push('/auth/login')
        }
    }
    return (
      props.large ?
        <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle text--cap text-black text-bold" >
                      {/* <img
                        alt="..."
                        // src={require("../../assets/img/theme/team-4-800x800.jpg")}
                         src={`http://via.placeholder.com/20`}
                      /> */}
                      {user && user.name[0]}
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!{''} {user && user.name}
                </h6>
                  </DropdownItem>
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem href="/user/logout" onClick={handleLogOut}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav> : 
        <UncontrolledDropdown nav>
            <DropdownToggle nav>
            <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle text--cap text-black text-bold">
                {/* <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                /> */}
                {user && user.name[0]}
                </span>
            </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome! {''} {user && user.name}</h6>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
            </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    
    )
}
