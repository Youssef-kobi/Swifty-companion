import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

const UserSkills = ({ route }) => {
  const { user } = route.params;
  const cursus = user.cursus_users.find(
    (cu) => cu.cursus_id === 21 || cu.cursus_id === 1
    );
    const skills = cursus.skills;
  const progressAnims = skills.map(() => new Animated.Value(0));

    useEffect(() => {
      // Animate progress bar for each skill
      skills.forEach((skill, index) => {
        Animated.timing(progressAnims[index], {
          toValue: skill.level,
          duration: 1000,
          delay: index * 200,
          useNativeDriver: false,
        }).start();
      });
    }, []);

  return (
    <ImageBackground
      source={require('../assets/BG.png')}
      resizeMode='repeat'
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Skills:</Text>
            {skills.map((skill, index) => (
              <View style={styles.skill} key={skill.id}>
                <Text style={styles.name}>{skill.name}</Text>
                <View style={styles.progressBarContainer}>
                  <Animated.View
                    style={[
                      styles.progressBar,
                      {
                        width: progressAnims[index].interpolate({
                          inputRange: [0, 21],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]}
                  />
                  <Text style={styles.level}>{skill.level.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
    marginTop: StatusBar.currentHeight + 20,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // width: '100%',
    // height: '100%',
    // alignItems: 'stretch',
    backgroundColor: '#FFFFFF80',
  },
  title: {
    fontSize: 30,
    color: '#2B2D42',
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'center',
    marginBottom: 25, 
  },
  skill: {
    backgroundColor: '#FFFFFF80',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2B2D42',
  },
  progressBarContainer: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  level: {
    position: 'absolute',
    right: 0,
    fontSize: 10,
    color: '#666',
    paddingHorizontal: 5,
  },
});

export default UserSkills;
