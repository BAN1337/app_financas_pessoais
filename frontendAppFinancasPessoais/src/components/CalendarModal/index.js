import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import {
    Container,
    ButtonFilter,
    ButtonFilterText,
    ModalContent
} from "./styles";

export default function CalendarModal({ setVisible }) {
    return (
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>

            <ModalContent>
                <ButtonFilter>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>
            </ModalContent>
        </Container >
    )
}