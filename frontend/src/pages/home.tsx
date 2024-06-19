import { Box, VStack } from "@chakra-ui/react";
import { Thread } from "@/components/thread/thread";

function HomePage() {
  return (
    <Box>
      <VStack>
        <Thread />
      </VStack>
    </Box>
  );
}

export default HomePage;
