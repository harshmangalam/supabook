import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  RiUserFollowLine,
  RiUserLocationLine,
  RiUserShared2Line,
  RiUserReceived2Line,
} from "react-icons/ri";

export default function FriendsLayout({ children, loading, error, title }) {
  const router = useRouter();
  return (
    <Container maxW={"container.xl"}>
      <Head>
        <title>{title}</title>
      </Head>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(6, 1fr)"]}
        gap={6}
      >
        <GridItem colSpan={[1, 1, 2]}>
          <VStack align={"start"}>
            {tabs.map((tab) => (
              <Link href={tab.href} key={tab.name} passHref>
                <Button
                  bg={
                    router.pathname === tab.href
                      ? useColorModeValue("gray.100", "gray.700")
                      : ""
                  }
                  as="a"
                  leftIcon={
                    <Icon fontSize={22} color="green.500" as={tab.icon} />
                  }
                  variant={"ghost"}
                  rounded="full"
                >
                  {tab.name}
                </Button>
              </Link>
            ))}
          </VStack>
        </GridItem>
        <GridItem colSpan={[1, 1, 4]}>
          {loading && (
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={4}>
              {[...new Array(3)].map((_, i) => (
                <Box w="full" key={i}>
                  <Skeleton w={"full"} h={"xs"} key={i}></Skeleton>
                  <Skeleton mt={2} w="full" h={"16px"} />
                  <Skeleton mt={6} w="full" h={"32px"} />
                </Box>
              ))}
            </SimpleGrid>
          )}
          {error && (
            <Center>
              <Text>Error...</Text>
            </Center>
          )}
          {!loading && !error && <Box>{children}</Box>}
        </GridItem>
      </Grid>
    </Container>
  );
}

const tabs = [
  {
    name: "My Friends",
    href: "/friends",
    icon: RiUserFollowLine,
  },
  {
    name: "Suggestions",
    href: "/friends/suggestions",
    icon: RiUserLocationLine,
  },
  {
    name: "Friend Requests Sent",
    href: "/friends/friend-request-sent",
    icon: RiUserShared2Line,
  },
  {
    name: "Friend Requests Received",
    href: "/friends/friend-request-received",
    icon: RiUserReceived2Line,
  },
];
