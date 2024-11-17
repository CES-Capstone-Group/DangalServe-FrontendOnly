import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faTrophy, faClipboardList, faFileLines, faChevronDown, faInbox, faCalendar, faChartLine, faFile } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../../assets/pnclogo.png'
import '../../App.css'
import { NavLink } from 'react-router-dom';

const CoorSidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <SidebarMenu expand="lg" className={`d-md-block bg-light flex-column ${sidebarOpen ? 'side active justify-content-center align-items-center' : 'side collapsed '}`} style={{ width: sidebarOpen ? '250px' : '80px', boxShadow: '0px 3px 10px', marginTop: sidebarOpen ? '0px' : '50px' }}>
      {/*SidebarMenu Header*/}
      <SidebarMenu.Toggle onClick={toggleSidebar}>
        <SidebarMenu.Brand>
          <img className='logo img-fluid' src={Logo} alt="pnclogo" style={{ display: sidebarOpen ? 'block' : 'none' }} />
        </SidebarMenu.Brand>
      </SidebarMenu.Toggle>

      {sidebarOpen && (
        <SidebarMenu.Header>
          <SidebarMenu.Brand>
            <h5>Community Extension Service Management System</h5>
          </SidebarMenu.Brand>
        </SidebarMenu.Header>
      )}

      {/* DASHBOARD */}
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <NavLink to={'/coor/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faTableColumns} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px', marginTop: sidebarOpen ? '0px' : '100px' }} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>

        {/* KPI */}
        <SidebarMenu.Nav>
          <NavLink to={'/coor/kpi'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faChartLine} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px' }} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> KPI </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>

        {/* PROPOSALS */}
        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon onClick={toggleSidebar} icon={faFileLines} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '0px' }}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
              {sidebarOpen && (<SidebarMenu.Nav.Title> Proposals </SidebarMenu.Nav.Title>)}
              <SidebarMenu.Nav.Icon>
                {sidebarOpen && (<FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>)}
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>

            <SidebarMenu.Sub.Collapse>
              <SidebarMenu.Nav>
                <NavLink to={'/coor/pending-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <NavLink to={'/coor/approved-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Approved Proposals </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        {/* ACHIEVEMENTS */}
        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon onClick={toggleSidebar} icon={faTrophy} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '0px' }} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Achievements </SidebarMenu.Nav.Title>
              <SidebarMenu.Nav.Icon>
                {sidebarOpen && (<FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>)}
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>

            <SidebarMenu.Sub.Collapse>
              <SidebarMenu.Nav>
                <NavLink to={'/coor/pending-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Pending Achievements </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <NavLink to={'/coor/approved-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Approved Achievements </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        {/* REQUESTS */}
        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon onClick={toggleSidebar} icon={faInbox} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '10px' }}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
              {sidebarOpen && (<SidebarMenu.Nav.Title> Requests </SidebarMenu.Nav.Title>)}
              <SidebarMenu.Nav.Icon>
                {sidebarOpen && (<FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>)}
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>

            <SidebarMenu.Sub.Collapse>

              <SidebarMenu.Nav>
                <NavLink to={'/coor/resched'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Event Reschedule </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        {/* DOCUMENTS */}
        <SidebarMenu.Nav>
          <NavLink to={'/coor/docs'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faFile} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px' }} />
            </SidebarMenu.Nav.Icon>
            {sidebarOpen && (<SidebarMenu.Nav.Title> Documents </SidebarMenu.Nav.Title>)}
          </NavLink>
        </SidebarMenu.Nav>

        {/* CALENDAR */}
        <SidebarMenu.Nav>
          <NavLink to={'/coor/calendar'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faCalendar} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px' }}></FontAwesomeIcon>
            </SidebarMenu.Nav.Icon>
            {sidebarOpen && (<SidebarMenu.Nav.Title> Calendar </SidebarMenu.Nav.Title>)}
          </NavLink>
        </SidebarMenu.Nav>

        <SidebarMenu.Nav>
          <NavLink to={'/coor/eval-page'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faClipboardList} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '22px', marginBottom: sidebarOpen ? '0px' : '10px' }} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Activity Evaluation </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
}

export default CoorSidebar;
