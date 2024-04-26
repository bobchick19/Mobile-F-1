import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TeamsScreen = () => {
  const navigation = useNavigation();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    fetchTeamsData();
  }, []);

  const fetchTeamsData = async () => {
    try {
      const response = await fetch("https://v1.formula-1.api-sports.io/teams", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setTeams(data.response); 
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о командах');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleTeamPress = (team) => {
    
    setSelectedTeam(team);
    setModalVisible(true);
  };

  const closeModal = () => {
    
    setModalVisible(false);
    setSelectedTeam(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View>
            <Text style={styles.title}>Выберите команду:</Text>
            {teams.map((team, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleTeamPress(team)}
              >
                <Image source={{ uri: team.logo }} style={styles.logo} />
                <Text style={styles.teamName}>{team.name}</Text>
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
            <Text style={styles.modalText}>{selectedTeam?.name}</Text>
            <Image source={{ uri: selectedTeam?.logo }} style={styles.modalLogo} />
            <Text>{`База: ${selectedTeam?.base}`}</Text>
            <Text>{`Первый вход в команду: ${selectedTeam?.first_team_entry}`}</Text>
            <Text>{`Чемпионаты мира: ${selectedTeam?.world_championships}`}</Text>
            <Text>{`Самое высокое место на гонке: ${selectedTeam?.highest_race_finish.position}`}</Text>
            <Text>{`Пол позиций: ${selectedTeam?.pole_positions}`}</Text>
            <Text>{`Самые быстрые круги: ${selectedTeam?.fastest_laps}`}</Text>
            <Text>{`Президент: ${selectedTeam?.president}`}</Text>
            <Text>{`Директор: ${selectedTeam?.director}`}</Text>
            <Text>{`Технический менеджер: ${selectedTeam?.technical_manager}`}</Text>
            <Text>{`Шасси: ${selectedTeam?.chassis}`}</Text>
            <Text>{`Двигатель: ${selectedTeam?.engine}`}</Text>
            <Text>{`Шины: ${selectedTeam?.tyres}`}</Text>
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
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  teamName: {
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: '#462e2e',
  },
  modalLogo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
  },
  textStyle: {
    color: "#462e2e",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default TeamsScreen;
