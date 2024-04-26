import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Modal, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setRaceId } from './actions'; // Предполагается, что у вас есть файл actions.js для действий Redux

const RankingsRacesMenuScreen = () => {
  const dispatch = useDispatch();
  const races = useSelector(state => state.races);
  const loading = useSelector(state => state.loading);
  const [selectedRace, setSelectedRace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchRacesData();
  }, []);

  const fetchRacesData = async () => {
    try {
      // Здесь происходит запрос данных о гонках и обновление состояния Redux
      dispatch(setRaceData(data.response)); // предположим, что data.response содержит массив гонок
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
    // Нет необходимости передавать raceId через навигацию, так как он хранится в Redux
    navigation.navigate(screen);
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
