import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiImage } from "react-icons/fi";
import UploadMedia from "../components/UploadMedia";
import { useAuthContext } from "../context/auth";
import { supabase } from "../utils/supabaseClient";

export default function CreatePostRoute() {
  const router = useRouter();
  const authContext = useAuthContext();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState();
  const [inserting, setInserting] = useState(false);

  const handleCreatePost = async () => {
    setInserting(true);

    try {
      const { data: postCreateData, error: postCreateError } = await supabase
        .from("post")
        .insert([
          {
            content,
            media,
            author: authContext?.user.id,
          },
        ]);

      if (postCreateData) {
        router.push("/");
      }

      if (postCreateError) {
        console.log(postCreateError.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInserting(false);
    }
  };
  return (
    <Container>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"sm"}
        borderWidth={"2px"}
        p={8}
        mt={4}
      >
        <Heading fontSize={"4xl"} textAlign="center">
          Create Post
        </Heading>

        <Stack spacing={4} mt={8}>
          <Box pos="relative">
            <Textarea
              rows={8}
              placeholder={"Start typing post content..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Box zIndex={30} pos="absolute" bottom={3} right={3}>
              <UploadMedia
                tooltip="Upload post media"
                addMediaFile={(mediaData) => setMedia(mediaData)}
                bucket="post"
              >
                <Icon fontSize={"xl"} as={FiImage} />
              </UploadMedia>
            </Box>
          </Box>

          <Button
            isLoading={inserting}
            colorScheme="purple"
            w="full"
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
