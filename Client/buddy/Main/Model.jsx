import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function Model({isOpen,isModalOpen,data}) {
    const OverlayOne = () => (
        <ModalOverlay
        bg='none'
        backdropFilter='auto'
       
        backdropBlur='2px'
      />
      )
    
      const onClose=()=>{
         isModalOpen(false)
      }

      const [overlay, setOverlay] = React.useState(<OverlayOne />)
   
      return (
    <>

   
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
    {overlay}
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Custom backdrop filters!</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default Model