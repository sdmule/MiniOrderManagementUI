import OrderForm from "../features/orders/components/OrderForm";

// ============================================================
// CREATE ORDER PAGE
// ============================================================
//
// This page is responsible only for displaying OrderForm.
//
// OrderForm handles:
// - Customer selection
// - Order date
// - Total amount
// - POST /api/Orders
// - Success message
// - Error message
// - User-controlled navigation back to Orders
// ============================================================

function CreateOrderPage() {
  return (
    <div>
      <OrderForm />
    </div>
  );
}

export default CreateOrderPage;
