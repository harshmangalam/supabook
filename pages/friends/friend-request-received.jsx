import { Button, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import Friend from "../../components/Friend";
import { useAuthContext } from "../../context/auth";
import FriendsLayout from "../../layouts/FriendsLayout";
import {
  acceptFriendRequest,
  fetchFriendRequestReceived,
  ignoreFriendRequest,
} from "../../services/friends";
export default function FriendRequestSentRoute() {
  const [ignoring, setIgnoring] = useState();
  const [accepting, setAccepting] = useState();
  const authContext = useAuthContext();
  const toast = useToast();

  const {
    mutate,
    data: users,
    error: usersError,
  } = useSWR("/friends/friend-request-received", () =>
    fetchFriendRequestReceived(authContext?.user?.id)
  );

  const handleIgnoreRequest = async (from) => {
    setIgnoring(from);
    try {
      await ignoreFriendRequest(from, authContext?.user?.id);
      toast({
        title: "Friend Request",
        description: "Friend request ignored successfully",
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
      setIgnoring("");
    }
  };

  const handleAcceptRequest = async (from) => {
    setAccepting(from);
    try {
      await acceptFriendRequest(from, authContext?.user?.id);

      toast({
        title: "Friend Request",
        description: "Friend request accepted successfully",
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
      setAccepting("");
    }
  };

  return (
    <FriendsLayout
      title="Friends | Friend Request Received"
      loading={!usersError && !users}
      error={usersError}
    >
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {users?.length ? (
          users?.map((user) => (
            <Friend {...user} key={user.id}>
              <VStack w="full">
                <Button
                  isLoading={user.id === ignoring}
                  onClick={() => handleIgnoreRequest(user.id)}
                  colorScheme={"red"}
                  width="full"
                >
                  Ignore Request
                </Button>
                <Button
                  isLoading={user.id === accepting}
                  onClick={() => handleAcceptRequest(user.id)}
                  colorScheme={"green"}
                  width="full"
                >
                  Accept Request
                </Button>
              </VStack>
            </Friend>
          ))
        ) : (
          <p>No requests received</p>
        )}
      </SimpleGrid>
    </FriendsLayout>
  );
}
