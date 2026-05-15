import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';

const Stack = createStackNavigator();

const DummyScreen = () => {
  return <Text>Hello</Text>;
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={DummyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
