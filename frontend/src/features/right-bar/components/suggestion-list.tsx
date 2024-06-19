import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface SuggestionProps {
  image: string;
  name: string;
  username: string;
}

export function SuggestionList({ image, name, username }: SuggestionProps) {
  const [isFollow, setIsFollow] = useState<boolean>(true);

  return (
    <>
      <Box
        pb="10px"
        color="white"
        bg="rgb(40, 40, 40)"
        borderRadius="10px"
        borderBottom="1px solid grey"
        mt="10px"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="10px">
            <Avatar size="sm" src={image}></Avatar>
            <Box>
              <Text fontSize="12px" fontWeight="bold">
                {name}
              </Text>
              <Text fontSize="12px">{username}</Text>
            </Box>
          </Box>
          <Box>
            {isFollow ? (
              <>
                <Button
                  bg="blue.500"
                  size="sm"
                  w="100%"
                  color="white"
                  fontSize="13px"
                  borderRadius="20px"
                  _hover={{ bg: "blue.200" }}
                  onClick={() => setIsFollow(false)}
                >
                  Follow
                </Button>
              </>
            ) : (
              <>
                <Button
                  bg="blue.500"
                  size="sm"
                  w="100%"
                  color="white"
                  fontSize="13px"
                  borderRadius="20px"
                  _hover={{ bg: "blue.200" }}
                  onClick={() => setIsFollow(true)}
                >
                  Followed
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
