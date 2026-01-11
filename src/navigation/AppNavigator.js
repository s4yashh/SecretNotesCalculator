import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalculatorScreen from '../screens/CalculatorScreen';
import SecretNotesScreen from '../screens/SecretNotesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#1a1a1a',
          },
          headerTintColor: '#5AC8FA',
          cardStyle: {
            backgroundColor: '#fff',
          },
        }}
        initialRouteName="Calculator"
      >
        <Stack.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{
            title: 'Calculator',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SecretNotes"
          component={SecretNotesScreen}
          options={{
            title: 'Secret Notes',
            headerShown: true,
            headerBackTitle: 'Back',
            animationEnabled: true,
            animationTypeForReplace: 'pop',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
