import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getOrders,
  getOrderById,
  getOrdersByCustomer,
  createOrder as createOrderApi,
} from "./orderService";

// ============================================================
// GET ALL ORDERS
// ============================================================

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",

  async (_, { rejectWithValue }) => {
    try {
      return await getOrders();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to fetch orders.",
      );
    }
  },
);

// ============================================================
// GET ORDER BY ID
// ============================================================

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",

  async (id, { rejectWithValue }) => {
    try {
      return await getOrderById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to fetch order.",
      );
    }
  },
);

// ============================================================
// GET ORDERS BY CUSTOMER
// ============================================================

export const fetchOrdersByCustomer = createAsyncThunk(
  "orders/fetchOrdersByCustomer",

  async (customerId, { rejectWithValue }) => {
    try {
      return await getOrdersByCustomer(customerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to fetch customer orders.",
      );
    }
  },
);

// ============================================================
// CREATE ORDER
// ============================================================
//
// Calls:
// POST /api/Orders
//
// The thunk sends the order data to the backend.
//
// IMPORTANT:
// We do NOT navigate after successful creation.
//
// The OrderForm will display the success message and
// allow the user to decide when to return to Orders.
// ============================================================

export const createOrder = createAsyncThunk(
  "orders/createOrder",

  async (order, { rejectWithValue }) => {
    try {
      return await createOrderApi(order);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Failed to create order.",
      );
    }
  },
);

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  // All orders returned by GET /api/Orders
  orders: [],

  // One selected order for the details page
  selectedOrder: null,

  // Status of GET /api/Orders
  listStatus: "idle",

  // Status of GET /api/Orders/{id}
  detailsStatus: "idle",

  // Status of POST /api/Orders
  createStatus: "idle",

  // Stores any API error
  error: null,
};

// ============================================================
// ORDER SLICE
// ============================================================

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    // ----------------------------------------------------------
    // Clear selected order
    // ----------------------------------------------------------

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
      state.detailsStatus = "idle";
      state.error = null;
    },

    // ----------------------------------------------------------
    // Reset create-order status
    // ----------------------------------------------------------
    //
    // This can be used when we want to return the create-order
    // state back to its initial condition.
    // ----------------------------------------------------------

    resetCreateOrderStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========================================================
      // GET ALL ORDERS
      // ========================================================

      .addCase(fetchOrders.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = action.payload;
      })

      // ========================================================
      // GET ORDER BY ID
      // ========================================================

      .addCase(fetchOrderById.pending, (state) => {
        state.detailsStatus = "loading";
        state.selectedOrder = null;
        state.error = null;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.selectedOrder = action.payload;
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload;
      })

      // ========================================================
      // CREATE ORDER
      // ========================================================

      .addCase(createOrder.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.error = null;

        // Add the newly created order to the existing Redux list
        // if the API returns the created order.
        if (action.payload) {
          state.orders.push(action.payload);
        }
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      });
  },
});

// ============================================================
// ACTIONS
// ============================================================

export const { clearSelectedOrder, resetCreateOrderStatus } =
  orderSlice.actions;

// ============================================================
// REDUCER
// ============================================================

export default orderSlice.reducer;
