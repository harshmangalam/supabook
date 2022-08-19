import { Center, Container, SimpleGrid, Text } from "@chakra-ui/react";
import Post from "../components/Post";
import { supabase } from "../utils/supabaseClient";

export default function Home({ posts }) {
  return (
    <Container>
      {/* posts  */}
      <SimpleGrid spacing={4}>
        {posts?.length ? (
          posts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <Center>
            <Text>No Posts</Text>
          </Center>
        )}
      </SimpleGrid>
    </Container>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from("post").select(`*,author(*)`);
  return {
    props: {
      posts: data,
    },
  };
}
