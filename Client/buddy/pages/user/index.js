import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Image,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function SocialProfileSimple({ dataa }) {
  //::::::::::::::::::::::::::::::::
  const [caption, setCaption] = useState("");
  const [data, setData] = useState([]);
  const [img, setImg] = useState("");
  //::::::::::::::::::::::::::::::::::;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modal2 = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  //:::::::::::::::::::::::::::::::
  const handlePost = () => {
    let token = JSON.parse(localStorage.getItem("user"));
    let user = token.user[0]._id;
    // console.log(token.user[0]._id);
    let posts = {
      caption,
      url: img,
      user_id: user,
    };
    axios
      .post("http://localhost:8080/mypost/post", posts, {
        headers: { authorization: `bearer ${token.token}` },
      })
      .then((res) => {
        console.log("res", res.data.new_data);
        if (res.data == "Something went wrong") {
          toast({
            title: " Invalid Email or Password",
            position: "top-right",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Posted Successfully",
            position: "top-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };



  const [user, setUser] = useState("");
  console.log(user?.user)
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <Box>
    {user?.user?.map((el)=>(
      <Center width="80%" margin={"auto"}>
        <Stack
          width={"100%"}
          borderWidth="1px"
          borderRadius="lg"
          height={["500pxpx", "50rem", "20rem"]}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          padding={4}
        >
          <Flex flex={1}>
            <Image m={"auto"} w="70%" src={el.image} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {el.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {el.email}
            </Text>
            
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Actress, musician, songwriter and artist. PM for work inquires or
              <Link href={"#"} color={"blue.400"}>
                #tag
              </Link>
              me in your posts
            </Text>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #art
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #photography
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #music
              </Badge>
            </Stack>
           
            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button onClick={onOpen} flex={1} fontSize={"xl"}>
                Edit
              </Button>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Your Account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input ref={initialRef} placeholder="Name" />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>New User Name</FormLabel>
                      <Input placeholder="User Name" />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              {/* -----POST------ */}
              <Button onClick={modal2.onOpen} flex={1} fontSize={"xl"}>
                Post
              </Button>
              <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Post Something</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Caption</FormLabel>
                      <Input
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        ref={initialRef}
                        placeholder="Caption"
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Image</FormLabel>
                      <Input
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        placeholder="Image URL"
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      onClick={() => handlePost()}
                      colorScheme="blue"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button onClick={modal2.onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          </Stack>
        </Stack>
      </Center>
       ))}
    </Box>
  );
}
