// Get all customers from Redux state.
export const selectCustomers = (state) => state.customers.customers;

// Get currently selected customer.
export const selectSelectedCustomer = (state) =>
  state.customers.selectedCustomer;

// Get customer list API request status.
export const selectCustomerListStatus = (state) => state.customers.listStatus;

// Get customer details API request status.
export const selectCustomerDetailsStatus = (state) =>
  state.customers.detailsStatus;

// Get customer creation API request status.
export const selectCustomerCreateStatus = (state) =>
  state.customers.createStatus;

// Get customer-related error.
export const selectCustomerError = (state) => state.customers.error;
