import { Button } from "@chakra-ui/react";

export function Follow() {
  return (
    <>
      <Button
        px="12"
        py="3"
        boxSize="6"
        rounded="20"
        position="relative"
        fontSize="12"
        border="1px solid white"
        bg="#262626"
        color="white"
        fontWeight="md"
        _hover={{ bg: "white", color: "black" }}
      >
        Follow
      </Button>
    </>
  );
}
