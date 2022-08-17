import { Box, Container, Image } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Container>
      <Box pos={"relative"}>
        <Image
          src="https://images.unsplash.com/photo-1660666079328-3d5966c12536?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          w={"full"}
          h={"400px"}
        />
      </Box>
    </Container>
  );
}
