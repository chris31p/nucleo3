import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'

interface LoginForm {
  email: string,
  password: string
}

interface MessageSnackBar {
  visible: boolean,
  message: string,
  color: string
}

export const LoginScreen = () => {

  //HOOKS
  const navigation = useNavigation();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: ''
  })

  const [hiddenPassword, setHiddenPassword] = useState(true)

  const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
    visible: false,
    message: '',
    color: ''
  })

  const handlerSetLoginForm = (key: string, value: string) => {
    setLoginForm({ ...loginForm, [key]: value })
  }

  const handlerLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setMessageSnackBar({ visible: true, message: "Complete todos los campos", color: "#EC8415" })
      return;
    }
    try {
      //Inicia sesión con Firebase
      const response = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      //Guardamos el estado 
      await AsyncStorage.setItem('userLoggedIn', 'true')
      //console.log(response)
      navigation.dispatch(CommonActions.navigate({name: 'Home'}))
    } catch (error) {
      console.error(error)
      setMessageSnackBar({ visible: true, message: "Usuario y/o contraseña incorrecta, intenta nuevamente", color: "#EC1515" })
    }
  }

  return (
    <View style={styles.content}>
      <Text variant='headlineLarge'>Login</Text>
      <TextInput
        style={styles.inputs}
        label="Email"
        placeholder="Escribe tu correo"
        onChangeText={(value) => handlerSetLoginForm('email',value)}
      />
      <TextInput
        style={styles.inputs}
        label="Password"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
        onChangeText={(value) => handlerSetLoginForm('password',value)}
      />
      <Button
        style={styles.buttons}
        icon="login"
        mode="elevated"
        onPress={() => handlerLogin()}>
        Iniciar sesión
      </Button>
      <Snackbar
        visible={messageSnackBar.visible}
        onDismiss={() => setMessageSnackBar({ ...messageSnackBar, visible: false })}
        style={{ backgroundColor: messageSnackBar.color }}>
        {messageSnackBar.message}
      </Snackbar>
      <Text
        style={styles.textNavigation}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
        No tienes una cuenta? Regístrate ahora
      </Text>
    </View>
  )
}
