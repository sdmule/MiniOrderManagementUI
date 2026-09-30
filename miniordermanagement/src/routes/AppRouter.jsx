import { Routes, Route } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

// ============================================================
// PAGES
// ============================================================

import DashboardPage from "../pages/DashboardPage";

import CustomersPage from "../pages/CustomersPage";
import CreateCustomerPage from "../pages/CreateCustomerPage";
import CustomerDetailsPage from "../pages/CustomerDetailsPage";

import OrdersPage from "../pages/OrdersPage";
import CreateOrderPage from "../pages/CreateOrderPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";

import NotFoundPage from "../pages/NotFoundPage";

// ============================================================
// APPLICATION ROUTER
// ============================================================
//
// AppLayout is the common parent for all application pages.
//
// React Router renders the selected page inside the
// <Outlet /> of AppLayout.
//
// ============================================================

function AppRouter() {
  return (
    <Routes>
      {/* ======================================================
          APPLICATION LAYOUT
          ====================================================== */}

      <Route element={<AppLayout />}>
        {/* ====================================================
            DASHBOARD
            ==================================================== */}

        <Route path="/" element={<DashboardPage />} />

        {/* ====================================================
            CUSTOMERS
            ==================================================== */}

        <Route path="/customers" element={<CustomersPage />} />

        <Route path="/customers/create" element={<CreateCustomerPage />} />

        <Route path="/customers/:id" element={<CustomerDetailsPage />} />

        {/* ====================================================
            ORDERS
            ==================================================== */}

        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/orders/create" element={<CreateOrderPage />} />

        <Route path="/orders/:id" element={<OrderDetailsPage />} />

        {/* ====================================================
            NOT FOUND
            ==================================================== */}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
