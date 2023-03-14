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
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Profile from './UserProfile';

const Tab = createBottomTabNavigator();
const UserTabsNavigation = ({ route }) => {
  const user = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Info') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'folder-open' : 'folder-outline';
          } else if (route.name === 'Skills') {
            iconName = focused ? 'code-working' : 'ios-code-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => {
          if (route.name === 'Info') {
            return (
              <Text style={{ color: 'black', fontSize: 12 }}>Profile</Text>
            );
          } else if (route.name === 'Projects') {
            return (
              <Text style={{ color: 'black', fontSize: 12 }}>Projects</Text>
            );
          } else if (route.name === 'Skills') {
            return <Text style={{ color: 'black', fontSize: 12 }}>Skills</Text>;
          }
        },
        tabBarStyle: {
          // backgroundColor: '#FFFFFF80',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          
        },
        tabBarActiveTintColor: 'blue',
        // tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='Info'
        component={UserInfo}
        initialParams={{ user: user }}
      />
      <Tab.Screen
        name='Projects'
        component={UserProjects}
        initialParams={{ user }}
      />
      <Tab.Screen
        name='Skills'
        component={UserSkills}
        initialParams={{ user }}
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
    // color: 'green',
  },
});

export default UserTabsNavigation;
