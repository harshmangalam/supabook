import { SimpleGrid } from "@chakra-ui/react";
import Friend from "../../components/Friend";
import FriendsLayout from "../../layouts/FriendsLayout";
export default function FriendsSuggestionsRoute() {
  return (
    <FriendsLayout>
      <SimpleGrid spacing={4} columns={[1, 2, 2, 3]}>
        {[...new Array(10)].map((friend) => (
          <Friend {...friend} />
        ))}
      </SimpleGrid>
    </FriendsLayout>
  );
}
