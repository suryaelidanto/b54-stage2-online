import { ThreadCard } from "@/features/home/components/thread-card";
import { ThreadEntity } from "@/features/home/entities/thread";
import { CreateThreadDTO } from "@/features/home/types/thread";
import { createThreadSchema } from "@/features/home/validators/thread";
import { api } from "@/libs/api";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

function HomePage() {
  const { data: threads, refetch } = useQuery<ThreadEntity[]>({
    queryKey: ["threads"],
    queryFn: getThreads,
  });

  const { register, handleSubmit } = useForm<CreateThreadDTO>({
    mode: "onSubmit",
    resolver: zodResolver(createThreadSchema),
  });

  async function getThreads() {
    const response = await api.get("/threads", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return response.data;
  }

  const { mutateAsync } = useMutation<
    ThreadEntity,
    AxiosError,
    CreateThreadDTO
  >({
    mutationFn: (newThread) => {
      const formData = new FormData();
      formData.append("content", newThread.content);
      formData.append("image", newThread.image[0]);
      return api.post("/threads", formData);
    },
  });

  const onSubmit: SubmitHandler<CreateThreadDTO> = async (data) => {
    try {
      await mutateAsync(data);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

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
    </Box>
  );
}

export default HomePage;
