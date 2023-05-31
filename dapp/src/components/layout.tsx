import React, { ReactNode } from 'react'
import { Text, Center, Container, useColorModeValue } from '@chakra-ui/react'
import Header from './header'
import { Menu } from '../components/Menu'

type Props = {
    children: ReactNode
}

export function Layout(props: Props) {
    return (
        <div>
            {/* <Menu></Menu> */}
            {/* <Container maxW="container.md" py="8"> */}
            <Container maxW="100vw" py="8">
                {props.children}
            </Container>
            {/* <Center as="footer" bg={useColorModeValue('gray.100', 'gray.700')} p={6}>
                <Text fontSize="md"> Zer0-eX </Text>
            </Center> */}
        </div>
    )
}
