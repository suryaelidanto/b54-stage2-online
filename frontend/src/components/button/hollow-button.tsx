import { Button } from "@chakra-ui/react";
import { ButtonProps } from "../../types/types";

export default function HollowButton({
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
      border={"1px solid #FFF"}
      borderRadius={25}
      fontWeight={"500"}
      _hover={"none"}
    >
      {text}
    </Button>
  );
}
