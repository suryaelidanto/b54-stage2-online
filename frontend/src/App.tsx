import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { api } from "./libs/api";
import AboutPage from "./pages/about";
import LoginPage from "./pages/auth-login";
import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";
import { RootState } from "./redux/store";
import { SET_USER } from "./redux/slices/auth";
import RegisterPage from "./pages/auth-register";
import PostPage from "./pages/post";
import { useToast } from "@chakra-ui/react";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const PrivateRoute = () => {
    if (!isLoading) {
      if (currentUser.email) return <Outlet />;

      return <Navigate to={"/auth/login"} />;
    }
  };

  async function authCheck() {
    try {
      const token = localStorage.token;
      const response = await api.post(
        "/auth/check",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(SET_USER(response.data));
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoading(false);
      toast({
        title: "User not authenticated!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    const token = localStorage.token;
    if (token) authCheck();
  }, []);

  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/post" element={<PostPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
