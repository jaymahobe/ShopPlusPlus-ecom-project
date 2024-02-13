import React from "react";
import AdminOrders from "../../features/admin/components/AdminOrders";
import NavBar from "../../features/navbar/Navbar";

const AdminOrdersPage = () => {
  return (
    <>
      <NavBar>
        <AdminOrders />
      </NavBar>
    </>
  );
};

export default AdminOrdersPage;
