import { ThreadCard } from "@/features/home/components/thread-card";
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
        <form onSubmit={handleSubmit(onSubmit)} style={{gap: 10, display:"flex", flexDirection:"column"}}>
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
    </Box>
  );
}

export default HomePage;
