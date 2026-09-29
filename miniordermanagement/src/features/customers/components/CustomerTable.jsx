import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// fetchCustomers comes from customerSlice
import { fetchCustomers } from "../customerSlice";

// Selectors come from customerSelectors
import {
  selectCustomers,
  selectCustomerListStatus,
  selectCustomerError,
} from "../customerSelectors";

const CustomerTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // Get customer data from Redux store
  // ---------------------------------------------------------

  const customers = useSelector(selectCustomers);

  // Get current API request status
  const status = useSelector(selectCustomerListStatus);

  // Get API error, if any
  const error = useSelector(selectCustomerError);

  // ---------------------------------------------------------
  // Fetch customers when this component is loaded
  // ---------------------------------------------------------

  useEffect(() => {
    // We only call the API when the current status is idle.
    //
    // This prevents unnecessary API calls when the data
    // has already been successfully loaded.
    if (status === "idle") {
      dispatch(fetchCustomers());
    }
  }, [dispatch, status]);

  // ---------------------------------------------------------
  // Loading State
  // ---------------------------------------------------------

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ---------------------------------------------------------
  // Error State
  // ---------------------------------------------------------

  if (status === "failed") {
    return (
      <Typography color="error">
        {error || "Failed to load customers."}
      </Typography>
    );
  }

  // ---------------------------------------------------------
  // Customer Table
  // ---------------------------------------------------------

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* =================================================
            Table Header
            ================================================= */}

        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Customer</strong>
            </TableCell>

            <TableCell>
              <strong>Address</strong>
            </TableCell>

            <TableCell>
              <strong>Phone</strong>
            </TableCell>

            <TableCell>
              <strong>Orders</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Action</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* =================================================
            Table Body
            ================================================= */}

        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              {/* Customer Name */}
              <TableCell>{customer.name}</TableCell>

              {/* Customer Address */}
              <TableCell>{customer.profile?.address || "-"}</TableCell>

              {/* Customer Phone */}
              <TableCell>{customer.profile?.phoneNumber || "-"}</TableCell>

              {/* Number of Orders */}
              <TableCell>{customer.orders?.length || 0}</TableCell>

              {/* View Customer Details */}
              <TableCell align="center">
                <Button
                  variant="contained"
                  onClick={() => navigate(`/customers/${customer.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* =================================================
              Empty State
              ================================================= */}

          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
