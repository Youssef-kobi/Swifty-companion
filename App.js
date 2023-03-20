import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthCtx';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Search';
import { useEffect, useState } from 'react';
// import UserProfile from './UserProfile';
import UserTabsNavigation from './UserProfile/UserTabsNavigation';
import Login from './Login';
import Screens from './screens';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Screens />
        <StatusBar backgroundColor='#FFFFFF70' barStyle='dark-content' />
      </AuthProvider>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f42c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'repeat',
    // width: '100%',
    // height: '100px',
    justifyContent: 'center',
  },
});
