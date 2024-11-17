import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTableColumns, faFileLines,faChevronDown, faInbox, faCalendar} from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../../assets/pnclogo.png'
import '../../App.css'
import { NavLink } from 'react-router-dom';

const BrgySidebar = ({ sidebarOpen, toggleSidebar }) => {
  return(
    <SidebarMenu expand="lg" className={`d-md-block bg-light flex-column ${sidebarOpen ? 'side active justify-content-center align-items-center' : 'side collapsed '}`} style={{ width: sidebarOpen ? '250px' : '80px', boxShadow: '0px 3px 10px', marginTop: sidebarOpen ? '0px' : '50px' }}>
    {/*SidebarMenu Header*/}
    <SidebarMenu.Toggle onClick={toggleSidebar}>
      <SidebarMenu.Brand>
        <img className='logo img-fluid' src={Logo} alt="pnclogo"  style={{ display: sidebarOpen ? 'block' : 'none' }} />
      </SidebarMenu.Brand>
    </SidebarMenu.Toggle>

    {sidebarOpen && (
    <SidebarMenu.Header>
      <SidebarMenu.Brand>
        <h5>Community Extension Service Management System</h5>
      </SidebarMenu.Brand>
    </SidebarMenu.Header>
    )}

      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <NavLink to={'/barangay/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faTableColumns} style={{ color: 'grey' , fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px', padding: '0px'}} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>

        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon onClick={toggleSidebar} icon={faFileLines} style={{ color: 'grey' , fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px'}}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
                {sidebarOpen && (<SidebarMenu.Nav.Title> Proposals </SidebarMenu.Nav.Title>)}
                <SidebarMenu.Nav.Icon>
                {sidebarOpen && ( <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>)}
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>
              
              <SidebarMenu.Sub.Collapse>
              <SidebarMenu.Nav>
                <NavLink to={'/barangay/pending-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <NavLink to={'/barangay/approved-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Approved Proposals </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon onClick={toggleSidebar} icon={faInbox} style={{ color: 'grey' , fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px'}}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
               {sidebarOpen && ( <SidebarMenu.Nav.Title> Requests </SidebarMenu.Nav.Title>)}
                <SidebarMenu.Nav.Icon>
                {sidebarOpen && ( <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>)}
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>
            
            <SidebarMenu.Sub.Collapse>

              <SidebarMenu.Nav>
                <NavLink to={'/barangay/resched'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Event Reschedule </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        <SidebarMenu.Nav>
          <NavLink to={'/barangay/calendar'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faCalendar} style={{ color: 'grey' , fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px'}}></FontAwesomeIcon>
            </SidebarMenu.Nav.Icon>
              {sidebarOpen && ( <SidebarMenu.Nav.Title> Calendar </SidebarMenu.Nav.Title>)}
          </NavLink>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
}

export default BrgySidebar;
