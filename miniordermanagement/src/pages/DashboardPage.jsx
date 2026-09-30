import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Alert,
} from "@mui/material";

// ============================================================
// CUSTOMER REDUX
// ============================================================
//
// Thunks/actions are imported from customerSlice.js.
//
// fetchCustomers()
// -> Calls GET /api/Customers
// -> Stores customers in Redux
//
// ============================================================

import { fetchCustomers } from "../features/customers/customerSlice";

// ============================================================
// CUSTOMER SELECTORS
// ============================================================
//
// Selectors are kept separately from the slice.
//
// They are responsible only for reading customer-related
// information from the Redux store.
//
// ============================================================

import {
  selectCustomers,
  selectCustomerListStatus,
  selectCustomerError,
} from "../features/customers/customerSelectors";

// ============================================================
// ORDER REDUX
// ============================================================
//
// fetchOrders() is the async thunk responsible for calling:
//
// GET /api/Orders
//
// It is defined in orderSlice.js.
//
// ============================================================

import { fetchOrders } from "../features/orders/orderSlice";

// ============================================================
// ORDER SELECTORS
// ============================================================
//
// IMPORTANT:
//
// These selectors are NOT exported from orderSlice.js.
//
// They are defined in:
//
// features/orders/orderSelectors.js
//
// Therefore, all order selectors must be imported from
// orderSelectors.js.
//
// ============================================================

import {
  selectOrders,
  selectOrderListStatus,
  selectOrderError,
} from "../features/orders/orderSelectors";

// ============================================================
// DASHBOARD PAGE
// ============================================================
//
// Dashboard provides a high-level overview of the application.
//
// Current statistics:
//
// 1. Total Customers
// 2. Total Orders
// 3. Total Revenue
//
// The Dashboard does NOT have its own API service.
//
// Instead, it reuses the existing Customers and Orders
// Redux state.
//
// ============================================================

function DashboardPage() {
  const dispatch = useDispatch();

  // ==========================================================
  // CUSTOMER DATA
  // ==========================================================
  //
  // Read customer information from Redux.
  //
  // selectCustomers
  // -> Returns the complete customer list.
  //
  // selectCustomerListStatus
  // -> Returns the current API request status.
  //
  // selectCustomerError
  // -> Returns any customer API error.
  //
  // ==========================================================

  const customers = useSelector(selectCustomers);

  const customerStatus = useSelector(selectCustomerListStatus);

  const customerError = useSelector(selectCustomerError);

  // ==========================================================
  // ORDER DATA
  // ==========================================================
  //
  // Read order information from Redux.
  //
  // selectOrders
  // -> Returns the complete order list.
  //
  // selectOrderListStatus
  // -> Returns the current orders API request status.
  //
  // selectOrderError
  // -> Returns any order API error.
  //
  // ==========================================================

  const orders = useSelector(selectOrders);

  const orderStatus = useSelector(selectOrderListStatus);

  const orderError = useSelector(selectOrderError);

  // ==========================================================
  // LOAD DASHBOARD DATA
  // ==========================================================
  //
  // The Dashboard requires both:
  //
  // 1. Customers
  // 2. Orders
  //
  // We reuse the existing Redux thunks instead of creating
  // separate Dashboard API calls.
  //
  // ----------------------------------------------------------
  // Customer API:
  //
  // If customerStatus is "idle", the customers have not been
  // loaded yet, so we dispatch fetchCustomers().
  //
  // ----------------------------------------------------------
  // Order API:
  //
  // If orderStatus is "idle", the orders have not been
  // loaded yet, so we dispatch fetchOrders().
  //
  // ----------------------------------------------------------
  // This prevents unnecessary API calls when the Redux state
  // already contains the required data.
  //
  // ==========================================================

  useEffect(() => {
    if (customerStatus === "idle") {
      dispatch(fetchCustomers());
    }

    if (orderStatus === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, customerStatus, orderStatus]);

  // ==========================================================
  // COMBINED LOADING STATE
  // ==========================================================
  //
  // Dashboard is considered loading if either:
  //
  // Customers are loading
  // OR
  // Orders are loading
  //
  // ==========================================================

  const isLoading = customerStatus === "loading" || orderStatus === "loading";

  // ==========================================================
  // COMBINED ERROR STATE
  // ==========================================================
  //
  // If either API request fails, display the error.
  //
  // Customer error gets priority if both errors exist.
  //
  // ==========================================================

  const error = customerError || orderError;

  // ==========================================================
  // CALCULATE TOTAL REVENUE
  // ==========================================================
  //
  // Revenue is calculated from the orders already stored
  // in Redux.
  //
  // Example:
  //
  // Order 1 -> ₹2500.50
  // Order 2 -> ₹1000.00
  // Order 3 -> ₹2000.00
  //
  // Total Revenue -> ₹5500.50
  //
  // Number() ensures that totalAmount is treated as a number
  // even if the API returns it as a string.
  //
  // ==========================================================

  const totalRevenue = orders.reduce((total, order) => {
    return total + Number(order.totalAmount || 0);
  }, 0);

  // ==========================================================
  // LOADING UI
  // ==========================================================
  //
  // While either Customers or Orders are being loaded,
  // display a centered loading indicator.
  //
  // ==========================================================

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ==========================================================
  // ERROR UI
  // ==========================================================
  //
  // If either Customers or Orders API request failed,
  // display the error message.
  //
  // ==========================================================

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // ==========================================================
  // DASHBOARD UI
  // ==========================================================
  //
  // Once both API requests have completed successfully,
  // display the dashboard summary cards.
  //
  // ==========================================================

  return (
    <Box>
      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 1,
          }}
        >
          Dashboard
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Overview of customers and orders.
        </Typography>
      </Box>

      {/* ======================================================
          SUMMARY CARDS
          ======================================================
          
          The Dashboard currently displays three statistics:
          
          1. Total Customers
          2. Total Orders
          3. Total Revenue
          
          ====================================================== */}

      <Grid container spacing={3}>
        {/* ====================================================
            TOTAL CUSTOMERS
            ==================================================== */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Customers
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                }}
              >
                {customers.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ====================================================
            TOTAL ORDERS
            ==================================================== */}

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Orders
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                }}
              >
                {orders.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ====================================================
            TOTAL REVENUE
            ==================================================== */}

        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 4,
          }}
        >
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Revenue
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                }}
              >
                ₹
                {totalRevenue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
