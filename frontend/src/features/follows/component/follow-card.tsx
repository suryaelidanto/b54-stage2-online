import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Follow } from "./button/follow";

export function FollowCard() {
  return (
    <>
      <Box m="5" w="xl">
        <Heading fontSize="xl" mb="5" fontWeight="medium">
          Follows
        </Heading>
        <Tabs isFitted variant={"unstyled"}>
          <TabList mb={"1em"}>
            <Tab>Followers</Tab>
            <Tab>Followings</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="brand.primary"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <Flex direction={"column"} gap={"2"} mt="2">
                <HStack>
                  <Avatar
                    boxSize="2em"
                    src="https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
                    <Text fontSize="14px">Richard Stevens</Text>
                    <Text fontSize="12px" color="grey">
                      @rich
                    </Text>
                    <Text fontSize="14px"></Text>
                  </VStack>
                  <Spacer />
                  <Follow />
                </HStack>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction={"column"} gap={"2"} mt="2">
                <HStack>
                  <Avatar
                    boxSize="2em"
                    src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                  <VStack spacing="0" alignItems={"start"} mt="4" ms="1">
                    <Text fontSize="14px">George Stevens</Text>
                    <Text fontSize="12px" color="grey">
                      @george
                    </Text>
                    <Text fontSize="14px">Hellow World</Text>
                  </VStack>
                  <Spacer />
                  <Follow></Follow>
                </HStack>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
