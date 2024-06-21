import { fetchProfile, getThreads, profilePage } from "@/hooks/profile-page";
import { Box, Button, Divider, Flex, FormControl, FormHelperText, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { BsImage } from "react-icons/bs";


export function ProfilePage(){
    const { profileData} = profilePage();
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        fetchProfile();
    },[])
    
    useEffect(() => {
        getThreads();
        },[])

    return (
        <>
        <Box width={'40%'} bgColor={"#242424"} margin={"auto"} borderRadius={'12px'}>
        <Flex flexDirection={'column'} alignItems={'start'} width={'100%'} borderRadius={'14px'} justifyContent={'space-around'} pt={'1rem'} mt={'2rem'} mx={'auto'}>
        <Heading as={'h3'} size={'md'} marginStart={'1.33rem'} mb={'1rem'} color={'whitesmoke'} fontWeight={'medium'}>My Profile</Heading>
            <Box width={'90%'} marginX={'auto'}>
                
                {/* Image masih dimasukkan dummy secara manual ke database */}
                <Image src={profileData?.photoProfile ? profileData?.photoProfile : "null"} width={'720px'} height={'120px'} objectFit={'cover'} borderRadius={'12px'}/>
                <Image borderRadius={'50%'} width={'64px'} height={'64px'} objectFit={'cover'} src={profileData && profileData?.photoProfile} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid #242424`}/>  

                <Button onClick={onOpen} colorScheme='gray' size={'sm'} variant='outline' color={'white'} zIndex={4} position={'relative'} top={'-3rem'} left={'27rem'} borderRadius={'14px'}>Edit Profile</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <ModalContent bgColor={'#242424'} maxWidth={'720px'} borderRadius={'12px'} px={'1.5rem'} py={'1rem'} mt={'2rem'}>
                    <ModalHeader color={'white'}>Edit Profile</ModalHeader>
                    <ModalCloseButton color={'white'} mt={'0.5rem'} me={'0.5rem'} />
                    <ModalBody>
                    <Flex flexDirection={'column'}>
                        <Box width={'100%'} marginX={'auto'} height={'60%'} mb={'0.5rem'}>
                        <Image src={ profileData && profileData?.photoProfile} width={'720px'} height={'120px'} objectFit={'cover'} borderRadius={'12px'}/>
                        <Image borderRadius={'50%'} width={'72px'} height={'72px'} objectFit={'cover'} src={ profileData && profileData?.photoProfile} zIndex={4} position={'relative'} top={'-2rem'} left={'1rem'} border={`4px solid #242424`}/>
                        {/* <Text color={"error.primary"}>{errors.photo_profile && errors.photo_profile.message}</Text> */}
                        </Box>
                        <FormControl display={'flex'} width={'100%'} flexDirection={'column'} alignItems={'start'} marginBottom={'0.33rem'} color={'white'}>
                            <Box mb={'1rem'} width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'grey'} ms={'1rem'}>Name</FormHelperText>
                            <Input border={'none'} type='text' placeholder="John Doe" isRequired/>
                            </Box>
                            <Box mb={'1rem'} width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'grey'} ms={'1rem'}>Username</FormHelperText>
                            <Input border={'none'} type='text' placeholder="@john_doe" isRequired/>
                            </Box>
                            <Box width={'100%'} border={`1px solid grey`} p={'0.33rem'} borderRadius={'12px'}>
                            <FormHelperText fontSize={'0.75rem'} color={'grey'} ms={'1rem'}>Bio</FormHelperText>
                            <Textarea width={'100%'} minHeight={'80px'} border={'none'} resize={'none'} textDecoration={'none'} marginEnd={'1rem'}></Textarea>
                            </Box>
                        </FormControl>
                    </Flex>
                    </ModalBody>
                    <ModalFooter>
                    <Box position="relative" display="inline-block">
                            <Input
                                type="file"
                                id="photo-input"
                                opacity="0"
                                position="absolute"
                                left="0"
                                top="0"
                                height="100%"
                                width="100%"
                                aria-hidden="true"
                            />
                            <IconButton
                                as="label"
                                htmlFor="photo-input"
                                colorScheme="green"
                                aria-label="Add Picture"
                                size="sm"
                                variant="ghost"
                                fontSize="1.33rem"
                                icon={<BsImage />}
                                marginEnd="0.5rem"
                                cursor="pointer"
                            />
                            </Box>
                    <Button  colorScheme="green" size={'md'} type="submit" borderRadius={'20px'} width={'72px'}>Save</Button>
                    </ModalFooter>
                    </ModalContent>
                    {/* </form> */}
                </Modal>
            </Box>
            <Flex flexDirection={'column'} alignItems={'start'} width={'90%'} marginX={'auto'} gap={'0.33rem'}>
                <Heading as={'h3'} size={'md'} color={'whitesmoke'}>{profileData?.fullName}</Heading>
                <Text fontSize={'1rem'}>@{profileData?.username}</Text>
                <Text color={'white'}>{profileData?.bio}</Text>
            </Flex>
            <Flex justifyContent={'start'} width={'90%'} gap={'0.33rem'} marginX={'auto'} color={'white'} fontSize={'small'}>
                <Text fontWeight={'bold'}>{profileData?.followersCount}</Text>
                <Text me={'0.33rem'}>Following</Text>
                <Text fontWeight={'bold'}>{profileData?.followingsCount}</Text>
                <Text>Followers</Text>
            </Flex>
        <Divider orientation='horizontal' borderColor={'rgb(110, 110, 110, 0.333)'} mt={'1rem'}/>
        {/* Need to get specified threads from current user */}
        {/* There is error in the thread.userphoto */}
        {/* <Box mt={"20px"} ms={'1rem'}>
         {threads?.map((thread) => <ThreadCard thread={thread} />)}
        </Box> */}
        </Flex>
        </Box>
       </>
    )
}