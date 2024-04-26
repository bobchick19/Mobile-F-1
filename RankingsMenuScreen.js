import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RankingsMenuScreen = ({ route }) => {
  const navigation = useNavigation();
  const { season } = route.params;

  const handleSeasonPressRankingsTeams = (season) => {
    navigation.navigate('RankingsTeams', { season });
  };

  const handleSeasonPressRankingsDrivers = (season) => {
    navigation.navigate('RankingsDrivers', { season });
  };

  const handleSeasonPressRankingsRacesMenu = (season) => {
    navigation.navigate('RankingsRacesMenu', { season });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Меню</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleSeasonPressRankingsTeams(season)}>
        <Text style={styles.buttonText}>Команды</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSeasonPressRankingsDrivers(season)}>
        <Text style={styles.buttonText}>Водители</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSeasonPressRankingsRacesMenu(season)}>
        <Text style={styles.buttonText}>Трассы</Text>
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

export default RankingsMenuScreen;
