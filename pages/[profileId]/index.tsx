import { Center, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Post from "../../components/Post";
import ProfileLayout from "../../layouts/ProfileLayout";
import { fetchUserPosts } from "../../services/post";

export default function ProfileHome() {
  const router = useRouter();
  const { data: posts, error: postsError } = useSWR(
    `/${router.query.profileId}/posts`,
    () => fetchUserPosts(router.query.profileId as string)
  );

  return (
    <ProfileLayout loading={!posts && !postsError} error={postsError}>
      {/* posts  */}
      <Container>
        <SimpleGrid spacing={4}>
          {posts?.length ? (
            posts.map((post: any) => <Post key={post.id} {...post} />)
          ) : (
            <Center>
              <Text>No Posts</Text>
            </Center>
          )}
        </SimpleGrid>
      </Container>
    </ProfileLayout>
  );
}
