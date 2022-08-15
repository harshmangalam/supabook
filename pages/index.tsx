import { Container, SimpleGrid } from "@chakra-ui/react";
import Post from "../components/Post";

export default function Home() {
  return (
    <Container>
      {/* posts  */}
      <SimpleGrid spacing={4}>
        {[...new Array(5)].map((post) => (
          <Post {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
