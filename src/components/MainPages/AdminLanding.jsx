import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AdminLandingPage from "../Admin/AdminLandingPage";
import TopNav from "../TopNav";

const AdminLanding = () => {
  

  return (
    <div>
      <header>
        <TopNav isHidden={'none'}/>
      </header>
      <Row>
        <Col >
          <Container>
            <AdminLandingPage/>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLanding;