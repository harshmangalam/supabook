import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { supabase } from "../../utils/supabaseClient";

export default function Profile({ profile }) {
  console.log(profile);
  return (
    <Container maxW={"container.sm"}>
      <Stack
        direction={["column", "column", "row"]}
        spacing={6}
        align={"center"}
        justify="space-between"
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
    </Container>
  );
}

export async function getServerSideProps({ params }) {
  console.log(params);
  try {
    const { error: userError, data: userData } = await supabase
      .from("profile")
      .select("*")
      .eq("id", params.profileId);

    if (userError) {
      console.log(userError.message);
      return {
        props: {},
      };
    }
    if (userData) {
      return {
        props: {
          profile: userData[0],
        },
      };
    }
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
