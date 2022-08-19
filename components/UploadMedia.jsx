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

export default function UploadMedia({
  children,
  addMediaFile,
  bucket,
  tooltip,
}) {
  const fileRef = React.useRef();
  // relative file path for media in supabase storage
  const [mediaPath, setMediaPath] = React.useState("");
  // signed media url for preview
  const [mediaUrl, setMediaUrl] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // open input file to select media
  const handleOpenFile = () => {
    fileRef.current?.click();
  };
  const handleFileChange = async (e) => {
    setUploading(true);
    try {
      // file path where media will upload
      const mediaPath = `public/${shortid()}.jpg`;
      setMediaPath(mediaPath);
      const file = e.target.files?.[0];
      // uploa file in supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(mediaPath, file);
      if (uploadData) {
        // get signed url of uploaded media
        const { signedURL, error: signedUrlError } = await supabase.storage
          .from(bucket)
          .createSignedUrl(mediaPath, 60 * 60 * 24 * 365);

        if (signedUrlError) {
          console.log(signedUrlError.message);
        }
        if (signedURL) {
          setMediaUrl(signedURL);
        }
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

  // React.useEffect(() => {
  //   return () => {
  //     if (mediaUrl) {
  //       // remove blob url object from memory
  //       URL.revokeObjectURL(mediaUrl);
  //     }
  //   };
  // }, []);

  const handleRemoveMedia = async () => {
    setDeleting(true);
    try {
      if (mediaPath) {
        // delete media file friom supabase
        const { data: removeData, error: removeError } = await supabase.storage
          .from(bucket)
          .remove([mediaPath]);
        if (removeError) {
          console.log(removeError.message);
        }
        if (removeData) {
          // URL.revokeObjectURL(mediaUrl);
          setMediaUrl("");
          setMediaPath("");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  // send media path to parent component
  const handleUpload = () => {
    addMediaFile({ url: mediaUrl, path: mediaPath });
    onClose();
  };
  return (
    <>
      <Tooltip label={tooltip}>
        <IconButton
          icon={children}
          aria-label="Media upload"
          onClick={onOpen}
          rounded="full"
          colorScheme="green"
        />
      </Tooltip>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tooltip}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {uploading ? (
              <Skeleton h={"200px"} w="full" rounded={"md"} />
            ) : mediaUrl ? (
              // image preview with delete image options show when image upload from browser
              <Box pos={"relative"}>
                <Image
                  src={mediaUrl}
                  h={"200px"}
                  w="full"
                  objectFit={"cover"}
                  rounded="md"
                  shadow={"md"}
                  alt={"Preview"}
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
              // image upload interface show when there is no image for preview
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
