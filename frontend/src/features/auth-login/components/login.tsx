import { api } from "@/libs/api";
import { Box, Button, Input, BoxProps, Image } from "@chakra-ui/react";
import React, { useState } from "react";

interface LoginFormProps extends BoxProps {}

type LoginForm = {
  email: string;
  password: string;
  photoPicture: File | undefined;
};

export function LoginForm(props: LoginFormProps) {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    photoPicture: undefined,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    const file = (event.target.files as FileList)[0];

    setImagePreview(URL.createObjectURL(file));

    if (file)
      return setForm({
        ...form,
        photoPicture: file,
      });

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit() {
    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("photoPicture", form.photoPicture as File);

      const response = await api.post("/auth/login", formData);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", response.data.token);
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
      {imagePreview && <Image src={imagePreview} height="200px" />}
      <Input
        name="image"
        type="file"
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
