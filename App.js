import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './app/screens/Home';
import AppNavigation from './app/navigation/AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
      <StatusBar  
      style='light'
      />
    </NavigationContainer>
  );
}

