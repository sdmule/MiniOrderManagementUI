import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "../features/customers/customerSlice";

// =========================================================
// Redux Store
// =========================================================
//
// The store is the central place where application state
// managed by Redux is stored.
//
// Currently we have:
//
// state.customers
//
// which is managed by customerReducer.
// =========================================================

const store = configureStore({
  reducer: {
    // -----------------------------------------------------
    // Customer state
    //
    // This means components can access it as:
    //
    // state.customers
    // -----------------------------------------------------
    customers: customerReducer,
  },
});

export default store;
