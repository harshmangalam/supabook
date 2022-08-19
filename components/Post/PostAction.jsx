import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { supabase } from "../../utils/supabaseClient";

export default function PostAction({ id, media }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState("");

  const deletePost = async () => {
    setLoading(id);
    try {
      const { data, error } = await supabase
        .from("post")
        .delete()
        .match({ id });
      if (error) {
        toast({
          status: "error",
          title: "Delete Post",
          description: error.message,
          isClosable: true,
        });
      }
      if (data) {
        if (media?.path) {
          await supabase.storage.from("post").remove([media.path]);
        }
        toast({
          status: "success",
          title: "Delete Post",
          description: "Post deleted successfully",
          isClosable: true,
        });
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("");
    }
  };
  return (
    <Menu>
      <MenuButton
        isLoading={loading === id}
        size={"sm"}
        as={IconButton}
        aria-label="Actions"
        icon={<Icon as={BiDotsHorizontalRounded} fontSize="lg" />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem
          color={"red.300"}
          onClick={deletePost}
          icon={<AiOutlineDelete size={20} />}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
