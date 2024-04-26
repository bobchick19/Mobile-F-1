import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CircuitsScreen = () => {
  const navigation = useNavigation();
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCircuitsData();
  }, []);

  const fetchCircuitsData = async () => {
    try {
      const response = await fetch("https://v1.formula-1.api-sports.io/circuits", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setCircuits(data.response); 
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о трассах');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleCircuitPress = (circuit) => {
    navigation.navigate('CircuitDetails', { circuit });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View>
            <Text style={styles.title}>Список трасс:</Text>
            {circuits.map((circuit, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleCircuitPress(circuit)}
              >
                <Text style={styles.buttonText}>{circuit.name}</Text>
                <Image source={{ uri: circuit.image }} style={styles.image} />
                <Text>{`Страна: ${circuit.competition.location.country}, Город: ${circuit.competition.location.city}`}</Text>
                <Text>{`Первый Гран При: ${circuit.first_grand_prix}`}</Text>
                <Text>{`Длина: ${circuit.length}`}</Text>
                <Text>{`Расстояние гонки: ${circuit.race_distance}`}</Text>
                <Text>{`Рекорд круга: ${circuit.lap_record.time} (${circuit.lap_record.driver}, ${circuit.lap_record.year})`}</Text>
                <Text>{`Вместимость: ${circuit.capacity}`}</Text>
                <Text>{`Открыт: ${circuit.opened}`}</Text>
              </TouchableOpacity>
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
  button: {
    backgroundColor: '#ffe5c8',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#462e2e',
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#462e2e',
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

export default CircuitsScreen;
