import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

function AppLayout() {
  return (
    <div>
      <Header />

      <Sidebar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
