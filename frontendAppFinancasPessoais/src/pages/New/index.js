import React, { useState } from "react";
import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import {
    Background,
    Title,
    Input,
    SubmitButton,
    SubmitText
} from "./styles";
import Header from "../../components/Header";
import RegisterTypes from "../../components/RegisterTypes";

import api from "../../services/api";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

export default function New() {
    const [labelInput, setLabelInput] = useState('')
    const [valueInput, setValueInput] = useState('')
    const [type, setType] = useState('receita')

    const navigation = useNavigation()

    function handleSubmit() {
        Keyboard.dismiss()

        if (valueInput === '' || labelInput === '') {
            alert('Preencha todos os campos')
            return
        }

        if (isNaN(parseFloat(valueInput)) || type === null) { //Vai verificar se não é um número
            alert('Valor inválido')
            return
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${type === 'despesa' ? 'Despesa' : 'Receita'} - Valor: R$ ${parseFloat(valueInput).toFixed(2)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd() {
        Keyboard.dismiss()

        await api.post('/receive', {
            description: labelInput,
            value: parseFloat(valueInput),
            type: type,
            date: format(new Date, 'dd/MM/yyyy')
        })

        setLabelInput('')
        setValueInput('')
        navigation.navigate('Home')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Background>
                <Header title='Registrando' />

                <SafeAreaView
                    style={{
                        marginTop: 14,
                        alignItems: 'center'
                    }}
                >
                    <Title>Registrar</Title>

                    <Input
                        placeholder="Descricão desse registro"
                        value={labelInput}
                        onChangeText={(text) => setLabelInput(text)}
                    />

                    <Input
                        placeholder="Valor desejado"
                        keyboardType='numbers-and-punctuation'
                        value={valueInput}
                        onChangeText={(text) => setValueInput(text)}
                    />

                    <RegisterTypes type={type} sendTypeChanged={(item) => setType(item)} />

                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    )
}