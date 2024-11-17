import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../App.css';
import { Navbar, Container, Button, Modal, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is installed

import { useUser } from './UserContext';

const TopNav = ({ sidebarOpen, sidebarToggle, isHidden }) => {
  const [accountType, setAccountType] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { loggedUser, setLoggedUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Decode the JWT token to get the user information and account type
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const userName = decodedToken.name;
      const userAccountType = decodedToken.accountType; // Ensure this key is in your JWT payload
      setLoggedUser(userName);
      setAccountType(userAccountType); // Set the account type dynamically
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);

  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const profilePath = {
    Admin: '/admin/profile',
    Proponent: '/coor/profile',
    'Brgy. Official': '/barangay/profile'
  }[accountType];

  return (
    <div className='topNav'>
      <Navbar expand="lg" style={{
        backgroundColor: '#71A872',
        paddingLeft: sidebarOpen ? '250px' : '0px',
        transition: 'padding-left 0.3s ease',
      }}>
        <Container fluid className='d-flex'>
          <Navbar.Brand style={{ color: 'white' }}>
            <Button
              variant='outline-light'
              className={`ms-1 ${isHovered ? 'border-1' : 'border-0'}`}
              onClick={sidebarToggle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ backgroundColor: "transparent", transition: 'none' }}
            >
              <FontAwesomeIcon icon={faBars} color='white' />
            </Button>
            <Navbar.Text className='ps-4 h3 navbar-text' style={{ color: 'white' }}>
              {accountType}
            </Navbar.Text>
          </Navbar.Brand>

          <Container className="d-flex justify-content-center welcome-message">
            <div style={{
              backgroundColor: '#fff',
              color: '#71A872',
              padding: '10px 20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textAlign: 'center',
              maxWidth: '20rem'
            }}>
              Welcome, {loggedUser}!
            </div>
          </Container>

          <Dropdown align='end' onToggle={() => setShowDropdown(!showDropdown)} show={showDropdown}>
            <Dropdown.Toggle style={{ borderWidth: '0px', backgroundColor: '#dddddd00' }}>
              <FontAwesomeIcon className="user-icon" style={{ fontSize: '35px', color: 'white' }} icon={faCircleUser} />
            </Dropdown.Toggle>
            <CSSTransition in={showDropdown} timeout={300} classNames="dropdown" unmountOnExit>
              <Dropdown.Menu className='dropDown'>
                <Dropdown.Item onClick={() => handleNavigation(profilePath)}>My Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleShowLogoutModal}>
                  Logout
                  <FontAwesomeIcon style={{ paddingLeft: '5px', color: '#71A872' }} icon={faSignOutAlt} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </CSSTransition>
          </Dropdown>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Confirm Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center" style={{ fontSize: '16px' }}>Are you sure you want to log out?</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="outline-secondary" onClick={handleCloseLogoutModal}>
            <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default TopNav;
