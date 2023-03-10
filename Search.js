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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const schema = yup.object().shape({
  search: yup.string().min(6).max(12).required('Search is required'),
});

const Search = () => {
  const { token } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    fetchUsers(data.search);
  };

  const fetchUsers = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.intra.42.fr/v2/users/${query.toLowerCase()}`,
        {
          headers: {
            Authorization: `${token?.token_type} ${token?.access_token}`,
          },
        }
      );
      setLoading(false);
      navigation.navigate('UserTabsNavigation', response.data);
    } catch (error) {
      // console.error(error);
      setError('search', {
        type: 'string',
        message: 'User not found',
      })
      setLoading(false);
    }
  };

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
            <Text style={styles.inputTextSmall}>
              Please type a 42 user login{' '}
            </Text>
            <Controller
              name='search'
              control={control}
              defaultValue=''
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='Search'
                  placeholderTextColor='#c0c0c0'
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  value={value}
                />
              )}
            />
            {errors?.search && (
              <Text style={styles.error}>{errors.search.message}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    // resizeMode: 'repeat',
    // width: '100%',
    // height: '100px',
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
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF80',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#000000',
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

export default Search;
