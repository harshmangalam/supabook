import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BsFilePostFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import useSWR from "swr";
import { fetchProfileDetails } from "../services/profile";
interface Props {
  children: ReactNode;
}
export default function ProfileLayout({ children }: Props) {
  const router = useRouter();

  const { data: profile, error } = useSWR(`/${router.query.profileId}`, () =>
    fetchProfileDetails(router.query.profileId as string)
  );

  if (error) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }

  if (!error && !profile) {
    return <p>Loading...</p>;
  }
  return (
    <Container maxW={"container.md"}>
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

      <HStack spacing={4} mt={6} justify="center">
        {tabs.map((tab) => (
          <Link
            href={`/${router.query.profileId}/${tab.href}`}
            passHref
            key={tab.name}
          >
            <Button
              as={"a"}
              leftIcon={<Icon fontSize={"lg"} as={tab.icon} />}
              rounded={"full"}
            >
              {tab.name}
            </Button>
          </Link>
        ))}
      </HStack>
      <Box mt={4}>{children}</Box>
    </Container>
  );
}

const tabs = [
  {
    name: "Posts",
    href: "",
    icon: BsFilePostFill,
  },
  {
    name: "Friends",
    href: "friends",
    icon: FaUserFriends,
  },
];
