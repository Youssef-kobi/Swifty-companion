import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserInfo = ({ route }) => {
  const user = route.params.user;
  const {
    phone,
    wallet: walletBalance,
    correction_point: correctionPoints,
    campus = [],
    cursus_users,
    active: isActive = false,
    staff: isStaff = false,
  } = user;
  const cursus = cursus_users.find(
    (cu) => cu.cursus_id === 21 || cu.cursus_id === 1
  );
  const date = new Date(cursus.begin_at);
  const formattedDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  return (
    <ImageBackground
      source={require('../assets/BG.png')}
      resizeMode='repeat'
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: user.image.link }} />
            {user.isActive ? (
              <View style={styles.activeDot}>
                <Icon size={32} name='circle' color='green' />
              </View>
            ) : (
              <View style={styles.inactiveDot}>
                <Icon name='circle' size={32} color='gray' />
              </View>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {user.usual_full_name}
              {` `}
            </Text>
            <Text style={styles.login}>
              {user.login}
              {` `}
            </Text>
          </View>
          <View style={styles.userInfoContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{phone}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Wallet balance:</Text>
              <Text style={styles.value}>{walletBalance}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Begin:</Text>
              <Text style={styles.value}>{formattedDate}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Level:</Text>
              <Text style={styles.value}>{cursus.level}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Correction points:</Text>
              <Text style={styles.value}>{correctionPoints}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Campus:</Text>
              <Text style={styles.value}>{campus[0].name}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF80',
  },
  imageContainer: {
    marginBottom: 10,
    position: 'relative',
    // overflow: 'hidden',
    // borderRadius: 100,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    right: 15,
  },
  inactiveDot: {
    position: 'absolute',
    bottom: 0,
    right: 15,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 10,
    width: '100%',
    backgroundColor: '#FFFFFF80',
    padding: 10,
    borderRadius: 10,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontWeight: 'normal',
    fontSize: 16,
  },
  name: {
    fontStyle: 'italic',
    width: '100%',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  login: {
    fontStyle: 'italic',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UserInfo;
