import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  Heading,
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
  useDisclosure,
} from "@chakra-ui/react";
import { FcLike } from "react-icons/fc";
import { BiChat, BiLike } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Comments from "./comments";
//::::::::::::::::::::::::::::::::::::::::::
let date = new Date().toLocaleDateString();
const data = [
  {
    id: 1,
    profilePhoto: "https://avatars.githubusercontent.com/u/107566923?v=4",
    name: "Anirban Sharma",
    time: date,
    caption: "welcome to Queen of hills",
    LikeCount: 245,
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/DarjeelingTrainFruitshop_%282%29.jpg",
  },
  {
    id: 2,
    profilePhoto: "https://avatars.githubusercontent.com/u/107566923?v=4",
    name: "Shubham Roy",
    time: date,
    caption: "welcome to Sikkim",
    LikeCount: 453,
    url: "https://images.thrillophilia.com/image/upload/s--mOEdz9cf--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/291/831/original/1591005402_1549976608_Nathula_Pass.jpg.jpg.jpg?1591005402",
  },
];

//:::::::::::::::::::::::::::::::::::::::::::::::::::::
const Userpost = () => {
  const [status, setStatus] = useState(true);
  //const [count, setCount] = useState(0);
  const [info, setInfo] = useState(data);
  const [text, setText] = useState("");
  const [commment, setComment] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const btnRef = useRef();

  const handleLike = (id) => {
    setStatus(!status);
    info.map((el) => {
      if (el.id == id && status == true) {
        el.LikeCount += 1;
      } else if (el.id == id && status == false) {
        el.LikeCount -= 1;
      }
    });
  };

  //:::::::::::::::::: COMMENT SECTION ::::::::::::::::::::::::::::::
  const handleComment = () => {
    setComment([...commment, text]);
    onClose();
  };
  //::::::::::::::::::: SHOW ON UI::::::::::::::::::::::::::::::
  return (
    <div>
      {info.map((el, i) => (
        <Card w="70%" m="auto" key={el.id} backgroundColor="white">
          <CardHeader>
            {/*:::::::::::::::::  IMAGE OF THE USER ON INDIVIDUAL POSTS  ::::::::::::::::::: */}
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={el.name} src={el.profilePhoto} />
                {/*:::::::::::::::::  NAME & DATE OF THE USER ON INDIVIDUAL POSTS  ::::::::::::::::::: */}
                <Box>
                  <Heading size="sm">{el.name}</Heading>
                  <Text fontSize="sm">{el.time}</Text>
                </Box>
              </Flex>
              <Comments commment={commment} />
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                ref={btnRef}
                onClick={onOpen}
                icon={<FcLike />}
              />
              <Box mt="2">{el.LikeCount}</Box>
            </Flex>
          </CardHeader>
          {/*::::::::::::::::: CAPTION ON UI  ::::::::::::::::::: */}
          <CardBody>
            <Text>{el.caption}....!!!</Text>
          </CardBody>
          {/*::::::::::::::::: IMAGE ON UI  ::::::::::::::::::: */}
          <Image
            w={["80%", "90%", "95%"]}
            m="auto"
            src={el.url}
            alt={el.name}
          />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            {/*::::::::::::::::: LIKE BUTTON   ::::::::::::::::::: */}
            <Button
              onClick={() => handleLike(el.id)}
              flex="1"
              variant="ghost"
              leftIcon={status ? <BiLike /> : <FcLike />}
            >
              {status ? "Like" : ""}
            </Button>
            {/*::::::::::::::::: COMMENT BUTTON   ::::::::::::::::::: */}
            <Button
              onClick={onOpen}
              flex="1"
              variant="ghost"
              leftIcon={<BiChat />}
            >
              Comment
            </Button>
            {/*::::::::: COMMENT MODAL :::::::::: */}
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Leave a Comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <Input
                      onChange={(e) => setText(e.target.value)}
                      ref={initialRef}
                      placeholder="comment here"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={handleComment} colorScheme="blue" mr={3}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/*::::::::::::::::: POST EDIT BUTTON   ::::::::::::::::::: */}
            <Button flex="1" variant="ghost" leftIcon={<AiOutlineEdit />}>
              Edit
            </Button>
            {/*:::::::::::::::::POST DELETE BUTTON   ::::::::::::::::::: */}
            <Button flex="1" variant="ghost" leftIcon={<AiOutlineDelete />}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Userpost;
