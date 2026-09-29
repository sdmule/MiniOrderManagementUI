import axios from "axios";

// ---------------------------------------------------------
// Central Axios instance
//
// Instead of writing the complete API URL every time:
//
// https://localhost:7172/api/Customers
//
// we configure the common API URL once here.
//
// Then our services can simply use:
//
// apiClient.get("/Customers")
// apiClient.get("/Customers/1")
// apiClient.post("/Customers", customer)
// ---------------------------------------------------------
const apiClient = axios.create({
  baseURL: "https://localhost:7172/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------
// Export the configured Axios instance.
//
// All API services should use this instance instead of
// importing axios directly.
// ---------------------------------------------------------
export default apiClient;
