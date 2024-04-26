import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const CitiesScreen = ({ route }) => {
  const { cities } = route.params;
  const navigation = useNavigation(); 

  const extractCityName = (timezone) => {
    const parts = timezone.split('/');
    return parts[parts.length - 1]; 
  };

  const handleCitiesPress = () => {
    navigation.navigate('Competitions'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Города</Text>
      {cities.map((city, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={handleCitiesPress}>
          <Text style={styles.buttonText}>{extractCityName(city)}</Text>
        </TouchableOpacity>
      ))}
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

export default CitiesScreen;