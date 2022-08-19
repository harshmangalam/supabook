import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { useAuthContext } from "../context/auth";
import PostAction from "./Post/PostAction";

interface Props {
  id: string;
  created_at: string;
  content: string;
  media: any;
  author: any;
}
export default function Post({
  id,
  created_at,
  content,
  media,
  author,
}: Props) {
  const authContext = useAuthContext();
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded="md"
      borderWidth={"2px"}
    >
      <HStack justify={"space-between"} px={4} py={2}>
        <Link href={author?.id} passHref>
          <HStack as="a" spacing={4}>
            <Avatar src={author?.avatar?.url} />
            <VStack spacing={0} align="start">
              <Heading fontSize={"lg"}>{author.name}</Heading>
              <Text fontSize={"sm"}>{new Date(created_at).toDateString()}</Text>
            </VStack>
          </HStack>
        </Link>

        {authContext?.user?.id === author.id && (
          <PostAction id={id} media={media} />
        )}
      </HStack>
      <Divider />

      {media && <Image src={media.url} w="full" h={"400px"} loading="lazy" />}
      {/* <HStack justify={"space-between"}>
        <HStack px={4} py={2}>
          <AiOutlineHeart size={16} />
          <Text fontSize={"sm"}>{18}</Text>
          <Text fontSize={"sm"}>Likes</Text>
        </HStack>
      </HStack>
      <Divider /> */}
      {content && (
        <>
          <Text p={4}>{content}</Text>

          <Divider />
        </>
      )}

      {authContext?.user && (
        <>
          {/* <HStack px={4} py={4}>
            <IconButton
              size={"sm"}
              aria-label="Like"
              icon={<AiOutlineHeart size={20} />}
            />
          </HStack> */}
        </>
      )}
    </Box>
  );
}
