import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SeasonsScreen from './SeasonsScreen';
import CitiesScreen from './CitiesScreen';
import LocationScreen from './LocationScreen'
import CompetitionsScreen from './CompetitionsScreen';
import CircuitsScreen from './CircuitsScreen';
import MenuScreen from './MenuScreen';
import TeamsScreen from './TeamsScreen'
import DriversScreen from './DriversScreen'
import RankingsMenuScreen from './RankingsMenuScreen'
import RankingsDriversScreen from './RankingsDriversScreen'
import RankingsTeamsScreen from './RankingsTeamsScreen'
import RankingsRacesMenuScreen from './RankingsRacesMenuScreen'
import FastestLapsScreen from './FastestLapsScreen'
import StartingGridScreen from './StartingGridScreen'

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "19eb62b63af1165f35cb1145dde81c94");
myHeaders.append("x-rapidapi-host", "v1.formula-1.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Авторизация' }} />
        <Stack.Screen name="Seasons" component={SeasonsScreen} options={{ title: 'Сезоны' }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Сезоны' }} />
        <Stack.Screen name="Cities" component={CitiesScreen} options={{ title: 'Города' }} />
        <Stack.Screen name="Location" component={LocationScreen} options={{ title: 'Материк' }} />
        <Stack.Screen name="Competitions" component={CompetitionsScreen} options={{ title: 'Соревнования' }} />
        <Stack.Screen name="Circuits" component={CircuitsScreen} options={{ title: 'Трассы' }} />
        <Stack.Screen name="Teams" component={TeamsScreen} options={{ title: 'Команды' }} />
        <Stack.Screen name="Drivers" component={DriversScreen} options={{ title: 'Водители' }} />
        <Stack.Screen name="RankingsMenu" component={RankingsMenuScreen} options={{ title: 'Результаты' }} />
        <Stack.Screen name="RankingsDrivers" component={RankingsDriversScreen} options={{ title: 'Результаты Водителей' }} />
        <Stack.Screen name="RankingsTeams" component={RankingsTeamsScreen} options={{ title: 'Результаты Команд' }} />
        <Stack.Screen name="RankingsRacesMenu" component={RankingsRacesMenuScreen} options={{ title: 'Выберите гонку' }} />
        <Stack.Screen name="FastestLaps" component={FastestLapsScreen} options={{ title: 'Выберите гонку' }} />
        <Stack.Screen name="StartingGrid" component={StartingGridScreen} options={{ title: 'Выберите гонку' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;