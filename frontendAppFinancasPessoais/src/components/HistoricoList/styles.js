import styled from "styled-components/native";

export const Container = styled.View`
    background-color: #f0f3ff;
    border-radius: 4px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 14px;
    padding: 12px;
`

export const Tipo = styled.View`
    flex-direction: row;
`

export const IconView = styled.View`
    flex-direction: row;
    background-color: ${props => props.type === 'receita' ? '#00b94a' : '#c62c36'};
    padding: 4px 8px; /*Em cima e embaixo 4px, direita e esquerda 8px*/
    border-radius: 4px;
    margin-bottom: 4px;
`

export const TipoText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-style: italic;
`

export const ValorText = styled.Text`
    color: #121212;
    font-size: 22px;
`