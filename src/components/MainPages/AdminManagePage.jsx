import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNav from "../TopNav";
import "../../App.css";

const AdminManagePage = () => {
  return (

      <Container style={{padding: '1'}} className="py-2 mt-5">
        <Outlet />
      </Container>

  );
};

export default AdminManagePage;
