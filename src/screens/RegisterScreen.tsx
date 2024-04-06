import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Card, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

interface RegisterForm {
    name: string,
    email: string,
    password: string
}

interface MessageSnackBar {
    visible: boolean,
    message: string,
    color: string
}

const image = { uri: "https://png.pngtree.com/png-vector/20220821/ourlarge/pngtree-cv-career-apply-job-vector-png-image_33368672.png" };

export const RegisterScreen = () => {

    //HOOKS
    //Navegación:
    const navigation = useNavigation();

    //Estado inicial del formulario
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        name: '',
        email: '',
        password: ''
    });

    //Mostrar-Ocultar la contraseña
    const [hiddenPassword, setHiddenPassword] = useState(true)

    //Función mensajes dinámicos
    const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
        visible: false,
        message: "",
        color: ""
    })

    //Método para setear los valores
    const handlerSetRegisterForm = (key: string, value: string) => {
        setRegisterForm({ ...registerForm, [key]: value })
    };

    //Función para tomar los datos del registro
    const handlerRegister = async () => {
        if (!registerForm.name || !registerForm.email || !registerForm.password) {
            //Cambiar estado para visualizar el msj
            setMessageSnackBar({ visible: true, message: "Complete todos los datos", color: "#EC8415" })
            return;
        }
        //Registrar usuario
        try {
            const response = await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password);
            setMessageSnackBar({ visible: true, message: "¡Registro exitoso!", color: "#027C0B" })
        } catch (e) {
            console.log(e);
            setMessageSnackBar({ visible: true, message: "No se completó el registro o ya existe este usuario", color: "#EC1515" })
        }
        console.log(registerForm)
    }

    return (
        <View style={styles.content}>
            <Text variant='headlineLarge'>Regístrate</Text>
            <Card style={styles.logo}>            
                <Card.Cover source={image}/>                
            </Card>
            <TextInput
                style={styles.inputs}
                label="Nombre"
                placeholder="Escribe tu nombre"
                onChangeText={(value) => handlerSetRegisterForm('nombre', value)}
            />
            <TextInput
                style={styles.inputs}
                label="Correo"
                placeholder="Escribe tu correo"
                onChangeText={(value) => handlerSetRegisterForm('email', value)}
            />
            <TextInput
                style={styles.inputs}
                label="Contraseña"
                placeholder="Escribe tu contraseña"
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
                onChangeText={(value) => handlerSetRegisterForm('password', value)}
            />
            <Button
                style={styles.buttons}
                icon="content-save"
                mode="elevated"
                onPress={() => handlerRegister()}>
                Registrarme
            </Button>
            <Snackbar
                visible={messageSnackBar.visible}
                onDismiss={() => setMessageSnackBar({ ...messageSnackBar, visible: false })}
                style={{ backgroundColor: messageSnackBar.color }}>
                {messageSnackBar.message}
            </Snackbar>
            <Text
                style={styles.textNavigation}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                Si ya tienes una cuenta. Inicia sesión aquí
            </Text>
        </View>
    )
}
