import * as React from "react";
import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
  children: React.ReactElement;
  addMediaUrl: (mediaUrl: string) => void;
}

export default function UploadMedia({ children, addMediaUrl }: Props) {
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [localUrl, setLocalUrl] = React.useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenFile = () => {
    fileRef.current?.click();
  };
  const handleFileChange = (e: any) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    const objectUrl = URL.createObjectURL(file as File);
    setLocalUrl(objectUrl);
  };

  React.useEffect(() => {
    return () => handleRemoveMedia();
  }, []);

  const handleRemoveMedia = () => {
    if (localUrl) {
      URL.revokeObjectURL(localUrl);
      setLocalUrl("");
    }
  };

  const handleDone = () => {
    addMediaUrl(localUrl);
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
            {localUrl ? (
              <Box pos={"relative"}>
                <Image
                  src={localUrl}
                  h={"200px"}
                  w="full"
                  objectFit={"cover"}
                  rounded="md"
                  shadow={"md"}
                />
                <Box pos={"absolute"} top={2} right={2}>
                  <Tooltip label={"Remove Media"}>
                    <IconButton
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
            <Button colorScheme="green" onClick={handleDone}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
