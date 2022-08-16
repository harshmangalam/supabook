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
  export default function AuthSigninRoute() {
    return (
      <Container>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Authenticate</Heading>
            <Text fontSize={"lg"} color={"gray.600"} maxW="md" textAlign={"center"}>
              Sign in your account using different type of authentication providers provided by supabase
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={4}
          >
            <SimpleGrid columns={2} spacing={4}>
              <Link href="/auth/signin/signin-with-email" passHref>
                <Button as="a" colorScheme="green">
                  Signin With Email
                </Button>
              </Link>
              <Link href="/auth/signin/signin-with-magic-link" passHref>
                <Button as="a" colorScheme="green">
                  Signin With Maginc Link
                </Button>
              </Link>
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    );
  }
  