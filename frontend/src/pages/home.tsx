import { ThreadCard } from "@/features/home/components/thread-card";
import { SuggestionTab } from "@/features/right-bar/components/suggestion-tab";
import { useHomePage } from "@/hooks/use-home-page";
import { Box, Button, Input, Text } from "@chakra-ui/react";

function HomePage() {
  const { threads, register, handleSubmit, onSubmit } = useHomePage();

  return (
    <Box display={"flex"} width={"100%"} justifyContent={"center"}>
      <Box maxWidth={"500px"}>
        <Text fontWeight={"bold"} fontSize={"30px"}>
          Home
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("content")} />
          <Input type="file" {...register("image")} />
          <Button type="submit" backgroundColor={"brand.primary"}>
            Post
          </Button>
        </form>
        <Box mt={"20px"}>
          {threads?.map((thread) => <ThreadCard thread={thread} />)}
        </Box>
      </Box>

      <SuggestionTab />
    </Box>
  );
}

export default HomePage;
