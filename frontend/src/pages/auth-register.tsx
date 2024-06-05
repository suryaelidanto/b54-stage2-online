import CircleLogo from "@/assets/logo.svg";
import { RegisterForm } from "@/features/auth-register/components/register-form";
import { Box, Image, Text } from "@chakra-ui/react";

function RegisterPage() {
  return (
    <Box
      display={"flex"}
      height={"75vh"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <Box marginBottom={"15px"}>
          <Image src={CircleLogo} height={"20px"} />
          <Text fontWeight={"bold"} fontSize={"30px"} color={"white"}>
            Create account Circle
          </Text>
        </Box>
        <RegisterForm width={"500px"} />
      </Box>
    </Box>
  );
}

export default RegisterPage;
