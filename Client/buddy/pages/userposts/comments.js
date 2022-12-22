import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { TfiComments } from "react-icons/tfi";



export default function Comments(comment) {
    // console.log(comment)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <Button ref={btnRef} variant="ghost" onClick={onOpen}>
        <TfiComments />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>See Your Comments</DrawerHeader>
        <Box  w='80%' ml='2rem'>
          {comment.comment?.map((el)=>
          <ol>
            <li>{el}</li>
          </ol>
          )}
        </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
}
