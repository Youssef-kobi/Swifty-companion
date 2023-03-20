import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from './context/AuthCtx';
import Login from './Login';
import Search from './Search';
import UserTabsNavigation from './UserProfile/UserTabsNavigation';

const Screens = () => {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useAuth();
  return (
    <Stack.Navigator>
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
