import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalculatorScreen from '../screens/CalculatorScreen';
import SecretNotesScreen from '../screens/SecretNotesScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Calculator" 
          component={CalculatorScreen}
          options={{
            headerTitle: 'Calculator',
          }}
        />
        <Tab.Screen 
          name="SecretNotes" 
          component={SecretNotesScreen}
          options={{
            headerTitle: 'Secret Notes',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
