import { Heading } from "@chakra-ui/react";
import { CardProps } from "../../types/types";

export default function CardHeader({
  color = "#FFF",
  fontSize,
  fontWeight = "600",
  padding,
  text,
}: CardProps) {
  return (
    <Heading
      width="100%"
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      padding={padding}
    >
      {text}
    </Heading>
  );
}
