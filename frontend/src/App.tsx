import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import { api } from "./libs/api";
import LoginPage from "./pages/auth-login";
import RegisterPage from "./pages/auth-register";
import { FollowPage } from "./pages/follows";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import { SET_USER } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { data: authUser, isPending } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const token = localStorage.token;
      if (token) {
        try {
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
          return response.data;
        } catch (error) {
          localStorage.removeItem("token");
          toast({
            title: "User not authenticated!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
  });

  if (isPending)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <Routes>
      <Route path="/auth/login" element={
        !authUser ?  <LoginPage /> : <Navigate to={"/"} />  
        } />
      <Route path="/auth/register" element={
        !authUser ?  <RegisterPage /> : <Navigate to={"/"} />  
      } />
      <Route path="/follows" element={<FollowPage />} />

      <Route path="/" element={<RootLayout />}>
        <Route
          path="/"
          element={
            authUser ? <HomePage /> : <Navigate to={"/auth/login"} replace />
          }
        />
        <Route
          path="/search"
          element={
            authUser ? <SearchPage /> : <Navigate to={"/auth/login"} replace />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
