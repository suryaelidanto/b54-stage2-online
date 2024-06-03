import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/about";
import LoginPage from "./pages/auth-login";
import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";

function App() {
  const [isLogin] = useState<boolean>(true);

  const PrivateRoute = () => {
    if (isLogin) return <Outlet />;

    return <Navigate to={"/login"} />;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<LoginPage />} />

      <Route path="/about" element={<AboutPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
