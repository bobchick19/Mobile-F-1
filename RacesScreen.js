import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RacesScreen = () => {
  const navigation = useNavigation();
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRacesData();
  }, []);

  const fetchRacesData = async () => {
    try {
      const response = await fetch("https://v1.formula-1.api-sports.io/races?competition=23&season=2021", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setRaces(data.response);
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о гонках');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleRacePress = (race) => {
    navigation.navigate('RaceDetails', { race });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <View>
          <Text style={styles.title}>Список гонок:</Text>
          {races.map((race, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleRacePress(race)}
            >
              <Text style={styles.buttonText}>{race.competition.name}</Text>
              <Image source={{ uri: race.circuit.image }} style={styles.image} />
              <Text>{`Страна: ${race.competition.location.country}, Город: ${race.competition.location.city}`}</Text>
              <Text>{`Дата: ${new Date(race.date).toLocaleDateString()}, Время: ${new Date(race.date).toLocaleTimeString()}`}</Text>
              <Text>{`Длина гонки: ${race.distance}`}</Text>
              <Text>{`Количество кругов: ${race.laps.total}`}</Text>
              <Text>{`Лучший круг: ${race.fastest_lap.time} (${race.fastest_lap.driver.id})`}</Text>
              <Text>{`Статус: ${race.status}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default RacesScreen;
