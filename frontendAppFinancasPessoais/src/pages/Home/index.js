import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";

import Header from "../../components/Header";
import {
    Background,
    ListBalance,
    Area,
    Title,
    List
} from "./styles";
import BalanceItem from "../../components/BalanceItem";
import HistoricoList from "../../components/HistoricoList";
import CalendarModal from "../../components/CalendarModal";

import api from "../../services/api";
import { format } from "date-fns";

import { useIsFocused } from "@react-navigation/native";//Serve para garantir que você está com foco na tela

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function Home() {
    const isFocused = useIsFocused()

    const [listBalance, setListBalance] = useState([])
    const [movements, setMovements] = useState([])
    const [dateMovements, setDateMovements] = useState(new Date())
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        let isActive = true

        async function getMovements() {
            let date = new Date(dateMovements)
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000
            let dateFormated = format(onlyDate, "dd/MM/yyyy")

            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated
                }
            })

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setListBalance(balance.data)
                setMovements(receives.data)
            }
        }

        getMovements()

        return () => isActive = false
    }, [isFocused, dateMovements] /*Vai garantir que sempre que voltar para a tela home, ele recarregue os dados da tela home*/)

    async function handleDelete(id) {
        try {
            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            })

            setDateMovements(new Date())
        } catch (error) {
            console.log(error)
        }
    }

    async function filterDateMovements(dateSelected) {
        setDateMovements(dateSelected)
    }

    return (
        <Background>
            <Header title="Minhas movimentações" />

            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                key={item => item.tag}
                renderItem={({ item }) => <BalanceItem data={item} />}
            />

            <Area>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="event" color='#121212' size={30} />
                </TouchableOpacity>

                <Title>
                    Ultimas movimentações
                </Title>
            </Area>

            <List
                data={movements}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }} //Serve para estilizar o FlatList
            />

            <Modal visible={modalVisible} animationType='fade' transparent={true}>
                <CalendarModal
                    setVisible={() => setModalVisible(false)}
                    handleFilter={filterDateMovements}
                />
            </Modal>
        </Background>
    )
}