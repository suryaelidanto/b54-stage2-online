import { Thread } from "@/components/thread/thread";
import { Box, VStack } from "@chakra-ui/react";

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
