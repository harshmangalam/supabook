import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Friend from "../../components/Friend";
import { useAuthContext } from "../../context/auth";
import FriendsLayout from "../../layouts/FriendsLayout";
import { supabase } from "../../utils/supabaseClient";
export default function FriendRequestSentRoute({ users }) {
  const [loading, setLoading] = useState<string>();
  const authContext = useAuthContext();
  const toast = useToast();
  const router = useRouter();
  const sendFriendRequest = async (userId: string) => {
    setLoading(userId);
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
      setLoading("");
    }
  };
  return (
    <FriendsLayout>
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {users.map((user) => (
          <Friend {...user} key={user.id}>
            <Button
              isLoading={user.id === loading}
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
