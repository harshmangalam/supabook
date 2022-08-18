import {
  Button,
  Container,
  Grid,
  GridItem,
  Icon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  RiUserFollowLine,
  RiUserLocationLine,
  RiUserShared2Line,
  RiUserReceived2Line,
} from "react-icons/ri";

interface Props {
  children: ReactNode;
  loading?: boolean;
  error?: any;
}
export default function FriendsLayout({ children, loading, error }: Props) {
  const router = useRouter();
  return (
    <Container maxW={"container.xl"}>
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
          {loading && <p>Loading...</p>}
          {error && <p>Error...</p>}
          {!loading && !error && children}
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
