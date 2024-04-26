import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Modal, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RankingsRacesMenuScreen = ({ route }) => {
  const navigation = useNavigation();
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { season } = route.params; 

  useEffect(() => {
    fetchRacesData();
  }, [season]);

  const fetchRacesData = async () => {
    try {
      const response = await fetch(`https://v1.formula-1.api-sports.io/races?competition=23&season=${season}`, {
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
    setSelectedRace(race);
    setModalVisible(true);
  };

  const handleNavigateToDetails = (screen) => {
    setModalVisible(false);
    navigation.navigate(screen, { raceId: selectedRace.id }); 
  };

  return (
    <ScrollView style={styles.container}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Выберите действие:</Text>
            <View style={styles.modalButton}>
              <Button title="Самый быстрый круг" onPress={() => handleNavigateToDetails('FastestLaps')} />
            </View>
            <View style={styles.modalButton}>
              <Button title="Стартовая сетка" onPress={() => handleNavigateToDetails('StartingGrid')} />
            </View>
            <View style={styles.modalButton}>
              <Button title="Отмена" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffdea',
  },
  modalContent: {
    backgroundColor: '#fffdea',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#462e2e',
  },
  modalButton: {
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
    width: '100%',
    marginBottom: 10,
  },
});

export default RankingsRacesMenuScreen;
