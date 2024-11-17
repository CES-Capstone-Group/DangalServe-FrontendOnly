import React, { useState } from "react";
import BrgySidebar from "../Barangay/BrgySidebar";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import TopNav from "../TopNav";

const UserBarangayPage = () => {
  const [sidebarOpen, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebarOpen);
    // console.log(sidebarOpen);
  };

  return (
    <div>
      <header>
        <TopNav sidebarOpen={sidebarOpen} sidebarToggle={showSidebar} />
      </header>
      <Row>
        <Col
          xs={"0"}
          sm={sidebarOpen ? "4" : "2"}
          md={sidebarOpen ? "4" : "1"}
          lg={sidebarOpen ? "3" : "1"}
          xl={sidebarOpen ? "2" : "1"}
          xxl={sidebarOpen ? "2" : "1"}
          style={{ paddingLeft: '0' }}
        >
          <BrgySidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col className={`d-flex justify-content-${sidebarOpen ? 'start' : 'center'} align-items-start mobileMain`}
          style={{
            marginTop: "10rem",
            paddingLeft: "80px",
            paddingRight: "5rem",
            paddingBottom: "20px", // Adjust padding as needed
          }}
          xs={"12"}
          sm={sidebarOpen ? "8" : "10"}
          md={sidebarOpen ? "8" : "11"}
          lg={sidebarOpen ? "9" : "11"}
          xl={sidebarOpen ? "10" : "11"}
          xxl={sidebarOpen ? "9" : "10"}
        >
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}

export default UserBarangayPage;