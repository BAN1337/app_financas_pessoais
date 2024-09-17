import React, { useContext } from "react";
import { Platform } from "react-native";

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from "../SignIn/stytes";

import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
    const { user } = useContext(AuthContext)

    function handleSignUp() {
        console.log(user)
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >

                <AreaInput>
                    <Input
                        placeholder='Seu nome'
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Email'
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Senha'
                    />
                </AreaInput>

                <SubmitButton activeOpacity={0.8} onPress={handleSignUp}>
                    <SubmitText>Cadastrar</SubmitText>
                </SubmitButton>

            </Container>
        </Background>
    )
}