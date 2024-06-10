import { UserSearch } from "@/features/search/types/search";
import { api } from "@/libs/api";
import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function SearchPage() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchInput] = useDebounce(searchInput, 400);
  const [searchData, setSearchData] = useState<UserSearch[]>([]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  async function getData() {
    const response = await api.get(`/users?search=${debouncedSearchInput}`);
    setSearchData(response.data);
  }

  useEffect(() => {
    getData();
  }, [debouncedSearchInput]);

  return (
    <Box display={"flex"} width={"100%"} justifyContent={"center"}>
      <Box maxWidth={"500px"}>
        <Input onChange={handleChange} />
        {searchData.map((user) => (
          <Box display={"flex"} gap={3}>
            <Image
              src={user.photoProfile}
              width={"30px"}
              height={"30px"}
              borderRadius={"100%"}
              border={"2px solid white"}
            />
            <Box>
              <Text fontWeight={"bold"}>{user.fullName}</Text>
              <Text mt={"10px"} color={"gray"}>
                {user.username}
              </Text>
              <Text mt={"10px"}>{user.bio}</Text>
            </Box>

            <Button
              backgroundColor={"transparent"}
              border={"2px solid white"}
              color={"white"}
            >
              <Text>Follow</Text>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SearchPage;
