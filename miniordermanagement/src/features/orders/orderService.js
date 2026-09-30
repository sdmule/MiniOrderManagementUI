import apiClient from "../../services/apiClient";

// ============================================================
// GET ALL ORDERS
// ============================================================
//
// API:
// GET /api/Orders
//
// Returns:
// Array of orders
// ============================================================

export const getOrders = async () => {
  const response = await apiClient.get("/Orders");

  return response.data;
};

// ============================================================
// GET ORDERS BY CUSTOMER
// ============================================================
//
// API:
// GET /api/Orders/customer/{customerId}
// ============================================================

export const getOrdersByCustomer = async (customerId) => {
  const response = await apiClient.get(`/Orders/customer/${customerId}`);

  return response.data;
};

// ============================================================
// GET ORDER BY ID
// ============================================================
//
// API:
// GET /api/Orders/{id}
//
// Returns:
// Single order object
// ============================================================

export const getOrderById = async (id) => {
  const response = await apiClient.get(`/Orders/${id}`);

  return response.data;
};

// ============================================================
// CREATE ORDER
// ============================================================
//
// API:
// POST /api/Orders
//
// Request body:
//
// {
//   customerId: 1,
//   orderDate: "2026-09-30",
//   totalAmount: 1000
// }
//
// Returns:
// Newly created order
// ============================================================

export const createOrder = async (order) => {
  const response = await apiClient.post("/Orders", order);

  return response.data;
};

// ============================================================
// DEFAULT EXPORT
// ============================================================
//
// All order-related API functions are exported together.
// ============================================================

export default {
  getOrders,
  getOrdersByCustomer,
  getOrderById,
  createOrder,
};
