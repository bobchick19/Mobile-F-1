import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';

const FastestLapsScreen = ({ route }) => {
  const { raceId } = route.params; 
  const [fastestLaps, setFastestLaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFastestLapsData();
  }, [raceId]); 

  const fetchFastestLapsData = async () => {
    try {
      const response = await fetch(`https://v1.formula-1.api-sports.io/rankings/fastestlaps?race=${raceId}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      console.log(data)
      if (data && data.response) {
        setFastestLaps(data.response);
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о быстрых кругах');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Самые быстрые круги:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        fastestLaps.map((lap, index) => (
          <View key={index} style={styles.fastestLap}>
            <Image source={{ uri: lap.driver.image }} style={styles.image} />
            <Text>{`${lap.driver.name} (${lap.driver.abbr})`}</Text>
            <Text>{`Команда: ${lap.team.name}`}</Text>
            <Text>{`Позиция: ${lap.position}`}</Text>
            <Text>{`Круг: ${lap.lap}`}</Text>
            <Text>{`Время: ${lap.time}`}</Text>
            <Text>{`Средняя скорость: ${lap.avg_speed} км/ч`}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  fastestLap: {
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default FastestLapsScreen;
