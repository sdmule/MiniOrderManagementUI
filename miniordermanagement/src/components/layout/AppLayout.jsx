import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// ============================================================
// APPLICATION LAYOUT
// ============================================================
//
// AppLayout provides the common structure of the application.
//
// The layout contains:
//
// 1. Header
// 2. Sidebar
// 3. Main Content
// 4. Footer
//
// <Outlet /> is provided by React Router.
//
// React Router will render the currently selected page inside
// the <Outlet />.
//
// Example:
//
// /customers
//      -> CustomersPage
//
// /orders
//      -> OrdersPage
//
// /orders/create
//      -> CreateOrderPage
//
// /
//      -> DashboardPage
//
// ============================================================

function AppLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ======================================================
          HEADER
          ====================================================== */}

      <Header />

      {/* ======================================================
          MAIN APPLICATION AREA
          
          Sidebar and page content are displayed side by side.
          ====================================================== */}

      <Box
        sx={{
          display: "flex",
          flex: 1,
          backgroundColor: "#f5f7fa",
        }}
      >
        {/* ----------------------------------------------------
            SIDEBAR
            ---------------------------------------------------- */}

        <Sidebar />

        {/* ----------------------------------------------------
            PAGE CONTENT

            The currently selected route/page will be rendered
            inside <Outlet />.
            ---------------------------------------------------- */}

        <Box
          component="main"
          sx={{
            flex: 1,
            padding: 3,
            overflowX: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* ======================================================
          FOOTER
          ====================================================== */}

      <Footer />
    </Box>
  );
}

export default AppLayout;
