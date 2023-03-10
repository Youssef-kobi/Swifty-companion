import React, { useReducer, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserProjects = ({ route }) => {
  const { user } = route.params;
  const Projects = user.projects_users;
  console.log(Projects[25]);
  // const [expandedProjects, setExpandedProjects] = useState({});
  const [loadingProjects, setLoadingProjects] = useState({});
  const initialState = {};

  function reducer(state, action) {
    switch (action.type) {
      case 'toggle':
        return {
          ...state,
          [action.projectId]: !state[action.projectId],
        };
      default:
        throw new Error();
    }
  }

  const [expandedProjects, dispatch] = useReducer(reducer, initialState);

  const handleProjectPress = async (projectId) => {
    // setExpandedProjects({
    //   ...expandedProjects,
    //   [projectId]: !expandedProjects[projectId],
    // });
    dispatch({ type: 'toggle', projectId });
    if (!expandedProjects[projectId]) {
      setLoadingProjects({ ...loadingProjects, [projectId]: true });
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingProjects({ ...loadingProjects, [projectId]: false });
    }
  };
  const dateFormatter = (time) => {
    const date = new Date(time);
    const formattedDate = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    return formattedDate;
  };
  const getStatusIcon = (project) => {
    // console.log(project['validated?']);
    if (project?.status === 'in_progress') {
      // should display a orange circle with a text "In Progress"
      return (
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            <Icon name='circle' size={14} color='orange' />
          </View>
          <Text style={styles.statusIconText}>In Progress{` `}</Text>
        </View>
      );
    } else if (project?.status === 'finished' && project['validated?']) {
      return (
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            <Icon name='circle' size={14} color='green' />
          </View>
          <Text style={styles.statusIconText}>Success{` `}</Text>
        </View>
      );
    } else if (project?.status === 'searching_a_group') {
      return (
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            <Icon name='circle' size={14} color='blue' />
          </View>
          <Text style={styles.statusIconText}>Grouping{` `}</Text>
        </View>
      );
    } else if (project?.status === 'finished' && project['validated?'] === null) {
      return (
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            <Icon name='circle' size={14} color='pink' />
          </View>
          <Text style={styles.statusIconText}>Not pushed{` `}</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.statusContainer, styles.pendingStatusIcon]}>
          <View style={styles.statusIcon}>
            <Icon name='circle' size={14} color='red' />
          </View>
          <Text style={styles.statusIconText}>Failed {` `}</Text>
        </View>
      );
    }
  };
  return (
    <ImageBackground
      source={require('../assets/BG.png')}
      resizeMode='repeat'
      style={styles.backgroundImage}
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Projects:</Text>
            {Projects.map((project, index) => (
              <View style={styles.project} key={project.id}>
                <TouchableOpacity
                  style={styles.projectHeader}
                  onPress={() => handleProjectPress(project.id)}
                >
                  <Text style={styles.name}>{project.project.name}</Text>
                  {getStatusIcon(project)}
                  {/* <Text style={styles.name}>{project.}</Text> */}
                </TouchableOpacity>
                {loadingProjects[project.id] ? (
                  <ActivityIndicator size='small' color='#0000ff' />
                ) : (
                  <View
                    style={[
                      styles.projectDetails,
                      expandedProjects[project.id] && styles.showProjectDetails,
                    ]}
                  >
                    <Text style={styles.projectDetailsText}>
                      Project Details:
                    </Text>
                    <Text>Final Mark: {project.final_mark}</Text>
                    <Text>
                      Corrected the: {dateFormatter(project.marked_at)}
                    </Text>
                    {/* <Text>Started At: {project.created_at}</Text> */}
                  </View>
                )}
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
    // display: 'flex',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  container: {
    marginTop: StatusBar.currentHeight + 20,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // height: '100%',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF80',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  project: {
    // width: '80%',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF80',
    padding: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 8,
      height: 12,
    },
  },
  projectHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
    // marginBottom: 10,
  },
  projectDetails: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    display: 'none', // hide by default
    borderRadius: 10,
  },
  showProjectDetails: {
    display: 'flex', // show when expanded
  },
  projectDetailsText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '26%',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  statusIcon: {
    marginRight: 2,
  },
  statusIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'gray',
  },
});

export default UserProjects;
