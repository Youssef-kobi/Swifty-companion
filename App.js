import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthCtx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Search';
import { useState } from 'react';
// import UserProfile from './UserProfile';
import UserTabsNavigation from './UserProfile/UserTabsNavigation';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Search'
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='UserTabsNavigation'
            options={{ headerShown: false }}
            component={UserTabsNavigation}
          />
        </Stack.Navigator>
        <StatusBar backgroundColor='#FFFFFF70' barStyle='dark-content' />
      </NavigationContainer>
    </AuthProvider>
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
