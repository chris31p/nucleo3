
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/homescreen/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { DetailBookScreen } from '../screens/homescreen/DetailBookScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {

  const navigation = useNavigation();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (userLoggedIn === 'true') {
        // Si el usuario está autenticado, navega directamente a la pantalla de inicio
        navigation.dispatch(CommonActions.navigate({ name: 'Home' }))
      }
    } catch (error) {
      console.error('Error al verificar estado de autenticación:');
    }
  };


  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Detail' component={DetailBookScreen} />
    </Stack.Navigator>
  );
};