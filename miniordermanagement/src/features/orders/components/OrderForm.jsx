import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchCustomers } from "../../customers/customerSlice";

import {
  selectCustomers,
  selectCustomerListStatus,
} from "../../customers/customerSelectors";

import { createOrder } from "../orderSlice";

import { selectOrderCreateStatus, selectOrderError } from "../orderSelectors";

// ============================================================
// ORDER FORM
// ============================================================
//
// Responsible for:
// - Loading customers
// - Selecting a customer
// - Selecting order date
// - Entering total amount
// - Creating the order
// - Showing success/error messages
// - Allowing the user to return to Orders manually
//
// IMPORTANT:
// After successful creation, we stay on this page.
// The user decides when to click "Back to Orders".
// ============================================================

function OrderForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================================================
  // REDUX STATE
  // ============================================================

  const customers = useSelector(selectCustomers);

  const customerListStatus = useSelector(selectCustomerListStatus);

  const createStatus = useSelector(selectOrderCreateStatus);

  const error = useSelector(selectOrderError);

  // ============================================================
  // LOCAL FORM STATE
  // ============================================================

  const [customerId, setCustomerId] = useState("");

  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [totalAmount, setTotalAmount] = useState("");

  // ============================================================
  // LOAD CUSTOMERS
  // ============================================================
  //
  // Customers are required for the Customer dropdown.
  //
  // We only call the API when customer data has not already
  // been loaded.
  // ============================================================

  useEffect(() => {
    if (customerListStatus === "idle") {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customerListStatus]);

  // ============================================================
  // HANDLE FORM SUBMISSION
  // ============================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ----------------------------------------------------------
    // Prepare request body expected by backend.
    // ----------------------------------------------------------

    const order = {
      customerId: Number(customerId),
      orderDate: orderDate,
      totalAmount: Number(totalAmount),
    };

    // ----------------------------------------------------------
    // Call POST /api/Orders through Redux thunk.
    // ----------------------------------------------------------

    try {
      await dispatch(createOrder(order)).unwrap();

      // --------------------------------------------------------
      // Order created successfully.
      //
      // We stay on the same page.
      // --------------------------------------------------------

      setCustomerId("");

      setOrderDate(new Date().toISOString().split("T")[0]);

      setTotalAmount("");
    } catch {
      // Error is already stored in Redux.
    }
  };

  // ============================================================
  // CANCEL
  // ============================================================
  //
  // Cancel does not create an order.
  // It immediately returns to the Orders page.
  // ============================================================

  const handleCancel = () => {
    navigate("/orders");
  };

  // ============================================================
  // BACK TO ORDERS
  // ============================================================
  //
  // This button is shown after successful order creation.
  // Navigation is controlled by the user.
  // ============================================================

  const handleBackToOrders = () => {
    navigate("/orders");
  };

  // ============================================================
  // STYLES
  // ============================================================

  const pageStyle = {
    padding: "40px",
    minHeight: "calc(100vh - 100px)",
    backgroundColor: "#f5f7fa",
  };

  const cardStyle = {
    maxWidth: "650px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "35px 40px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
  };

  const headingStyle = {
    margin: "0 0 30px 0",
    fontSize: "32px",
    fontWeight: "600",
    color: "#222222",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "22px",
  };

  const labelStyle = {
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333333",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    fontSize: "16px",
    border: "1px solid #cccccc",
    borderRadius: "5px",
    outline: "none",
    backgroundColor: "#ffffff",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  };

  const primaryButtonStyle = {
    padding: "11px 22px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#1976d2",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "500",
    cursor: createStatus === "loading" ? "not-allowed" : "pointer",
    opacity: createStatus === "loading" ? 0.7 : 1,
  };

  const secondaryButtonStyle = {
    padding: "11px 22px",
    border: "1px solid #999999",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    color: "#333333",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
  };

  const successContainerStyle = {
    padding: "20px",
    borderRadius: "6px",
    backgroundColor: "#e8f5e9",
    border: "1px solid #81c784",
    marginBottom: "20px",
  };

  const successTextStyle = {
    margin: "0 0 15px 0",
    color: "#2e7d32",
    fontSize: "16px",
    fontWeight: "500",
  };

  const errorStyle = {
    padding: "12px 15px",
    marginBottom: "20px",
    borderRadius: "5px",
    backgroundColor: "#ffebee",
    border: "1px solid #ef9a9a",
    color: "#c62828",
    fontSize: "15px",
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Create Order</h1>

        {/* ====================================================
            SUCCESS MESSAGE
            ==================================================== */}

        {createStatus === "succeeded" && (
          <div style={successContainerStyle}>
            <p style={successTextStyle}>Order created successfully.</p>

            <button
              type="button"
              onClick={handleBackToOrders}
              style={primaryButtonStyle}
            >
              Back to Orders
            </button>
          </div>
        )}

        {/* ====================================================
            ERROR MESSAGE
            ==================================================== */}

        {createStatus === "failed" && (
          <div style={errorStyle}>{error || "Failed to create order."}</div>
        )}

        {/* ====================================================
            CREATE ORDER FORM
            ==================================================== */}

        {createStatus !== "succeeded" && (
          <form onSubmit={handleSubmit}>
            {/* ==================================================
                CUSTOMER
                ================================================== */}

            <div style={formGroupStyle}>
              <label htmlFor="customer" style={labelStyle}>
                Customer
              </label>

              <select
                id="customer"
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
                required
                style={inputStyle}
                disabled={customerListStatus === "loading"}
              >
                <option value="">
                  {customerListStatus === "loading"
                    ? "Loading customers..."
                    : "Select Customer"}
                </option>

                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ==================================================
                ORDER DATE
                ================================================== */}

            <div style={formGroupStyle}>
              <label htmlFor="orderDate" style={labelStyle}>
                Order Date
              </label>

              <input
                id="orderDate"
                type="date"
                value={orderDate}
                onChange={(event) => setOrderDate(event.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* ==================================================
                TOTAL AMOUNT
                ================================================== */}

            <div style={formGroupStyle}>
              <label htmlFor="totalAmount" style={labelStyle}>
                Total Amount
              </label>

              <input
                id="totalAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="1000.00"
                value={totalAmount}
                onChange={(event) => setTotalAmount(event.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* ==================================================
                ACTION BUTTONS
                ================================================== */}

            <div style={buttonContainerStyle}>
              <button
                type="submit"
                disabled={createStatus === "loading"}
                style={primaryButtonStyle}
              >
                {createStatus === "loading" ? "Creating..." : "Create Order"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                style={secondaryButtonStyle}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrderForm;
