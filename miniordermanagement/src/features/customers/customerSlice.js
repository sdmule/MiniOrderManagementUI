import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import customerService from "./customerService";

// =========================================================
// Get all customers
// =========================================================

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      return await customerService.getCustomers();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch customers",
      );
    }
  },
);

// =========================================================
// Get customer by ID
// =========================================================

export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      return await customerService.getCustomerById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch customer",
      );
    }
  },
);

// =========================================================
// Create customer
// =========================================================

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (customer, { rejectWithValue }) => {
    try {
      return await customerService.createCustomer(customer);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to create customer.",
      );
    }
  },
);

// =========================================================
// Initial Redux State
// =========================================================

const initialState = {
  customers: [],
  selectedCustomer: null,

  // Status for customer list API
  listStatus: "idle",

  // Status for customer details API
  detailsStatus: "idle",

  // Status for create customer API
  createStatus: "idle",

  // General customer error
  error: null,
};

const customerSlice = createSlice({
  name: "customers",

  initialState,

  reducers: {
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
      state.detailsStatus = "idle";
      state.error = null;
    },

    // -------------------------------------------------------
    // Clear create customer state
    // -------------------------------------------------------
    clearCreateCustomerState: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // Get Customers
      // =====================================================

      .addCase(fetchCustomers.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })

      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.customers = action.payload;
      })

      .addCase(fetchCustomers.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload;
      })

      // =====================================================
      // Get Customer By ID
      // =====================================================

      .addCase(fetchCustomerById.pending, (state) => {
        state.detailsStatus = "loading";
        state.selectedCustomer = null;
        state.error = null;
      })

      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.selectedCustomer = action.payload;
      })

      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload;
      })

      // =====================================================
      // Create Customer
      // =====================================================

      .addCase(createCustomer.pending, (state) => {
        // POST request is in progress
        state.createStatus = "loading";

        // Clear any previous error
        state.error = null;
      })

      .addCase(createCustomer.fulfilled, (state) => {
        // Customer was successfully created
        state.createStatus = "succeeded";
        state.error = null;
      })

      .addCase(createCustomer.rejected, (state, action) => {
        // Customer creation failed
        state.createStatus = "failed";
        state.error = action.payload;
      });
  },
});

// Export Redux actions
export const { clearSelectedCustomer, clearCreateCustomerState } =
  customerSlice.actions;

export default customerSlice.reducer;
