import { Button, SimpleGrid } from "@chakra-ui/react";
import Friend from "../../components/Friend";
import ProfileLayout from "../../layouts/ProfileLayout";
import { supabase } from "../../utils/supabaseClient";
export default function ProfileFriends({ users }) {
  return (
    <ProfileLayout>
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {users.map((user) => (
          <Friend {...user}>
            <Button colorScheme={"green"} width="full">
              Add Friend
            </Button>
          </Friend>
        ))}
      </SimpleGrid>
    </ProfileLayout>
  );
}

export async function getServerSideProps() {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("id,name,avatar");
    if (error) {
      console.log(error.message);
      return { props: {} };
    }
    return {
      props: {
        users: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
