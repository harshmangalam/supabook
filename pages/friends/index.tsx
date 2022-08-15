import {
  Button,
  Container,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  RiUserFollowLine,
  RiUserLocationLine,
  RiUserShared2Line,
  RiUserReceived2Line,
} from "react-icons/ri";
import Friend from "../../components/Friend";
export default function FriendsRoute() {
  return (
    <Container maxW={"container.lg"}>
      <Grid templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem colSpan={2}>
          <VStack align={"start"}>
            {tabs.map((tab) => (
              <Link href={tab.href} key={tab.name} passHref>
                <Button
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
        <GridItem colSpan={4}>
          <SimpleGrid spacing={4} columns={3}>
            {[...new Array(10)].map((friend) => (
              <Friend {...friend} />
            ))}
          </SimpleGrid>
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
    href: "/friends/friend-requests-sent",
    icon: RiUserShared2Line,
  },
  {
    name: "Friend Requests Received",
    href: "/friends/friend-requests-received",
    icon: RiUserReceived2Line,
  },
];
