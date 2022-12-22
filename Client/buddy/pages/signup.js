import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SimpleCard() {
  //const {name,image,gender,dob,number,email, password} = req.body;
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");



//   function handleChange(e) {
//       setImage(URL.createObjectURL(e.target.value));
//     }
//     console.log(image);



  const handleSignup = () => {
    let posts = {
      name,
      email,
      password,
      image,
      phone,
      dob,
      gender
    };
 console.log(posts)
    axios
      .post("http://localhost:8080/signup", posts)
      .then((res) => {
        console.log("res", res.data);
        router.push("/login");
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {/* ------------------------- */}
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
            </FormControl>
            {/* --------------------------- */}
            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                onChange={(e)=>setImage(e.target.value)}
                value={image}
                type="text"
              />
            </FormControl>
            {/* --------------------------- */}
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
            </FormControl>
            {/* ----------------------------- */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
            </FormControl>
            {/* ----------------------------- */}
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder="+91 "
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
              />
            </FormControl>
            {/* ----------------------------- */}
            <FormControl id="Gender">
              <FormLabel>Gender</FormLabel>
              <Input
                placeholder="Male / Female / Others"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                type="text"
              />
            </FormControl>
            {/* ----------------------------- */}
            <FormControl id="Age">
              <FormLabel>Age</FormLabel>
              <Input
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                type="text"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={() => handleSignup()}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
