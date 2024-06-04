import { api } from "@/libs/api";
import { SET_USER } from "@/redux/slices/auth";
import { Box, BoxProps, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface LoginFormProps extends BoxProps {}

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm(props: LoginFormProps) {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit() {
    try {
      const response = await api.post("/auth/login", form);
      const token = response.data.token;
      const user = response.data.user;

      if (token) localStorage.setItem("token", response.data.token);
      if (user) {
        dispatch(SET_USER(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"} {...props}>
      <Input
        name="email"
        placeholder="Email"
        color="white"
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        color="white"
        onChange={handleChange}
      />
      <Button
        backgroundColor={"brand.primary"}
        color={"white"}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
}
