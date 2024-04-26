import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SeasonsScreen = () => {
  const navigation = useNavigation();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeasonsData();
  }, []);

  const fetchSeasonsData = async () => {
    try {
      const response = await fetch("https://v1.formula-1.api-sports.io/seasons", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setSeasons(data.response); 
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о сезонах');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleSeasonPress = (season) => {
    navigation.navigate('Menu', { season });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <View>
          <Text style={styles.title}>Выберите сезон:</Text>
          {seasons.map((season, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleSeasonPress(season)}
            >
              <Text style={styles.buttonText}>{season}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  button: {
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#462e2e',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SeasonsScreen;
