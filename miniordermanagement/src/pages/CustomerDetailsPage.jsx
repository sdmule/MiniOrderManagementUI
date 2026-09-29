import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  fetchCustomerById,
  clearSelectedCustomer,
} from "../features/customers/customerSlice";

import {
  selectSelectedCustomer,
  selectCustomerDetailsStatus,
  selectCustomerError,
} from "../features/customers/customerSelectors";

function CustomerDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customer = useSelector(selectSelectedCustomer);
  const status = useSelector(selectCustomerDetailsStatus);
  const error = useSelector(selectCustomerError);

  useEffect(() => {
    dispatch(fetchCustomerById(id));

    return () => {
      dispatch(clearSelectedCustomer());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/customers");
  };

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box>
        <Typography color="error">
          {error || "Failed to load customer."}
        </Typography>

        <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
          Back to Customers
        </Button>
      </Box>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Customer Details
      </Typography>

      {/* Customer Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>

              <Typography variant="h6">{customer.name}</Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>

              <Typography variant="h6">
                {customer.profile?.address || "-"}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>

              <Typography variant="h6">
                {customer.profile?.phoneNumber || "-"}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Orders */}
      <Typography variant="h5" gutterBottom>
        Orders ({customer.orders?.length || 0})
      </Typography>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell align="right">Total Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customer.orders?.length > 0 ? (
              customer.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>

                  <TableCell>
                    {new Date(order.orderDate).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>

                  <TableCell align="right">
                    ₹
                    {order.totalAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Back Button */}
      <Box mt={3}>
        <Button variant="outlined" onClick={handleBack}>
          Back to Customers
        </Button>
      </Box>
    </Box>
  );
}

export default CustomerDetailsPage;
