import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";
import {
    Background,
    ListBalance
} from "./styles";
import BalanceItem from "../../components/BalanceItem";

import api from "../../services/api";
import { format } from "date-fns";

import { useIsFocused } from "@react-navigation/native";//Serve para garantir que você está com foco na tela

export default function Home() {
    const isFocused = useIsFocused()

    const [listBalance, setListBalance] = useState([])
    const [dateMovements, setDateMovements] = useState(new Date())

    useEffect(() => {
        let isActive = true

        async function getMovements() {
            let dateFormated = format(dateMovements, 'dd/MM/yyyy')

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setListBalance(balance.data)
            }
        }

        getMovements()

        return () => isActive = false
    }, [isFocused] /*Vai garantir que sempre que voltar para a tela home, ele recarregue os dados da tela home*/)

    return (
        <Background>
            <Header title="Minhas movimentações" />

            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                key={item => item.tag}
                renderItem={({ item }) => (<BalanceItem data={item} />)}
            />
        </Background>
    )
}