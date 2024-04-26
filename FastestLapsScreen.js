import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const FastestLapsScreen = () => {
  const raceId = useSelector(state => state.raceId);
  const [fastestLaps, setFastestLaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFastestLapsData();
  }, [raceId]);

  const fetchFastestLapsData = async () => {
    try {
      const response = await fetch(`https://v1.formula-1.api-sports.io/fastest-laps?race=${raceId}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setFastestLaps(data.response);
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о самых быстрых кругах');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View>
            <Text style={styles.title}>Самые быстрые круги:</Text>
            {fastestLaps.map((lap, index) => (
              <View key={index} style={styles.lapEntry}>
                <Text>{`Водитель: ${lap.driver.name}`}</Text>
                <Text>{`Команда: ${lap.team.name}`}</Text>
                <Text>{`Время: ${lap.time}`}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
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
  lapEntry: {
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default FastestLapsScreen;
