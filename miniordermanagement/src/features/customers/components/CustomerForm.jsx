import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import { createCustomer } from "../customerSlice";

const CustomerForm = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { createLoading, createError } = useSelector(
    (state) => state.customers,
  );

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await dispatch(createCustomer(formData)).unwrap();

      setFormData({
        name: "",
        address: "",
        phoneNumber: "",
      });

      setErrors({});
      onClose();
    } catch {
      // Redux already stores the API error.
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      address: "",
      phoneNumber: "",
    });

    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Customer</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Customer Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={Boolean(errors.address)}
            helperText={errors.address}
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber}
            fullWidth
          />

          {createError && <div>{createError}</div>}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={createLoading}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={createLoading}
        >
          {createLoading ? "Creating..." : "Create Customer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerForm;
