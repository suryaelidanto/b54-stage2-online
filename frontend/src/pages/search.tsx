import { UserSearch } from "@/features/search/types/search";
import { api } from "@/libs/api";
import { Avatar, Box, Button, Flex, HStack, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { RiUserSearchLine } from "react-icons/ri";




function SearchPage() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearchInput] = useDebounce(searchInput, 400);
  const [searchData, setSearchData] = useState<UserSearch[]>([]);
  
    const [isFollowing, setIsFollowing] = useState(false);
  
    const handleFollowClick = () => {
      setIsFollowing(!isFollowing);
    };

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


  const buttonStyle = (isFollowing: boolean) => ({
    backgroundColor: isFollowing ? 'white' : '#1d1d1d',
    color: isFollowing ? 'black' : 'white',
    borderRadius : "50px",
    padding: '8px 16px',
    cursor: 'pointer',
    justifyContent : "end",
    border : "2px solid white",
   
  });

  return (
    <Box  w="600px" m='auto' bg="#1d1d1d" h="728px"   border="1px solid rgb(47, 51, 54)" borderTop="none" borderBottom="none" padding="40px 10px 0px 10px" color="white" overflow="scroll">
        <InputGroup mb="20px" >
            <InputLeftElement pointerEvents='none'>
                <RiUserSearchLine size="23px" color='#B2B2B2' />
            </InputLeftElement>
            <Input onChange={handleChange} borderRadius="20px" border="none" type='tel' placeholder='Search your friend' color="#B2B2B2" bg="#3F3F3F" />
        </InputGroup>
        {searchData.map((user) => (
          <Flex mb="15px"  gap={3}>
            <HStack>
            <Avatar 
              width={"50px"}
              height={"50px"} 
              name={user.fullName} 
              src={user.photoProfile} />
            <Box w="410px">
              <Text fontWeight={"bold"}>{user.fullName}</Text>
              <Text mt={"0px"} color={"gray"}>
                @{user.username}
              </Text>
              <Text mt={"0px"}>{user.bio}</Text>
            </Box>

            <Button
              onClick={handleFollowClick}
              style={buttonStyle(isFollowing)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            </HStack>
          </Flex>
        ))}
    </Box>
  );
}


export default SearchPage;
