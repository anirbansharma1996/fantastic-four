import { Alert, AlertIcon, Box, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import {GiSkullCrossedBones} from "react-icons/gi"
function NoPost() {
  return (
    <Stack  width="70%" margin={"auto"} marginTop="50px" >
  <Alert 
    bg={""}
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='200px'
  >
    <GiSkullCrossedBones size={"150px"} />
  <Text fontSize={"24px"}>
  No Post Yet !!
  </Text>
  </Alert>
  </Stack>
  
  )
}

export default NoPost