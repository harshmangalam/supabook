import {
  Avatar,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BsFilePostFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
interface Props {
  children: ReactNode;
}
export default function ProfileLayout({ children }: Props) {
  const router = useRouter();
  return (
    <Container maxW={"container.xl"}>
      <Stack
        direction={["column", "column", "row"]}
        spacing={6}
        align={"center"}
        justify="space-evenly"
        shadow={"sm"}
        p={4}
        borderWidth={"2px"}
        rounded="md"
      >
        <Avatar src={profile?.avatar?.url} w={"200px"} h={"200px"} />

        <VStack align={["center", "center", "start"]} spacing={2}>
          <Heading>{profile.name}</Heading>
          <Text fontSize={"xl"}>{profile.user_info?.email}</Text>
          <Text fontSize={"lg"}>
            Joined {new Date(profile.created_at).toDateString()}
          </Text>

          <HStack>
            <Tag>23 Friends</Tag>
            <Tag>18 Posts</Tag>
          </HStack>
          <Button size="sm" rounded="full" colorScheme="green">
            Edit Profile
          </Button>
        </VStack>
      </Stack>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(6, 1fr)"]}
        gap={6}
        mt={6}
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
        <GridItem colSpan={[1, 1, 4]}>{children}</GridItem>
      </Grid>
    </Container>
  );
}

const tabs = [
  {
    name: "Posts",
    href: "/profile",
    icon: BsFilePostFill,
  },
  {
    name: "Friends",
    href: "/profile/friends",
    icon: FaUserFriends,
  },
];
