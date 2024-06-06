import { Box, Button, Image, Text, BoxProps } from "@chakra-ui/react";
import { Heart, MessageSquareText } from "lucide-react";
import { ThreadEntity } from "../entities/thread";

interface ThreadCardProps extends BoxProps {
  thread: ThreadEntity;
}

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <Box display={"flex"} gap={3}>
      <Image
        src={""}
        width={"30px"}
        height={"30px"}
        borderRadius={"100%"}
        border={"2px solid white"}
      />
      <Box>
        <Box display={"flex"} gap={2}>
          <Text fontWeight={"bold"}>Indah Pra Karya</Text>
          <Text>@indahpra</Text>
          <Text>4h</Text>
        </Box>

        <Text mt={"10px"}>{thread.content}</Text>
        <Image src={thread.image} height={"200px"} />

        <Button backgroundColor={"transparent"} color={"white"}>
          <Heart
            size={20}
            style={{ marginRight: "5px" }}
            fill={"transparent"}
          />
          <Text>36</Text>
        </Button>

        <Button backgroundColor={"transparent"} color={"white"}>
          <MessageSquareText
            size={20}
            style={{ marginRight: "5px" }}
            fill="transparent"
          />
          <Text>381 Replies</Text>
        </Button>
      </Box>
    </Box>
  );
}
