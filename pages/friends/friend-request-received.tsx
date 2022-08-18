import { Button, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import Friend from "../../components/Friend";
import { useAuthContext } from "../../context/auth";
import FriendsLayout from "../../layouts/FriendsLayout";
import {
  cancelFriendRequest,
  fetchFriendRequestReceived,
  ignoreFriendRequest,
} from "../../services/friends";
export default function FriendRequestSentRoute() {
  const [loading, setLoading] = useState<string>();
  const authContext = useAuthContext();
  const toast = useToast();

  const {
    mutate,
    data: users,
    error: usersError,
  } = useSWR("/friends/friend-request-received", () =>
    fetchFriendRequestReceived(authContext?.user?.id)
  );

  const handleIgnoreRequest = async (to: string) => {
    setLoading(to);
    try {
      const data = await ignoreFriendRequest(to, authContext?.user?.id);
      console.log(data);
      toast({
        title: "Friend Request",
        description: "Friend request cancelled successfully",
        status: "success",
      });
      mutate(["/friends/friend-request-received"]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Friend Request",
        description: error?.message,
        status: "error",
      });
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
              <VStack w="full">
                <Button
                  isLoading={user.id === loading}
                  onClick={() => handleIgnoreRequest(user.id)}
                  colorScheme={"red"}
                  width="full"
                >
                  Ignore Request
                </Button>
                <Button
                  isLoading={user.id === loading}
                  onClick={() => handleCancelRequest(user.id)}
                  colorScheme={"green"}
                  width="full"
                >
                  Accept Request
                </Button>
              </VStack>
            </Friend>
          ))
        ) : (
          <p>No requests sent</p>
        )}
      </SimpleGrid>
    </FriendsLayout>
  );
}