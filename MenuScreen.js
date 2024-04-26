import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = ({ route }) => {
  const navigation = useNavigation();
  const { season } = route.params; 
  const handleSeasonPressCircuits = () => {
    navigation.navigate('Circuits', { season }); 
  };

  const handleSeasonPressCompetitions = () => {
    navigation.navigate('Competitions', { season }); 
  };

  const handleSeasonPressTeams = () => {
    navigation.navigate('Teams', { season }); 
  };

  const handleSeasonPressDrivers = () => {
    navigation.navigate('Drivers', { season }); 
  };

  const handleSeasonPressRankingsMenu = () => {
    navigation.navigate('RankingsMenu', { season }); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню</Text>
      <TouchableOpacity style={styles.button} onPress={handleSeasonPressCircuits}>
        <Text style={styles.buttonText}>Трассы</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSeasonPressCompetitions}>
        <Text style={styles.buttonText}>Соревнования</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSeasonPressTeams}>
        <Text style={styles.buttonText}>Команды</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSeasonPressDrivers}>
        <Text style={styles.buttonText}>Водители</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSeasonPressRankingsMenu}>
        <Text style={styles.buttonText}>Рейтинг</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffdea',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#462e2e',
  },
  button: {
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#462e2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
