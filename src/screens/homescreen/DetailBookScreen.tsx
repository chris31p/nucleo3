import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Book } from './HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { database } from '../../config/firebaseConfig'

export const DetailBookScreen = () => {

    const navigation = useNavigation();

    const route = useRoute();
    //@ts-ignore
    const{book} = route.params;

    const [detailForm, setDetailForm] = useState<Book>({
        id: '',
        autor: '',
        titulo: '',
        año: ''
    })

    useEffect(() => {
     setDetailForm(book)
    }, [])
    
    const handlerSetDetailForm = (key: string, value: string)=>{
        setDetailForm({...detailForm, [key]: value})
    }

    const handlerUpdateBook = async()=>{
        const dbRef = ref(database, 'books/'+detailForm.id)
        await update(dbRef, {titulo: detailForm.titulo, autor: detailForm.autor, año: detailForm.año})
        navigation.goBack();
    }

    const handlerDeleteBook = async()=>{
        const dbRef = ref(database, 'books/'+detailForm.id)
        await remove(dbRef)
        navigation.goBack();
    }
    return (
        <View style={styles.contentDetail}>
            <Divider />
            <View style={styles.tituloBook}>
                <Text style={styles.detailText}>Autor: </Text>
                <TextInput
                    value={detailForm.autor}
                    mode='outlined'
                    onChangeText={(value) => handlerSetDetailForm('autor', value)}
                    style={{ flex: 1 }} />
            </View>
            <Divider bold />
            <View style={styles.tituloBook}>
                <Text style={styles.detailText}>Título: </Text>
                <TextInput
                    value={detailForm.titulo}
                    mode='outlined'
                    onChangeText={(value) => handlerSetDetailForm('titulo', value)}
                    style={{ flex: 1 }} />
            </View>
            <Divider bold />
            <View style={styles.tituloBook}>
                <Text style={styles.detailText}>Año:   </Text>
                <TextInput
                    value={detailForm.año}
                    mode='outlined'
                    onChangeText={(value) => handlerSetDetailForm('año', value)} 
                    style={{ flex: 1 }}/>
            </View>
            <Button style={styles.buttonModal} mode='contained' icon="book-edit" onPress={() => handlerUpdateBook()}>Actualizar</Button>
            <Button mode='elevated' icon="book-remove" onPress={handlerDeleteBook}>Eliminar</Button>
        </View>
    )
}
