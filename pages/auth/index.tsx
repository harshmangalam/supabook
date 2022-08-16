import {
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Container,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
export default function AuthRoute() {
  return (
    <Container>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Authenticate</Heading>
          <Text fontSize={"lg"}  maxW="md" textAlign={"center"}>
            Authenticate your account using different type of authentication providers
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"md"}
          p={4}
          borderWidth={"2px"}
        >
          <SimpleGrid columns={2} spacing={4}>
            <Link href="/auth/login" passHref>
              <Button as="a" colorScheme="blue">
                Signin
              </Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button as="a" colorScheme="green">
                Signup
              </Button>
            </Link>
          </SimpleGrid>
        </Box>
      </Stack>
    </Container>
  );
}
