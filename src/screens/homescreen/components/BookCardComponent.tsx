import React from 'react'
import { Book } from '../HomeScreen'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../../theme/styles'

interface Props {
    book: Book
}
export const BookCardComponent = ({ book }: Props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.contentBook}>
            <View>
                <Text variant='labelLarge'>Autor: {book.autor}</Text>
                <Text variant='labelLarge'>Título: {book.titulo}</Text>
            </View>
            <View style={styles.icon}>
                <IconButton
                    icon="book-search-outline"
                    iconColor='#1F92CF'
                    size={25}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { book } }))} />
            </View>
        </View>
    )
}
