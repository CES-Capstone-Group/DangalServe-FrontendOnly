import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faClipboardList} from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../../assets/pnclogo.png'
import '../../App.css'
import { NavLink } from 'react-router-dom';

const EvalSidebar = ({ sidebarOpen, toggleSidebar }) => {
    return (
        <SidebarMenu expand="lg"  className={`d-md-block bg-light flex-column ${sidebarOpen ? 'side active' : 'side collapsed'}`} style={{  width: sidebarOpen ? '250px' : '80px', boxShadow: '0px 3px 10px', marginTop: sidebarOpen ? '0' : '50px' }}>
        {/*SidebarMenu Header*/}
        <SidebarMenu.Toggle oncClick={toggleSidebar}>
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
                    <NavLink to={'/eval/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faTableColumns} style={{ color: 'grey' , fontSize: sidebarOpen ? '20px' : '25px', marginBottom: sidebarOpen ? '0px' : '20px', marginTop: sidebarOpen ? '0px' : '100px'}} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
                    </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                    <NavLink to={'/eval/eval-cards'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        <SidebarMenu.Nav.Icon>
                        <FontAwesomeIcon icon={faClipboardList} style={{ color: 'grey' , fontSize: sidebarOpen ? '20px' : '25px', marginBottom: sidebarOpen ? '0px' : '20px', marginTop: sidebarOpen ? '0px' : '100px'}}  />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title> Activity Evaluation </SidebarMenu.Nav.Title>
                    </NavLink>
                </SidebarMenu.Nav>
            </SidebarMenu.Body>
        </SidebarMenu>
    );
}

export default EvalSidebar;
