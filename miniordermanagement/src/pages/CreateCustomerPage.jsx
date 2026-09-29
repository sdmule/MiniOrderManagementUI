import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { createCustomer } from "../features/customers/customerSlice";

import {
  selectCustomerCreateStatus,
  selectCustomerError,
} from "../features/customers/customerSelectors";

const CreateCustomerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================================================
  // Form State
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  // =========================================================
  // Frontend Validation Errors
  // =========================================================

  const [validationErrors, setValidationErrors] = useState({});

  // =========================================================
  // Redux State
  // =========================================================

  const createStatus = useSelector(selectCustomerCreateStatus);
  const error = useSelector(selectCustomerError);

  // =========================================================
  // Handle Input Changes
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove validation error when user starts
    // correcting the field.
    setValidationErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  // =========================================================
  // Frontend Validation
  // =========================================================

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Customer name is required.";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required.";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // =========================================================
  // Submit Form
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Do not call API if validation fails.
    if (!validateForm()) {
      return;
    }

    try {
      // Call POST /api/Customers
      await dispatch(createCustomer(formData)).unwrap();

      // Clear the form after successful creation.
      setFormData({
        name: "",
        address: "",
        phoneNumber: "",
      });

      // Clear frontend validation messages.
      setValidationErrors({});
    } catch {
      // Error is already stored in Redux.
      // It will be displayed below the heading.
    }
  };

  // =========================================================
  // Back to Customers
  // =========================================================

  const handleBackToCustomers = () => {
    navigate("/customers");
  };

  // =========================================================
  // Render
  // =========================================================

  return (
    <Box sx={{ p: 3 }}>
      {/* =====================================================
          Page Header
          ===================================================== */}

      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create Customer
      </Typography>

      {/* =====================================================
          Success Message
          ===================================================== */}

      {createStatus === "succeeded" && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Customer created successfully.
        </Alert>
      )}

      {/* =====================================================
          Error Message
          ===================================================== */}

      {createStatus === "failed" && error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* =====================================================
          Create Customer Form
          ===================================================== */}

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* -------------------------------------------------
              Customer Name
              ------------------------------------------------- */}

          <TextField
            fullWidth
            label="Customer Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(validationErrors.name)}
            helperText={validationErrors.name}
            margin="normal"
          />

          {/* -------------------------------------------------
              Address
              ------------------------------------------------- */}

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={Boolean(validationErrors.address)}
            helperText={validationErrors.address}
            margin="normal"
          />

          {/* -------------------------------------------------
              Phone Number
              ------------------------------------------------- */}

          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={Boolean(validationErrors.phoneNumber)}
            helperText={validationErrors.phoneNumber}
            margin="normal"
          />

          {/* =================================================
              Form Buttons
              ================================================= */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            {/* Back to Customers */}
            <Button variant="outlined" onClick={handleBackToCustomers}>
              Back to Customers
            </Button>

            {/* Create Customer */}
            <Button
              type="submit"
              variant="contained"
              disabled={createStatus === "loading"}
            >
              {createStatus === "loading" ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Creating...
                </>
              ) : (
                "Create Customer"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateCustomerPage;
