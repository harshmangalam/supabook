import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import Friend from "../../components/Friend";
import { useAuthContext } from "../../context/auth";
import FriendsLayout from "../../layouts/FriendsLayout";
import { fetchFriendRequestSent } from "../../services/friends";
import { supabase } from "../../utils/supabaseClient";
export default function FriendRequestSentRoute() {
  const [loading, setLoading] = useState<string>();
  const authContext = useAuthContext();
  const toast = useToast();

  const {
    mutate,
    data: users,
    error: usersError,
  } = useSWR("/friends/friend-request-sent", () =>
    fetchFriendRequestSent(authContext?.user?.id)
  );

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
        mutate("/friends/friend-request-sent");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("");
    }
  };

  return (
    <FriendsLayout loading={!usersError && !users} error={usersError}>
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {users?.length ? (
          users?.map((user) => (
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
          ))
        ) : (
          <p>No requests sent</p>
        )}
      </SimpleGrid>
    </FriendsLayout>
  );
}
