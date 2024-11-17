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
      <Container className="py-4">
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminManagePage;
