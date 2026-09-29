import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import CustomerTable from "../features/customers/components/CustomerTable";

const CustomersPage = () => {
  const navigate = useNavigate();

  // Navigate to the Create Customer page.
  // The actual form will be implemented next.
  const handleCreateCustomer = () => {
    navigate("/customers/create");
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* -------------------------------------------------
          Page Header
          ------------------------------------------------- */}
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
          Customers
        </Typography>

        {/* -------------------------------------------------
            Create Customer Button

            Currently this only navigates to:
            /customers/create

            The Create Customer form will be implemented
            separately.
            ------------------------------------------------- */}
        <Button variant="contained" onClick={handleCreateCustomer}>
          Create Customer
        </Button>
      </Box>

      {/* -------------------------------------------------
          Customer Table

          This component is responsible for displaying
          the customer list.
          ------------------------------------------------- */}
      <CustomerTable />
    </Box>
  );
};

export default CustomersPage;
