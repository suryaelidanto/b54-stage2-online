import { api } from "@/libs/api";
import { SET_USER } from "@/redux/slices/auth";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LoginForm } from "../types/login-form";
import { loginSchema } from "../validators/login-form";

export const useLoginForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.token;
      const user = response.data.user;
      if (token) localStorage.setItem("token", response.data.token);
      if (user) {
        dispatch(SET_USER(user));
        toast({
          title: "Login success!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
    } catch (error) {
      toast({
        title: "Email / password is wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
