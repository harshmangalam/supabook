import * as React from "react";
import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  Tooltip,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { supabase } from "../utils/supabaseClient";
import shortid from "shortid";

interface Props {
  children: React.ReactElement;
  addMediaKey: (mediaPath: string) => void;
  bucket: string;
}

export default function UploadMedia({ children, addMediaKey, bucket }: Props) {
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [mediaPath, setMediaPath] = React.useState<string>("");
  const [mediaUrl, setMediaUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenFile = () => {
    fileRef.current?.click();
  };
  const handleFileChange = async (e: any) => {
    setUploading(true);
    try {
      const mediaPath = `public/${shortid()}.jpg`;
      setMediaPath(mediaPath);
      const file = (e.target as HTMLInputElement).files?.[0] as File;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(mediaPath, file);
      if (uploadData) {
        const { data } = await supabase.storage
          .from(bucket)
          .download(mediaPath);

        const blobUrl = URL.createObjectURL(data as Blob);
        setMediaUrl(blobUrl);
      }
      if (uploadError) {
        console.log(uploadError.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, []);

  const handleRemoveMedia = async () => {
    setDeleting(true);
    try {
      if (mediaPath) {
        const { data: removeData, error: removeError } = await supabase.storage
          .from(bucket)
          .remove([mediaPath]);
        if (removeError) {
          console.log(removeError.message);
        }
        if (removeData) {
          if (mediaUrl) {
            URL.revokeObjectURL(mediaUrl);
            setMediaUrl("");
            setMediaPath("");
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpload = () => {
    addMediaKey(mediaPath);
    onClose();
  };
  return (
    <>
      <Tooltip label={"Add Post Media"}>
        <IconButton
          icon={children}
          aria-label="Media upload"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Media</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {uploading ? (
              <Skeleton h={"200px"} w="full" rounded={"md"} />
            ) : mediaUrl ? (
              <Box pos={"relative"}>
                <Image
                  src={mediaUrl}
                  h={"200px"}
                  w="full"
                  objectFit={"cover"}
                  rounded="md"
                  shadow={"md"}
                />
                <Box pos={"absolute"} top={2} right={2}>
                  <Tooltip label={"Remove Media"}>
                    <IconButton
                      isLoading={deleting}
                      onClick={handleRemoveMedia}
                      size={"xs"}
                      colorScheme="red"
                      aria-label="Remove Media"
                      icon={<Icon as={AiOutlineDelete} fontSize="sm" />}
                    />
                  </Tooltip>
                </Box>
              </Box>
            ) : (
              <Center
                onClick={handleOpenFile}
                borderWidth={"2px"}
                rounded="md"
                h={"200px"}
                cursor="pointer"
                borderStyle={"dashed"}
              >
                <VStack>
                  <VisuallyHidden>
                    <input
                      accept="images/*"
                      type="file"
                      ref={fileRef}
                      onChange={handleFileChange}
                    />
                  </VisuallyHidden>
                  <Icon as={FiImage} fontSize="4xl" color="green.400" />
                  <Text fontSize={"sm"}>Choose image from your device</Text>
                </VStack>
              </Center>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={uploading}
              colorScheme="green"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
