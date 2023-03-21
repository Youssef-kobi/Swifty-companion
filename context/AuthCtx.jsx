import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as Random from 'expo-random';
import axios from 'axios';
import {
  AUTH_ENDPOINT,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_URL,
  SCOPES,
} from '@env';

const authEndpoint = AUTH_ENDPOINT;
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const tokenUrl = TOKEN_URL;
const scopes = SCOPES.split(',');

export const AuthContext = createContext({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  useEffect(() => {
    // Retrieve the tokens from async storage when the component mounts
    const retrieveTokens = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const expiresAt = await AsyncStorage.getItem('expiresAt');
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresAt(expiresAt);
    };

    retrieveTokens();
  }, []);
  useEffect(() => {
    const checkAccessToken = async () => {
      if (!accessToken) {
        return;
      }
      // Check if the access token is expired
      const now = Date.now();
      const expiresAt = await AsyncStorage.getItem('expiresAt');
      if (expiresAt && now > parseInt(expiresAt)) {
        await getRefreshedTokens(refreshToken);
      }
    };
    checkAccessToken();
  }, []);
  
  const getRefreshedTokens = async (refToken) => {
    try {
      const body = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: refToken,
      };
      const response = await axios.post(tokenUrl, body);
      const { access_token, refresh_token } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setExpiresAt(Date.now() + response.data.expires_in);
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
      await AsyncStorage.setItem(
        'expiresAt',
        JSON.stringify(Date.now() + response.data.expires_in)
      );
    } catch (error) {
      throw new Error(error);
    }
  };
  const signIn = async () => {
    try {
      const state = await Random.getRandomBytesAsync(10).then((bytes) =>
        bytes.map((b) => b.toString(16).padStart(2, '0')).join('')
      );
      const redirectUri = AuthSession.getRedirectUrl();
      const scopes = ['public', 'projects', 'profile'];
      const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=${scopes.join('%20')}&state=${state}`;

      const result = await AuthSession.startAsync({ authUrl });

      if (result.type !== 'success') {
        throw new Error(`Authentication error: ${result.error}`);
      }

      const { params } = result;
      if (params.state !== state) {
        throw new Error('Invalid state value');
      }

      const tokenRequestBody = {
        client_id: clientId,
        client_secret: clientSecret,
        code: params.code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      };
      const response = await axios.post(tokenUrl, tokenRequestBody);
      const { access_token, refresh_token, expires_in } = response.data;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setExpiresAt(Date.now() + expires_in);
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
      await AsyncStorage.setItem(
        'expiresAt',
        JSON.stringify(Date.now() + response.data.expires_in)
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    // Remove the tokens from async storage and reset the state
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('expiresAt');
    setAccessToken(null);
    setRefreshToken(null);
    setExpiresAt(null);
  };

  const contextValues = {
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    signIn,
    signOut,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
