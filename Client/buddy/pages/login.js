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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
//::::::::::::::::::::::::::::::::::::::
export default function SimpleCard() {
  const toast=useToast()
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    let posts = {
      email,
      password,
    };

    axios
      .post("http://localhost:8080/login", posts)
      .then((res) => {
        console.log("res", res.data);
        if(res.data=='Login Failed'){
          toast({
            title: ' Invalid Email or Password',
            position:"top-right",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
        else{
          toast({
            title: 'Login Successfully',
            position:"top-right",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          localStorage.setItem("user",JSON.stringify(res.data))
           router.push('/home')
        }
     
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
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
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
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}



// import { useRouter } from 'next/navigation';

// export default function Page() {
//   const router = useRouter();

//   return (
//     <button type="button" onClick={() => router.push('/dashboard')}>
//       Dashboard
//     </button>
//   );
// }