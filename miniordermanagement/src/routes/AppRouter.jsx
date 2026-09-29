import { Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout.jsx";

import DashboardPage from "../pages/DashboardPage.jsx";

import CustomersPage from "../pages/CustomersPage.jsx";
import CreateCustomerPage from "../pages/CreateCustomerPage.jsx";
import CustomerDetailsPage from "../pages/CustomerDetailsPage.jsx";

import OrdersPage from "../pages/OrdersPage.jsx";
import CreateOrderPage from "../pages/CreateOrderPage.jsx";
import OrderDetailsPage from "../pages/OrderDetailsPage.jsx";

import NotFoundPage from "../pages/NotFoundPage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Customers */}
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/create" element={<CreateCustomerPage />} />
        <Route path="/customers/:id" element={<CustomerDetailsPage />} />

        {/* Orders */}
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/create" element={<CreateOrderPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
