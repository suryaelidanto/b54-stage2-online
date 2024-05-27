import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import DashboardPage from "./pages/dashboard";
import { useState } from "react";

function App() {
  const [isLogin] = useState<boolean>(true);

  const PrivateRoute = () => {
    if (isLogin) return <Outlet />;

    return <Navigate to={"/login"} />;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
