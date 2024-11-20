import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNav from "../TopNav";
import "../../App.css";

const AdminManagePage = () => {
  return (
    <div>
      <header>
        <TopNav />
      </header>
      <Container style={{padding: '1'}} className="py-2">
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminManagePage;
