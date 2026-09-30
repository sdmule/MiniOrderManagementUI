import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { fetchOrders } from "../orderSlice";

import {
  selectOrders,
  selectOrderListStatus,
  selectOrderError,
} from "../orderSelectors";

// ============================================================
// ORDER TABLE
// ============================================================
//
// Responsible for:
//
// 1. Fetching all orders from the backend
// 2. Reading orders from Redux
// 3. Displaying orders in a table
// 4. Navigating to Order Details
//
// ============================================================

const OrderTable = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Get orders from Redux
  const orders = useSelector(selectOrders);

  // Get API request status
  const status = useSelector(selectOrderListStatus);

  // Get API error
  const error = useSelector(selectOrderError);

  // ==========================================================
  // FETCH ORDERS
  // ==========================================================
  //
  // When OrderTable is loaded, dispatch:
  //
  // fetchOrders()
  //
  // which calls:
  //
  // GET https://localhost:7172/api/Orders
  //
  // ==========================================================

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  // ==========================================================
  // VIEW ORDER
  // ==========================================================
  //
  // Navigate to:
  //
  // /orders/{id}
  //
  // The Order Details page will be implemented later.
  //
  // ==========================================================

  const handleViewOrder = (id) => {
    navigate(`/orders/${id}`);
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (status === "loading") {
    return <Typography sx={{ mt: 2 }}>Loading orders...</Typography>;
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (status === "failed") {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error || "Failed to load orders."}
      </Typography>
    );
  }

  // ==========================================================
  // TABLE
  // ==========================================================

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* ==================================================
            TABLE HEADER
            ================================================== */}

        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>

            <TableCell>Customer ID</TableCell>

            <TableCell>Order Date</TableCell>

            <TableCell>Total Amount</TableCell>

            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        {/* ==================================================
            TABLE BODY
            ================================================== */}

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {/* Order ID */}
              <TableCell>{order.id}</TableCell>

              {/* Customer ID */}
              <TableCell>{order.customerId}</TableCell>

              {/* Order Date */}
              <TableCell>
                {new Date(order.orderDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })}
              </TableCell>

              {/* Total Amount */}
              <TableCell>
                ₹
                {Number(order.totalAmount).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>

              {/* Action */}
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleViewOrder(order.id)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* ==================================================
              EMPTY STATE
              ================================================== */}

          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
