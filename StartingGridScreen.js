import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const StartingGridScreen = () => {
  const raceId = useSelector(state => state.raceId);
  const [startingGrid, setStartingGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStartingGridData();
  }, [raceId]);

  const fetchStartingGridData = async () => {
    try {
      const response = await fetch(`https://v1.formula-1.api-sports.io/rankings/startinggrid?race=${raceId}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setStartingGrid(data.response);
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о стартовой сетке');
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
            <Text style={styles.title}>Стартовая сетка:</Text>
            {startingGrid.map((entry, index) => (
              <View key={index} style={styles.gridEntry}>
                <Image source={{ uri: entry.driver.image }} style={styles.image} />
                <Text>{`${entry.driver.name} (${entry.driver.abbr})`}</Text>
                <Text>{`Команда: ${entry.team.name}`}</Text>
                <Text>{`Позиция: ${entry.position}`}</Text>
                <Text>{`Время: ${entry.time}`}</Text>
              </View>
            ))}
          </View>
        )}
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
  gridEntry: {
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

export default StartingGridScreen;
