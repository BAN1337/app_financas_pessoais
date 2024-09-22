import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";

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
    const { signUp, loadingAuth } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignUp() {
        if (name === '' || email === '' || password === '') {
            alert('Todos os campos precisam ser preenchidos!')
        } else {
            signUp(name, email, password)
        }
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
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder='Senha'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton activeOpacity={0.8} onPress={handleSignUp}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : (
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }
                </SubmitButton>

            </Container>
        </Background>
    )
}