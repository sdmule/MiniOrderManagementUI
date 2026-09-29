import apiClient from "../../services/apiClient";

// ---------------------------------------------------------
// GET ALL CUSTOMERS
// API: GET /api/Customers
// ---------------------------------------------------------
const getCustomers = async () => {
  const response = await apiClient.get("/Customers");

  return response.data;
};

// ---------------------------------------------------------
// GET CUSTOMER BY ID
// API: GET /api/Customers/{id}
// ---------------------------------------------------------
const getCustomerById = async (id) => {
  const response = await apiClient.get(`/Customers/${id}`);

  return response.data;
};

// ---------------------------------------------------------
// CREATE CUSTOMER
// API: POST /api/Customers
//
// customer object expected by backend:
// {
//   name: "...",
//   address: "...",
//   phoneNumber: "..."
// }
// ---------------------------------------------------------
const createCustomer = async (customer) => {
  const response = await apiClient.post("/Customers", customer);

  return response.data;
};

// ---------------------------------------------------------
// Export all customer API functions together.
//
// The Redux slice will import this object and call:
// customerService.getCustomers()
// customerService.getCustomerById()
// customerService.createCustomer()
// ---------------------------------------------------------
export default {
  getCustomers,
  getCustomerById,
  createCustomer,
};
