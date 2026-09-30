// ============================================================
// ORDER SELECTORS
// ============================================================

// ------------------------------------------------------------
// Returns the complete list of orders.
// ------------------------------------------------------------
export const selectOrders = (state) => state.orders.orders;

// ------------------------------------------------------------
// Returns the currently selected order.
// ------------------------------------------------------------
export const selectSelectedOrder = (state) => state.orders.selectedOrder;

// ------------------------------------------------------------
// Returns the status of the orders list request.
// ------------------------------------------------------------
export const selectOrderListStatus = (state) => state.orders.listStatus;

// ------------------------------------------------------------
// Returns the status of the order details request.
// ------------------------------------------------------------
export const selectOrderDetailsStatus = (state) => state.orders.detailsStatus;

// ------------------------------------------------------------
// Returns the status of the create-order request.
// ------------------------------------------------------------
export const selectOrderCreateStatus = (state) => state.orders.createStatus;

// ------------------------------------------------------------
// Returns the current order-related error.
// ------------------------------------------------------------
export const selectOrderError = (state) => state.orders.error;
