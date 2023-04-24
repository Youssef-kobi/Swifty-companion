import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from './context/AuthCtx';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
const authEndpoint = 'https://api.intra.42.fr/oauth/authorize';
const clientId =
  'u-s4t2ud-08c9457f54e95abc4d90738e35b4cba78915a04c6dd4a20dd1935c8383db2c71';
const clientSecret =
  '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';
const tokenUrl = 'https://api.intra.42.fr/oauth/token';
const scopes = ['public', 'projects', 'profile'];
const Login = () => {
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signOut, isAuthenticated, loading, setLoading } = useAuth();
  const navigation = useNavigation();

  // Check if the user is authenticated and redirect to the appropriate screen
  if (isAuthenticated) {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('./assets/BG.png')}
        resizeMode='repeat'
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Yel-Search</Text>
            <Text style={styles.inputTextSmall}>Please Login </Text>
            <TouchableOpacity style={styles.button} onPress={() => signIn()}>
              <Text style={styles.buttonText}>Login using intra 42</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#FFFFFF' />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,

    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    // marginTop: 100,
    backgroundColor: '#FFFFFF80',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  inputText: {
    fontSize: 30,
    color: '#2B2D42',
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: '100%',
    // marginBottom: 25,
  },
  inputTextSmall: {
    fontSize: 15,
    color: '#2B2D42',
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2B2D42',
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
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
export default Login;
