import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';

const RankingsTeamsScreen = ({ route }) => {
  const { season } = route.params; 
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamsData();
  }, [season]); 

  const fetchTeamsData = async () => {
    try {
      const response = await fetch(`https://v1.formula-1.api-sports.io/rankings/teams?season=${season}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v1.formula-1.api-sports.io',
          'x-rapidapi-key': '19eb62b63af1165f35cb1145dde81c94', 
        },
      });

      const data = await response.json();
      if (data && data.response) {
        setTeamsData(data.response); 
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о рейтинге команд');
        setLoading(false); 
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setLoading(false); 
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Рейтинг команд сезона {season}</Text>
        {teamsData.map((team, index) => (
          <View key={index} style={styles.teamContainer}>
            <Image source={{ uri: team.team.logo }} style={styles.teamLogo} />
            <Text style={styles.position}>Позиция: {team.position}</Text>
            <Text style={styles.teamName}>{team.team.name}</Text>
            <Text style={styles.points}>Очки: {team.points}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffdea',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffdea',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#462e2e',
  },
  teamContainer: {
    marginBottom: 20,
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
    padding: 10,
    borderRadius: 8,
    width: '100%', 
    alignItems: 'center',
  },
  teamLogo: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginBottom: 10,
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#462e2e',
  },
  teamName: {
    fontSize: 16,
    marginBottom: 5,
    color: '#462e2e',
  },
  points: {
    fontSize: 14,
    marginBottom: 5,
    color: '#462e2e',
  },
});

export default RankingsTeamsScreen;
