import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}: any) => {
  return (
    <View>
      <Text>Home Screen</Text>

      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
};

const DetailScreen = ({navigation}: any) => {
  return (
    <View>
      <Text>Detail Screen</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
