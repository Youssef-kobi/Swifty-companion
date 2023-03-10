import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import UserAchievement from './UserSkills';
import UserInfo from './UserInfos';
import UserProjects from './UserProjects';
import UserSkills from './UserSkills';
import Icon from 'react-native-vector-icons/Entypo';
import IconB from 'react-native-vector-icons/MaterialIcons';
// import Profile from './UserProfile';

const Tab = createBottomTabNavigator();
const UserTabsNavigation = ({ route }) => {
  const user = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#2B2D42',
        inactiveTintColor: '#8D99AE',
        labelStyle: styles.label,
        style: styles.tabBar,
      }}
    >
      <Tab.Screen
        name='Info'
        component={UserInfo}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Icon name='info' size={28} />
              <Text style={styles.text}>Infos</Text>
            </View>
          ),
        }}
        initialParams={{ user: user }}
      />
      <Tab.Screen
        name='Projects'
        options={{
          // tabBarLabel: 'Info',
          tabBarShowLabel: false,

          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <IconB name='work-outline' size={32} />
              <Text style={styles.text}>Projects</Text>
            </View>
          ),
        }}
        component={UserProjects}
        initialParams={{ user }}
      />
      <Tab.Screen
        name='Skills'
        component={UserSkills}
        initialParams={{ user }}
        options={{
          // tabBarLabel: 'Info',
          tabBarShowLabel: false,

          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Icon name='code' size={32} />
              <Text style={styles.text}>Skills</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF80',
    paddingTop: 30,
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'repeat',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#2B2D42',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#FFFFFF80',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default UserTabsNavigation;
