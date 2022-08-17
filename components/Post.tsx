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
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import { useAuthContext } from "../context/auth";

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
        <HStack spacing={4}>
          <Avatar src={author.avatar_url} />
          <VStack spacing={0} align="start">
            <Heading fontSize={"lg"}>{author.name}</Heading>
            <Text fontSize={"sm"}>{new Date(created_at).toDateString()}</Text>
          </VStack>
        </HStack>

        <IconButton
          size="sm"
          icon={<BiDotsHorizontalRounded size={18} />}
          aria-label="Actions"
        />
      </HStack>

      <Link href={id} passHref>
        <Box as="a">
          <Image src={media} w="full" h={"400px"} loading="lazy" />
        </Box>
      </Link>
      <HStack justify={"space-between"}>
        <HStack px={4} py={2}>
          <AiOutlineHeart size={16} />
          <Text fontSize={"sm"}>{18}</Text>
          <Text fontSize={"sm"}>Likes</Text>
        </HStack>
        <HStack px={4} py={4}>
          <VscComment size={16} />
          <Text fontSize={"sm"}>{18}</Text>
          <Text fontSize={"sm"}>Comments</Text>
        </HStack>
      </HStack>
      <Divider />
      {content && <Text p={4}>{content}</Text>}

      {authContext?.user && (
        <>
          <Divider />
          <HStack px={4} py={4}>
            <IconButton
              size={"sm"}
              aria-label="Like"
              icon={<AiOutlineHeart size={20} />}
            />
            <IconButton
              size={"sm"}
              aria-label="Comment"
              icon={<VscComment size={20} />}
            />
          </HStack>
        </>
      )}
    </Box>
  );
}
