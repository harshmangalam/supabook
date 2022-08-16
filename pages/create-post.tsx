import {
  Box,
  Container,
  FormErrorMessage,
  Heading,
  HStack,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import UploadMedia from "../components/Post/UploadMedia";

export default function CreatePostRoute() {
  return (
    <Container>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"outline"}
        p={8}
        mt={4}
      >
        <Heading fontSize={"4xl"} textAlign="center">
          Create Post
        </Heading>

        <Stack spacing={4} mt={8}>
          <Textarea rows={8} />
          <HStack spacing={4}>
            <UploadMedia />
          </HStack>
        </Stack>
      </Box>
    </Container>
  );
}
