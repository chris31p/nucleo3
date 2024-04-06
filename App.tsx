import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { StackNavigator} from './src/navigator/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StackNavigator>
        </StackNavigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
