import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const LocationScreen = ({ navigation }) => {
  const [continents, setContinents] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimezones();
  }, []);

  const fetchTimezones = async () => {
    try {
      const response = await fetch("https://v1.formula-1.api-sports.io/timezone", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
          "x-rapidapi-key": "19eb62b63af1165f35cb1145dde81c94"
        }
      });

      const data = await response.json();
      if (data && data.response) {
        const groupedByContinent = groupTimezonesByContinent(data.response);
        setContinents(Object.keys(groupedByContinent)); 
        setCities(groupedByContinent); 
        setLoading(false);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setLoading(false);
    }
  };

  const groupTimezonesByContinent = (timezones) => {
    const grouped = {};
    timezones.forEach((timezone) => {
      const continent = timezone.split('/')[0]; 
      if (!grouped[continent]) {
        grouped[continent] = [];
      }
      grouped[continent].push(timezone);
    });
    return grouped;
  };

  const handleContinentPress = (continent) => {
    navigation.navigate('Cities', { cities: cities[continent] });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <View>
          <Text style={styles.title}>Выберите материк:</Text>
          {continents.map((continent, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleContinentPress(continent)}
            >
              <Text style={styles.buttonText}>{continent}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LocationScreen;