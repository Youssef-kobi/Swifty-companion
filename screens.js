import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from './context/AuthCtx';
import Login from './Login';
import Search from './Search';
import UserTabsNavigation from './UserProfile/UserTabsNavigation';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Screens = () => {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useAuth();
  const screenOptions = {
    headerShown: false, // hide the header on all screens
    loadingEnabled: true, // enable the loading component
    loadingComponent: (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FFFFFF' />
      </View>
    ), // set the custom loading component
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name='SearchScreen'
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='UserTabsNavigation'
            options={{ headerShown: false }}
            component={UserTabsNavigation}
          />
        </>
      ) : (
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Screens;

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});