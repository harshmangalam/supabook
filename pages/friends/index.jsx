import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import Friend from "../../components/Friend";
import { useAuthContext } from "../../context/auth";
import FriendsLayout from "../../layouts/FriendsLayout";
import { fetchMyFriend, unfriend } from "../../services/friends";
export default function FriendRoute() {
  const [loading, setLoading] = useState();
  const authContext = useAuthContext();
  const toast = useToast();

  const {
    mutate,
    data: users,
    error: usersError,
  } = useSWR("/friends", () => fetchMyFriend(authContext?.user?.id));

  const handleUnfriend = async (to) => {
    setLoading(to);
    try {
      await unfriend(authContext?.user?.id, to);
      toast({
        title: "Friend",
        description: "Unfriend",
        status: "success",
        isClosable: true,
      });
      mutate(["/friends"]);
    } catch (error) {
      console.log(error);
      toast({
        title: "Friend",
        description: error?.message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading("");
    }
  };
  return (
    <FriendsLayout
      title="Friends | My Friends"
      loading={!usersError && !users}
      error={usersError}
    >
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {users?.length ? (
          users?.map((user) => (
            <Friend {...user} key={user.id}>
              <Button
                isLoading={user.id === loading}
                colorScheme={"red"}
                width="full"
                onClick={() => handleUnfriend(user.id)}
              >
                Unfriend
              </Button>
            </Friend>
          ))
        ) : (
          <p>No Friends</p>
        )}
      </SimpleGrid>
    </FriendsLayout>
  );
}
