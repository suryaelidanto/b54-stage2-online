import { Button } from "@chakra-ui/react";
import { ButtonProps } from "../../types/types";

export default function GhostButton({
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
      background={"transparent"}
      border={"none"}
      borderRadius={25}
      fontWeight={"500"}
      _hover={"none"}
    >
      {text}
    </Button>
  );
}
