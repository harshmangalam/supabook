import {
  Button,
  Container,
  Grid,
  GridItem,
  Icon,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  RiUserFollowLine,
  RiUserLocationLine,
  RiUserShared2Line,
  RiUserReceived2Line,
} from "react-icons/ri";
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
