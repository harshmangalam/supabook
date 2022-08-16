import {
  Box,
  Container,
  FormErrorMessage,
  Heading,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

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
        </Stack>
      </Box>
    </Container>
  );
}
