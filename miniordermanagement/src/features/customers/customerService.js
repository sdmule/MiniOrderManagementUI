import apiClient from "../../services/apiClient";

// ============================================================
// GET ALL CUSTOMERS
// ============================================================
//
// API:
// GET /api/Customers
//
// Returns:
// Array of customers
//
// This function is used by:
// customerSlice -> fetchCustomers
// ============================================================
export const getCustomers = async () => {
  const response = await apiClient.get("/Customers");

  return response.data;
};

// ============================================================
// GET CUSTOMER BY ID
// ============================================================
//
// API:
// GET /api/Customers/{id}
//
// Parameter:
// id -> Customer ID
//
// Returns:
// Single customer object
//
// This function is used by:
// customerSlice -> fetchCustomerById
// ============================================================
export const getCustomerById = async (id) => {
  const response = await apiClient.get(`/Customers/${id}`);

  return response.data;
};

// ============================================================
// CREATE CUSTOMER
// ============================================================
//
// API:
// POST /api/Customers
//
// Request body expected by backend:
//
// {
//   "name": "sdmule",
//   "address": "stealth",
//   "phoneNumber": "******7302"
// }
//
// Returns:
//
// {
//   "id": 7
// }
//
// This function is used by:
// customerSlice -> createCustomer
// ============================================================
export const createCustomer = async (customer) => {
  const response = await apiClient.post("/Customers", customer);

  return response.data;
};

// ============================================================
// DEFAULT EXPORT
// ============================================================
//
// Keeping the default export allows us to use either:
//
// import { getCustomers } from "./customerService";
//
// OR:
//
// import customerService from "./customerService";
//
// For our Redux slices, we are using named imports.
// ============================================================
export default {
  getCustomers,
  getCustomerById,
  createCustomer,
};
