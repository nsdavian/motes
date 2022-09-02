import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import AppNavigation from './app/navigation/AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <AppNavigation />
      </Provider>
      <StatusBar  
      style='inverted'
      />
    </NavigationContainer>
  );
}


