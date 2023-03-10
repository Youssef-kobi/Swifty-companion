import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID =
  'u-s4t2ud-08c9457f54e95abc4d90738e35b4cba78915a04c6dd4a20dd1935c8383db2c71';
const CLIENT_SECRET =
  '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';
const GRANT_TYPE = 'client_credentials';
const AUTH_URL = 'https://api.intra.42.fr/oauth/token/';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState({
    access_token: '',
    token_type: '',
    expires_in: 0,
    scope: '',
    created_at: 0,
  });

  const retrieveToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (storedToken !== null) {
        setToken(JSON.parse(storedToken));
      } else {
        refreshToken();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(AUTH_URL, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: GRANT_TYPE,
      });
      setToken(response.data);
      const newToken = {
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        expires_in: response.data.expires_in,
        scope: response.data.scope,
        created_at: Math.floor(Date.now() / 1000),
      };
      setToken(newToken);
      await AsyncStorage.setItem('access_token', JSON.stringify(newToken));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const expirationTime = token.created_at + token.expires_in;
      if (expirationTime - Math.floor(Date.now() / 1000) <= 60) {
        refreshToken();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
