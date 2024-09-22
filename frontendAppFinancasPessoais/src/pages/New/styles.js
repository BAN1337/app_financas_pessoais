import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    background-color: #f0f4ff;
`

export const Title = styled.Text`
    align-self: flex-start;
    margin-bottom: 14px;
    margin-left: 5%;
    font-size: 23px;
    font-weight: bold;
    color: #000;
`

export const Input = styled.TextInput`
    height: 50px;
    width: 90%;
    background-color: #fff;
    font-size: 17px;
    padding: 0 8px;
    margin-bottom: 14px;
    border-radius: 4px;
`
export const SubmitButton = styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    align-items: center;
    justify-content: center;
    background-color: #00b94a;
    border-radius: 4px;
`

export const SubmitText = styled.Text`
    color: #fff;
    font-size: 21px;
    font-weight: bold;
`