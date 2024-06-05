import { Box, BoxProps, Button, Input, Text } from "@chakra-ui/react";
import { useLoginForm } from "../hooks/use-login-form";

interface LoginFormProps extends BoxProps {}

export function LoginForm(props: LoginFormProps) {
  const { handleSubmit, onSubmit, register, errors } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={"flex"} flexDirection={"column"} gap={"10px"} {...props}>
        <Input placeholder="Email" color="white" {...register("email")} />
        <Text color={"error.primary"}>{errors.email?.message}</Text>
        <Input
          type="password"
          placeholder="Password"
          color="white"
          {...register("password")}
        />
        <Text color={"error.primary"}>{errors.password?.message}</Text>

        <Button
          isDisabled={!!(errors.email?.message || errors.password?.message)}
          type="submit"
          backgroundColor={"brand.primary"}
          color={"white"}
        >
          Login
        </Button>
      </Box>
    </form>
  );
}
