import { Container, SimpleGrid } from "@chakra-ui/react";
import Post from "../../components/Post";
import ProfileLayout from "../../layouts/ProfileLayout";
import { supabase } from "../../utils/supabaseClient";

export default function Home({ posts }) {
  return (
    <ProfileLayout>
      {/* posts  */}
      <Container>
        <SimpleGrid spacing={4}>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </SimpleGrid>
      </Container>
    </ProfileLayout>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await supabase
    .from("post")
    .select(`*,author(*)`)
    .eq("author", params.profileId);
  return {
    props: {
      posts: data,
    },
  };
}
