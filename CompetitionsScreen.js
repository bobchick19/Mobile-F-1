import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CompetitionsScreen = () => {
  const navigation = useNavigation();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitionsData();
  }, []);

  const fetchCompetitionsData = async () => {
    try {
      const response = await fetch("https://v1.formula-1.api-sports.io/competitions", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94" 
        }
      });

      const data = await response.json();
      if (data && data.response) {
        setCompetitions(data.response); 
        setLoading(false);
      } else {
        console.error('Ошибка при получении данных о соревнованиях');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleCompetitionPress = () => {
    navigation.navigate('Circuits');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <View>
            <Text style={styles.title}>Выберите соревнование:</Text>
            {competitions.map((competition, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleCompetitionPress(competition)}
              >
                <Text style={styles.buttonText}>{competition.name}</Text>
                <Text>{`${competition.location.city}, ${competition.location.country}`}</Text>
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#ffe5c8',
    borderWidth: 1,
    borderColor: '#462e2e',
  },
  buttonText: {
    color: '#462e2e',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CompetitionsScreen;
