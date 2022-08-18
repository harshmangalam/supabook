import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Friend from "../../components/Friend";
import { useAuthContext } from "../../context/auth";
import FriendsLayout from "../../layouts/FriendsLayout";
import { supabase } from "../../utils/supabaseClient";
export default function FriendsSuggestionsRoute({ users }) {
  const [sending, setSending] = useState<string>();
  const authContext = useAuthContext();
  const toast = useToast();
  const router = useRouter();
  const sendFriendRequest = async (userId: string) => {
    setSending(userId);
    try {
      const { data, error } = await supabase.from("friend_request").insert({
        from: authContext?.user?.id,
        to: userId,
      });

      if (error) {
        toast({
          title: "Friend Request",
          description: error.message,
          status: "error",
        });
      }

      if (data) {
        toast({
          title: "Friend Request",
          description: "Friend request sent successfully",
          status: "success",
        });
        router.replace("/friends/suggestions");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending("");
    }
  };
  return (
    <FriendsLayout>
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {users.map((user) => (
          <Friend {...user} key={user.id}>
            <Button
              isLoading={user.id === sending}
              onClick={() => sendFriendRequest(user.id)}
              colorScheme={"green"}
              width="full"
            >
              Add Friend
            </Button>
          </Friend>
        ))}
      </SimpleGrid>
    </FriendsLayout>
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
