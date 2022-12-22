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
} from "@chakra-ui/react";
import ModelFun from "../../Main/Model";
import { useEffect, useState } from "react";
import axios from "axios";
import NoPost from "../../Main/NoPost";


export default function SocialProfileSimple({ dataa }) {
  const [data, setData] = useState([]);
  const [modal, isModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
//::::::::::::::::::::::::::::::::
const { isOpen, onOpen, onClose } = useDisclosure()
//:::::::::::::::::::::::::::::::
  const handleAddToCart = (item) => {
    setModalData(item);
    isModalOpen(true);
  };
  return (
    <>
      <Center width="80%" margin={"auto"}>
        <Stack
          width={"100%"}
          borderWidth="1px"
          borderRadius="lg"
          // height={{ sm: '476px', md: '20rem' }}
          height={["500pxpx", "50rem", "20rem"]}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          padding={4}
        >
          <Flex flex={1}>
            <Image
              m={"auto"}
              w="70%"
              src={
                "https://images.unsplash.com/photo-1552954277-0c45bd503b54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXRpZnVsJTIwZ2lybHN8ZW58MHx8MHx8&w=1000&q=80"
              }
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Name
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              @Username
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
              <Button flex={1} fontSize={"xl"}>
                Edit
              </Button>
              <Button flex={1} fontSize={"xl"}>
                Post
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>

      {/* {data.length == 0 || null ? (
        <NoPost />
      ) : (
        <SimpleGrid
          margin={"auto"}
          marginTop="40px"
          columns={[1, 2, 3, 4]}
          spacing={4}
          width={"80%"}
        >
          {data.map((item) => {
            return (
              <>
                <Box
                  onClick={() => handleAddToCart(item)}
                  boxShadow={"2xl"}
                  margin={"auto"}
                  width={"90%"}
                  height="250px"
                >
                  <Image margin={"auto"} height={"100%"} src={item.image} />
                </Box>
              </>
            );
          })}
          <ModelFun isOpen={modal} isModalOpen={isModalOpen} data={modalData} />
        </SimpleGrid>
      )} */}
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const data = await axios.get("http://fakestoreapi.com/products/");
    return { props: { dataa: data.data } };
  } catch (err) {
    console.log(err.message);
  }
};
