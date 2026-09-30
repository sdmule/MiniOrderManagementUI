import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchOrderById,
  clearSelectedOrder,
} from "../features/orders/orderSlice";

import {
  selectSelectedOrder,
  selectOrderDetailsStatus,
  selectOrderError,
} from "../features/orders/orderSelectors";

// ============================================================
// ORDER DETAILS PAGE
// ============================================================
//
// Flow:
//
// 1. User clicks VIEW from OrderTable
// 2. Navigate to /orders/{id}
// 3. useParams() gets the order ID from the URL
// 4. Dispatch fetchOrderById(id)
// 5. Redux thunk calls:
//       GET /api/Orders/{id}
// 6. API response is stored in selectedOrder
// 7. Display the order details
// ============================================================

function OrderDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ----------------------------------------------------------
  // Get order details from Redux
  // ----------------------------------------------------------

  const order = useSelector(selectSelectedOrder);

  const status = useSelector(selectOrderDetailsStatus);

  const error = useSelector(selectOrderError);

  // ----------------------------------------------------------
  // Fetch order details when page loads
  //
  // Example:
  // /orders/1
  //
  // id = "1"
  //
  // dispatch(fetchOrderById(1))
  //
  // This eventually calls:
  // GET https://localhost:7172/api/Orders/1
  // ----------------------------------------------------------

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }

    // --------------------------------------------------------
    // Cleanup when leaving the details page
    //
    // This prevents the previously selected order from
    // remaining in Redux when we navigate to another page.
    // --------------------------------------------------------

    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, id]);

  // ----------------------------------------------------------
  // Loading state
  // ----------------------------------------------------------

  if (status === "loading") {
    return <p>Loading order details...</p>;
  }

  // ----------------------------------------------------------
  // Error state
  // ----------------------------------------------------------

  if (status === "failed") {
    return (
      <div>
        <h2>Order Details</h2>

        <p>{error || "Failed to load order details."}</p>

        <button onClick={() => navigate("/orders")}>Back to Orders</button>
      </div>
    );
  }

  // ----------------------------------------------------------
  // No order found
  // ----------------------------------------------------------

  if (status === "succeeded" && !order) {
    return (
      <div>
        <h2>Order Details</h2>

        <p>Order not found.</p>

        <button onClick={() => navigate("/orders")}>Back to Orders</button>
      </div>
    );
  }

  // ----------------------------------------------------------
  // Order details UI
  // ----------------------------------------------------------

  return (
    <div>
      <h1>Order Details</h1>

      {order && (
        <div>
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>

          <p>
            <strong>Customer ID:</strong> {order.customerId}
          </p>

          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

          <p>
            <strong>Total Amount:</strong>{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(order.totalAmount)}
          </p>
        </div>
      )}

      <button onClick={() => navigate("/orders")}>Back to Orders</button>
    </div>
  );
}

export default OrderDetailsPage;
