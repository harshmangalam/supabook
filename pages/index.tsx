import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
export default function Home() {
  return (
    <Container>
      {/* posts  */}
      <SimpleGrid spacing={4}>
        {[...new Array(5)].map((post) => (
          <Box bg={useColorModeValue("gray.100", "gray.700")} rounded="md">
            <HStack justify={"space-between"} px={4} py={2}>
              <HStack spacing={4}>
                <Avatar src="https://avatars.githubusercontent.com/u/57381638?v=4" />
                <Heading fontSize={"lg"}>Harsh</Heading>
              </HStack>

              <IconButton
                size="sm"
                icon={<BiDotsHorizontalRounded size={18} />}
                aria-label="Actions"
              />
            </HStack>

            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75CtS0Dxo_w6wYNSfg2sjkMRNq7dVUwiiCw&usqp=CAU"
              }
              w="full"
              h={"400px"}
            />

            <HStack px={4} py={4}>
              <IconButton
                aria-label="Like"
                icon={<AiOutlineHeart size={20} />}
              />

              <IconButton
                aria-label="Comment"
                icon={<VscComment size={20} />}
              />
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
