import { Container, SimpleGrid } from "@chakra-ui/react";
import Post from "../components/Post";
import { supabase } from "../utils/supabaseClient";

export default function Home({ posts }) {
  return (
    <Container>
      {/* posts  */}
      <SimpleGrid spacing={4}>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
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
