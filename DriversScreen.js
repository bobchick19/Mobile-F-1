import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DriversScreen = () => {
  const navigation = useNavigation();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    fetchDriversData();
  }, []);

  const fetchDriversData = async () => {
    try {
      const response = await fetch("https://v1.formula-1.api-sports.io/drivers?search=lewi", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setDrivers(data.response); 
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о гонщиках');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleDriverPress = (driver) => {
    setSelectedDriver(driver);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDriver(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View>
            <Text style={styles.title}>Выберите гонщика:</Text>
            {drivers.map((driver, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleDriverPress(driver)}
              >
                <Image source={{ uri: driver.image }} style={styles.image} />
                <Text style={styles.driverName}>{driver.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedDriver?.name}</Text>
            <Image source={{ uri: selectedDriver?.image }} style={styles.modalImage} />
            <Text>{`Национальность: ${selectedDriver?.nationality}`}</Text>
            <Text>{`Страна: ${selectedDriver?.country.name} (${selectedDriver?.country.code})`}</Text>
            <Text>{`Дата рождения: ${selectedDriver?.birthdate}`}</Text>
            <Text>{`Место рождения: ${selectedDriver?.birthplace}`}</Text>
            <Text>{`Номер: ${selectedDriver?.number}`}</Text>
            <Text>{`Гран-при участвовал: ${selectedDriver?.grands_prix_entered}`}</Text>
            <Text>{`Чемпионаты мира: ${selectedDriver?.world_championships}`}</Text>
            <Text>{`Подиумы: ${selectedDriver?.podiums}`}</Text>
            <Text>{`Самое высокое место на гонке: ${selectedDriver?.highest_race_finish.position}`}</Text>
            <Text>{`Самая высокая стартовая позиция: ${selectedDriver?.highest_grid_position}`}</Text>
            <Text>{`Карьерные очки: ${selectedDriver?.career_points}`}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    borderWidth: 1,
    borderColor: '#462e2e',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  driverName: {
    color: '#462e2e',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fffdea",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    color: '#462e2e',
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: '#462e2e',
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default DriversScreen;
