import { ThreadEntity } from "@/features/home/entities/thread";
import { CreateThreadDTO } from "@/features/home/types/thread";
import { createThreadSchema } from "@/features/home/validators/thread";
import { api } from "@/libs/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

export const useHomePage = () => {
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

  return {
    threads,
    register,
    handleSubmit,
    onSubmit,
  };
};
