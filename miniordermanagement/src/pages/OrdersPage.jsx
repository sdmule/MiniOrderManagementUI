import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import OrderTable from "../features/orders/components/OrderTable";

// ============================================================
// ORDERS PAGE
// ============================================================
//
// This page is responsible for the overall Orders screen.
//
// Current functionality:
//
// - Display Orders heading
// - Display Create Order button
// - Display OrderTable
//
// Create Order functionality itself will be implemented later.
//
// ============================================================

const OrdersPage = () => {
  const navigate = useNavigate();

  // ==========================================================
  // CREATE ORDER
  // ==========================================================
  //
  // For now this only navigates to:
  //
  // /orders/create
  //
  // The actual Create Order form will be implemented later.
  //
  // ==========================================================

  const handleCreateOrder = () => {
    navigate("/orders/create");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* Page title */}
        <Typography variant="h4" component="h1">
          Orders
        </Typography>

        {/* ==================================================
            CREATE ORDER BUTTON
            ==================================================

            UI/navigation only for now.

            No POST API is being called.
            ================================================== */}

        <Button variant="contained" onClick={handleCreateOrder}>
          Create Order
        </Button>
      </Box>

      {/* =====================================================
          ORDER TABLE
          =====================================================

          OrderTable will:

          1. Dispatch fetchOrders()
          2. Call GET /api/Orders
          3. Store response in Redux
          4. Display the orders
          ===================================================== */}

      <OrderTable />
    </Box>
  );
};

export default OrdersPage;
