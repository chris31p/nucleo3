import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, List, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import firebase from 'firebase/auth';
import { auth, database } from '../../config/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { NewBookComponent } from './components/NewBookComponent';
import { BookCardComponent } from './components/BookCardComponent';

interface UserForm {
    name: string
}

export interface Book {
    id: string,
    autor: string,
    titulo: string,
    año: string
}

export const HomeScreen = () => {

    const imagen = { uri: 'https://1.bp.blogspot.com/-5gfhYqpGasE/X992kbRT7oI/AAAAAAAABcM/gaA-UgKO8GYO2kF6No5qNot5fuQFag2pwCLcBGAsYHQ/s554/images.jpeg%20resizeImage%20120' }
    const navigation = useNavigation()

    //HOOKS
    const [showModalProfile, setShowModalProfile] = useState(false)
    
    const [showModalBook, setShowModalBook] = useState(false)

    const [userForm, setUserForm] = useState<UserForm>({
        name: ''
    })

    const [userAuth, setUserAuth] = useState<firebase.User | null>(null)

    const [books, setBooks] = useState<Book[]>([])

    //FUNCIONES
    useEffect(() => {
        setUserAuth(auth.currentUser)
        setUserForm({ name: auth.currentUser?.displayName ?? '' })
        getAllBooks();    
    }, [])

    const handlerUpdateUserForm = (key: string, value: string) => {
        setUserForm({ ...userForm, [key]: value })
    }

    const handlerUpdateUser = async () => {
        await updateProfile(userAuth!, { displayName: userForm.name })
        console.log(userForm)
        setShowModalProfile(false)
    }

    const getAllBooks = () => {
        const dbRef = ref(database, 'books')
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const getKeys = Object.keys(data)
            const listBooks: Book[] = []
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key }
                listBooks.push(value)
            })
            setBooks(listBooks)
        })
    }

    const signOutUser = async () => {
        try {
            await auth.signOut();
            navigation.goBack();
        } catch (error) {
            console.error('Error al cerrar sesión:');
        }
    };

    return (
        <View style={styles.contentHome}>
            <View style={styles.headerHome}>
                <Avatar.Image size={70} source={imagen} />
                <View>
                    <Text variant='headlineMedium'>Bienvenido</Text>
                    <Text variant='titleMedium'>{userForm.name}</Text>
                </View>
                <View style={styles.icon}>
                    <IconButton
                        icon="cog-sync"
                        mode='outlined'
                        iconColor='#CF571F'
                        size={25}
                        onPress={() => setShowModalProfile(true)} />
                </View>
            </View>
            <View>
                <List.Section title="BIBLIOTECA DIGITAL">
                    <List.Accordion
                        title="Listado de libros"
                        left={props => <List.Icon {...props} icon="book-open-page-variant" />}>
                       <FlatList
                        data={books}
                        renderItem={({ item }) => <BookCardComponent book={item}/>}
                        keyExtractor={item => item.id}
                    />
                    </List.Accordion>                    
                </List.Section>
            </View>
            <Portal>
                <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
                    <View style={styles.headerModal}>
                        <Text variant='headlineSmall'>Mi Perfil</Text>
                        <IconButton icon='close' onPress={() => setShowModalProfile(false)} />
                    </View>
                    <Divider />
                    <View>
                        <TextInput
                            mode='outlined'
                            label='Nombre'
                            value={userForm.name}
                            onChangeText={(value) => handlerUpdateUserForm('name', value)}
                        />
                        <TextInput
                            mode='outlined'
                            label='Correo'
                            value={userAuth?.email!} 
                            disabled
                        />
                    </View>
                    <Button style={styles.buttonModal} mode="contained" onPress={() => handlerUpdateUser()}>Actualizar</Button>
                    <Button onPress={signOutUser}>Cerrar sesión</Button>
                </Modal>
            </Portal>
            <FAB
                icon="plus"
                style={styles.iconPlus}
                mode='elevated'
                onPress={() => setShowModalBook(true)}
            />
            <NewBookComponent visible={showModalBook} setVisible={setShowModalBook}/>
        </View>
    )
}
