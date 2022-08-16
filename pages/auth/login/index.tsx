import {
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Container,
  Button,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
export default function AuthSigninRoute() {
  return (
    <Container>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
          <Text fontSize={"lg"} maxW="md" textAlign={"center"}>
            Login your account using different type of authentication providers
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"md"}
          borderWidth={"2px"}
          p={4}
        >
          <SimpleGrid columns={2} spacing={2} mb={2}>
            <Link href="/auth/login/login-with-email" passHref>
              <Button as="a" colorScheme="purple">
                Login With Email
              </Button>
            </Link>
            <Link href="/auth/login/login-with-magic-link" passHref>
              <Button as="a" colorScheme="pink">
                Login With Maginc Link
              </Button>
            </Link>
          </SimpleGrid>

          <Link href={"/auth/signup"} passHref>
            <Button
              as="a"
              variant={"link"}
              colorScheme="twitter"
              size="sm"
              mt={3}
              w="full"
            >
              Create new account
            </Button>
          </Link>
        </Box>
      </Stack>
    </Container>
  );
}
