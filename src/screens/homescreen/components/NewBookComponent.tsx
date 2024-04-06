import { push, ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { database } from '../../../config/firebaseConfig'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'

interface Props{
    visible: boolean,
    setVisible: Function
}

interface BookForm{
    autor: string,
    titulo: string,
    año: string
}

export const NewBookComponent = ({ visible, setVisible }: Props) => {

    const [bookForm, setBookForm] = useState<BookForm>({
        autor: '',
        titulo: '',
        año: ''
    })

    const handlerSetBookForm = (key: string, value: string)=>{
        setBookForm({...bookForm, [key]: value})
    }

    const handlerSaveBook = async()=>{
        if(!bookForm.autor || !bookForm.titulo || !bookForm.año){
            return;
        }
        const dbRef = ref(database, 'books')
        const saveBook = push(dbRef)
        try {
           await set(saveBook, bookForm)
           setBookForm({
            año: '',
            titulo: '',
            autor: ''
           }) 
        } catch (error) {
            console.log(error)
        }
        setVisible(false);
    }

  return (
    <Portal>
            <Modal visible={visible} contentContainerStyle={styles.modalProfile}>
                <View style={styles.headerModal}>
                    <Text variant='headlineSmall'>Añadir nuevo libro</Text>
                    <IconButton icon='close' onPress={() => setVisible(false)} />
                </View>
                <Divider bold />
                <TextInput
                    label='Autor'
                    mode='outlined'
                    onChangeText={(value) => handlerSetBookForm('autor', value)} />               
                <TextInput
                    label='Título'
                    mode='outlined'
                    onChangeText={(value) => handlerSetBookForm('titulo', value)} />
                <TextInput
                    label='Año'
                    mode='outlined'
                    onChangeText={(value) => handlerSetBookForm('año', value)} />
                <Button style={styles.buttonModal} mode="contained" onPress={() => handlerSaveBook()}>Enviar</Button>
            </Modal>
        </Portal>
  )
}
