import { Route, Routes } from "react-router-dom";

// Application-wide layout
import AppLayout from "../components/layout/AppLayout.jsx";

// Dashboard page
import DashboardPage from "../pages/DashboardPage.jsx";

// Customer pages
import CustomersPage from "../pages/CustomersPage.jsx";
import CreateCustomerPage from "../pages/CreateCustomerPage.jsx";
import CustomerDetailsPage from "../pages/CustomerDetailsPage.jsx";

// Order pages
import OrdersPage from "../pages/OrdersPage.jsx";
import CreateOrderPage from "../pages/CreateOrderPage.jsx";
import OrderDetailsPage from "../pages/OrderDetailsPage.jsx";

// 404 / Not Found page
import NotFoundPage from "../pages/NotFoundPage.jsx";

function AppRouter() {
  return (
    <Routes>
      {/* =====================================================
          APPLICATION LAYOUT
          =====================================================

          All routes inside this Route use AppLayout.

          AppLayout contains common UI such as:
          - Header
          - Sidebar
          - Main content area

          AppLayout renders the matched child route through
          <Outlet />.
          ===================================================== */}
      <Route element={<AppLayout />}>
        {/* ===================================================
            DASHBOARD
            =================================================== */}

        {/* Home / Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* ===================================================
            CUSTOMERS
            =================================================== */}

        {/* Customer list */}
        {/* GET /api/Customers will be used here */}
        <Route path="/customers" element={<CustomersPage />} />

        {/* Create Customer */}
        {/*

          Navigated to when the user clicks:

          [ Create Customer ]

          URL:
          /customers/create

          The actual CustomerForm will be implemented
          inside this page.
        */}
        <Route path="/customers/create" element={<CreateCustomerPage />} />

        {/* Customer Details */}
        {/*
          :id is a dynamic route parameter.

          Example:

          /customers/1
          /customers/2
          /customers/7

          The CustomerDetailsPage will use the ID to call:

          GET /api/Customers/{id}
        */}
        <Route path="/customers/:id" element={<CustomerDetailsPage />} />

        {/* ===================================================
            ORDERS
            =================================================== */}

        {/* Orders list */}
        <Route path="/orders" element={<OrdersPage />} />

        {/* Create Order */}
        <Route path="/orders/create" element={<CreateOrderPage />} />

        {/* Order Details */}
        {/*
          Dynamic order ID.

          Examples:

          /orders/1
          /orders/5
          /orders/10
        */}
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
      </Route>

      {/* =====================================================
          NOT FOUND / 404
          =====================================================

          If none of the routes above match the URL,
          this route will be rendered.

          Example:

          /something-that-does-not-exist

          will render NotFoundPage.
          ===================================================== */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
