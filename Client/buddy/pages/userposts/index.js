import { useRef, useState, useEffect } from "react";
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
//:::::::::::::::::::::::::::::::::::::::::::::::::::::
const Userpost = () => {
  const [time, setTime] = useState(date);
  const [status, setStatus] = useState(true);
  const [info, setInfo] = useState();
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [commment, setComment] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const btnRef = useRef();

  const handleLike = (id) => {
    setStatus(!status);
    data?.map((el) => {
      if (el._id == id && status == true) {
        el.likecount += 1;
      } else if (el._id == id && status == false) {
        el.likecount -= 1;
      }
    });
  };
  //::::::::::::::::: API :::::::::::::::::::::
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("user"));
    fetch("https://lively-capris-fly.cyclic.app//mypost", {
      headers: { authorization: `bearer ${token.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const handleDel = (id) => {
    console.log(id);
    let token = JSON.parse(localStorage.getItem("user"));

    fetch(`https://lively-capris-fly.cyclic.app/mypost/delete/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${token.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.warn(resp);
        setData(
          data.filter((el) => {
            return el._id !== id;
          })
        );
      })
      .catch((e) => {
        console.log("error");
      });
  };

  //:::::::::::::::::: COMMENT SECTION
  const handleComment = () => {
    setComment([...commment, text]);
    onClose();
  };
  //::::::::::::::::::: SHOW ON UI::::::::::::::::::::::::::::::
  return (
    <div>
      {data?.map((el) => (
        <Card w="70%" m="auto" key={el.id} backgroundColor="white">
          <CardHeader>
            {/*:::::::::::::::::  IMAGE OF THE USER ON INDIVIDUAL POSTS  ::::::::::::::::::: */}
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name={el.user_id.name} src={el.user_id.image} />
                {/*:::::::::::::::::  NAME & DATE OF THE USER ON INDIVIDUAL POSTS  ::::::::::::::::::: */}
                <Box>
                  <Heading size="sm">{el.user_id.name}</Heading>
                  <Text fontSize="sm">{time}</Text>
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
              <Box mt="2">{el.likecount}</Box>
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
              onClick={() => handleLike(el._id)}
              flex="1"
              variant="ghost"
              leftIcon={status ? <BiLike /> : <FcLike />}
            >
              {status ? "Like" : ""}
            </Button>
            {/*::::::::::::::::: COMMENT BUTTON::::::::::::::::::: */}
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
            <Button
              onClick={() => handleDel(el._id)}
              flex="1"
              variant="ghost"
              leftIcon={<AiOutlineDelete />}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Userpost;
