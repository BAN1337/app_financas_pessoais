import React from "react";
import { TouchableWithoutFeedback, Alert } from "react-native";
import {
    Container,
    Tipo,
    IconView,
    TipoText,
    ValorText
} from "./styles";

import Feather from '@expo/vector-icons/Feather'

export default function HistoricoList({ data, deleteItem }) {
    function handleDeleteItem() {
        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja deletar esse registro?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => deleteItem(data.id)
                }
            ]
        )
    }

    return (
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
            <Container>
                <Tipo>
                    <IconView type={data.type}>
                        <Feather
                            name={data.type === 'receita' ? "arrow-up" : "arrow-down"}
                            size={20}
                            color='#fff'
                        />
                        <TipoText>{data.type === 'receita' ? 'Receita' : 'Despesa'}</TipoText>
                    </IconView>
                </Tipo>

                <ValorText>
                    R$ {data.value.toFixed(2)}
                </ValorText>
            </Container>
        </TouchableWithoutFeedback>
    )
}