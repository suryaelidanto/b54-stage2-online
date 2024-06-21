import { Button } from "@chakra-ui/react";
import { ButtonProps } from "../../types/types";

export default function SolidButton({
  width,
  height,
  fontSize,
  text,
}: ButtonProps) {
  return (
    <Button
      width={width}
      height={height}
      fontSize={fontSize}
      color={"#FFF"}
      background={"#04A51E"}
      border={"none"}
      borderRadius={25}
      fontWeight={"500"}
      _hover={{ background: "#04A51E" }}
    >
      {text}
    </Button>
  );
}
