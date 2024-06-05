import { api } from "@/libs/api";
import { Box, BoxProps, Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps extends BoxProps {}

type RegisterForm = {
  email: string;
  password: string;
};

export function RegisterForm(props: RegisterFormProps) {
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

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
      await api.post("/auth/register", form);
      navigate("/auth/login");
      toast({
        title: "Register success!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Register failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"} {...props}>
      <Input
        name="fullName"
        placeholder="Full Name"
        color="white"
        onChange={handleChange}
      />
      <Input
        name="username"
        placeholder="Username"
        color="white"
        onChange={handleChange}
      />
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
        Create
      </Button>
    </Box>
  );
}
