import { ThreadCard } from "@/features/home/components/thread-card";
import { useHomePage } from "@/hooks/use-home-page";
import { Box, Button, Input, Text, Flex, Image } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";

function HomePage() {
  const { threads, register, handleSubmit, onSubmit } = useHomePage();

  return (
    <Box display={"flex"} width={"100%"} justifyContent={"center"}>
      <Box maxWidth={"500px"}>
        <Text fontWeight={"bold"} fontSize={"30px"}>
          Home
        </Text>
        <Flex alignItems={'center'} p={'20px'} borderBottom={'1px solid grey'}>
                <Image width={'35px'} height={'35px'} borderRadius={'50%'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOs9pBGGQuGe0JKeFg1XegK87RXxs1mIHyyg&s" alt="img-suggested" />
                <Box width={'100%'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex alignItems={'center'}>
                    <Input placeholder={'What is happening?!'} border={'transparent'} {...register('content')} />
                    <Input type="file" display={'none'} id="fileInput" {...register('image')} />
                    <label htmlFor="fileInput">
                      <LuImagePlus style={{marginRight : '10px', color : 'grey', fontSize : '30px'}}/>
                    </label>
                    <Button type={'submit'} mr={'10px'} backgroundColor={'green'} color={'white'} p={'1px 20px'} borderRadius={'15px'}>Post</Button>
                    </Flex>
                </form>
                </Box>
            </Flex>
        <Box mt={"20px"}>
          {threads?.map((thread) => <ThreadCard thread={thread} />)}
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
