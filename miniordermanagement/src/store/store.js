import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "../features/customers/customerSlice";
import orderReducer from "../features/orders/orderSlice";

// ============================================================
// REDUX STORE
// ============================================================
//
// The application now has two Redux slices:
//
// customers
// orders
//
// Each feature manages its own state.
// ============================================================

const store = configureStore({
  reducer: {
    // Customer-related Redux state
    customers: customerReducer,

    // Order-related Redux state
    orders: orderReducer,
  },
});

export default store;
