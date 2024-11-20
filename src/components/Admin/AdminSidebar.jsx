import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faClipboardList, faChartLine, faUserPen, faTrophy, faFileLines, faFile, faChevronDown, faInbox, faCalendar, faBackspace, faChevronLeft, faSquareCaretLeft, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { NavLink } from 'react-router-dom';
import Logo from '/src/assets/pnclogo.png'

// eslint-disable-next-line no-unused-vars, react/prop-types
const AdminSidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div>
      <SidebarMenu expand="lg" className={`d-md-block bg-light flex-column ${sidebarOpen ? 'side active justify-content-center align-items-center' : 'side collapsed '}`} style={{ width: sidebarOpen ? '240px' : '80px', boxShadow: '0px 3px 10px', marginTop: sidebarOpen ? '' : '50px', paddingTop: sidebarOpen ? '0px' : '1rem' }}>
        {/*SidebarMenu Header*/}
        <SidebarMenu.Toggle oncClick={toggleSidebar}>
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

        <SidebarMenu.Body>
          <SidebarMenu.Nav >
            <NavLink to={'/admin/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faTableColumns} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '10px', padding: '0px' }} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
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
                  <NavLink to={'/admin/pending-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <NavLink to={'/admin/approved-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
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
                  <NavLink to={'/admin/pending-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Pending Achievements </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <NavLink to={'/admin/approved-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Approved Achievements </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>
              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          </SidebarMenu.Nav>

          {/* DOCUMENTS */}
          <SidebarMenu.Nav>
            <NavLink to={'/admin/docs'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faFile} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '10px' }} />
              </SidebarMenu.Nav.Icon>
              {sidebarOpen && (<SidebarMenu.Nav.Title> Documents </SidebarMenu.Nav.Title>)}
            </NavLink>
          </SidebarMenu.Nav>

          {/* CALENDAR */}
          <SidebarMenu.Nav>
            <NavLink to={'/admin/calendar'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faCalendar} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '10px' }}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
              {sidebarOpen && (<SidebarMenu.Nav.Title> Calendar </SidebarMenu.Nav.Title>)}
            </NavLink>
          </SidebarMenu.Nav>

          {/* Reports */}
          <SidebarMenu.Nav>
            <SidebarMenu.Sub>
              <SidebarMenu.Sub.Toggle>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon onClick={toggleSidebar} icon={faChartLine} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '10px' }} />
                </SidebarMenu.Nav.Icon>
                {sidebarOpen && (<SidebarMenu.Nav.Title> Reports </SidebarMenu.Nav.Title>)}
                <SidebarMenu.Nav.Icon>
                  {sidebarOpen && (<FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>)}
                </SidebarMenu.Nav.Icon>
              </SidebarMenu.Sub.Toggle>

              <SidebarMenu.Sub.Collapse>
                <SidebarMenu.Nav>
                  <NavLink to={'/admin/involvement'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Involvement </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <NavLink to={'/admin/kpi'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> KPI </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <NavLink to={'/admin/impact'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Impact </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>
              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          </SidebarMenu.Nav>

          <SidebarMenu.Nav style={{ marginBottom: sidebarOpen ? '250px' : '140px' }}>
            <NavLink to={'/admin/eval-page'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faClipboardList} style={{ color: 'grey', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '10px' }} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Activity Evaluation </SidebarMenu.Nav.Title>
            </NavLink>
          </SidebarMenu.Nav>

          <SidebarMenu.Nav>
            <NavLink to={'/landing'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faCircleArrowLeft} style={{ color: '#71A872', fontSize: sidebarOpen ? '20px' : '20px', marginBottom: sidebarOpen ? '0px' : '10px' }} />
              </SidebarMenu.Nav.Icon>
              {sidebarOpen && (<SidebarMenu.Nav.Title className='text-success'> Back </SidebarMenu.Nav.Title>)}
            </NavLink>
          </SidebarMenu.Nav>


        </SidebarMenu.Body>
      </SidebarMenu>
    </div>
  );
}

export default AdminSidebar;
