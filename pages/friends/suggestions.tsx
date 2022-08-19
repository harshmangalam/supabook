import { Button, SimpleGrid, useToast } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import Friend from "../../components/Friend";
import { useAuthContext } from "../../context/auth";
import FriendsLayout from "../../layouts/FriendsLayout";
import {
  fetchFriendSuggestion,
  sendFriendRequest,
} from "../../services/friends";
export default function FriendsSuggestionsRoute() {
  const [loading, setLoading] = useState<string>();
  const authContext = useAuthContext();
  const toast = useToast();

  const {
    data: friendsSuggestionData,
    error: friendsSuggestionError,
    mutate: friendsSuggestionMutation,
  } = useSWR("/friends/suggestions", fetchFriendSuggestion);
  const handleSendRequest = async (to: string) => {
    setLoading(to);
    try {
      await sendFriendRequest(authContext?.user.id, to);
      toast({
        title: "Friend Request",
        description: "Friend request sent successfully",
        status: "success",
      });
      friendsSuggestionMutation(["/friends/suggestions"]);
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
    <FriendsLayout
      title="Friends | Suggestions"
      loading={!friendsSuggestionData && !friendsSuggestionError}
      error={friendsSuggestionError}
    >
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {friendsSuggestionData?.map((user) => (
          <Friend {...user} key={user.id}>
            <Button
              isLoading={user.id === loading}
              onClick={() => handleSendRequest(user.id)}
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
