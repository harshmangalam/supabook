import * as React from "react";
import {
  Button,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactElement;
}

export default function UploadMedia({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label={"Add Post Media"}>
        <IconButton
          icon={children}
          aria-label="Media upload"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Media</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="green">Done</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
