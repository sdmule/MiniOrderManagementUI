import AppRouter from "./routes/AppRouter.jsx";

// =========================================================
// Root Application Component
// =========================================================
//
// App itself does not contain individual pages.
//
// Its responsibility is to hand control over to the
// application's routing system.
//
// AppRouter decides which page should be rendered based
// on the current URL.
// =========================================================

function App() {
  return <AppRouter />;
}

export default App;
