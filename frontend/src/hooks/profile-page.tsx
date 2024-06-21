import { ThreadEntity } from "@/features/home/entities/thread";
import { api } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";

export async function fetchProfile(){
    try {
        const response = await api.get("/current-user");
    return response.data;
    } catch(error){
        return error;
    }
}

export async function getThreads() {
    const response = await api.get("/threads");
    return response.data;
  }

export const profilePage = () => {
    const { data: threads } = useQuery<ThreadEntity[]>({
        queryKey: ["threads"],
        queryFn: getThreads,
      });
    
    const { data: profileData  } = useQuery<editProfileForm>({
        queryKey: ["profile"],
        queryFn: fetchProfile,
        });

    return {
        threads,
        profileData
        };
}