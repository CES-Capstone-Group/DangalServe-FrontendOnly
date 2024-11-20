import React, { useState } from "react";
import CoorSidebar from "../Coordinator/CoorSidebar";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import TopNav from "../TopNav";

const UserCoorPage = () => {
  const [sidebarOpen, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebarOpen);
    // console.log(sidebarOpen);
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <header>
        <TopNav sidebarOpen={sidebarOpen} sidebarToggle={showSidebar} />
      </header>
      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Sidebar Column */}
          <Col
            xs={sidebarOpen ? "12" : "3"} // Full width on mobile when open
            sm={sidebarOpen ? "4" : "2"}  // 4/12 (1/3) of the width when open on small screens
            md={sidebarOpen ? "3" : "2"}  // 3/12 (1/4) of the width when open on medium screens
            lg={sidebarOpen ? "3" : "2"}  // 3/12 (1/4) of the width when open on large screens
            xl={sidebarOpen ? "2" : "1"}  // 2/12 (1/6) of the width on extra-large screens
            xxl={sidebarOpen ? "2" : "1"} // 2/12 (1/6) of the width on extra-extra-large screens
            className="p-0" // Remove all padding from the sidebar column
            style={{
              transition: "width 0.3s ease", // Smooth transition effect for sidebar toggle
              overflow: "hidden", // Prevent overflow issues
              maxWidth: sidebarOpen ? "250px" : "80px", // Optional: Restrict sidebar width
            }}
          >
            <CoorSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
          </Col>

          {/* Main Content Column */}
          <Col
            xs="12" // Full width on extra-small screens
            sm={sidebarOpen ? "8" : "10"} // Adjust to 8/12 when sidebar is open, 10/12 when closed on small screens
            md={sidebarOpen ? "9" : "10"} // 9/12 when open, 10/12 when closed on medium screens
            lg={sidebarOpen ? "9" : "10"} // 9/12 when open, 10/12 when closed on large screens
            xl={sidebarOpen ? "10" : "11"} // 10/12 when open, 11/12 when closed on extra-large screens
            xxl={sidebarOpen ? "10" : "11"} // 10/12 when open, 11/12 when closed on extra-extra-large screens
            className="d-flex flex-column align-items-start"
            style={{
              marginTop: "6rem",
              paddingLeft: sidebarOpen ? "60px" : "20px", // Adjust padding for sidebar state
              paddingRight: sidebarOpen ? "20px" : "20px",
              paddingBottom: "30px",
              transition: "padding 0.3s ease", // Smooth transition effect for padding adjustment
              maxWidth: "100%", // Ensure content doesn't exceed container width
            }}
          >
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserCoorPage;