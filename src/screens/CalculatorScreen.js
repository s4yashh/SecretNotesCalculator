import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Display from '../components/Display';
import CalcButton from '../components/CalcButton';
import HistoryItem from '../components/HistoryItem';
import { evaluateExpression, formatNumber } from '../utils/evaluateExpression';

const BUTTONS = [
  ['%', '√', '^', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=', 'DEL'],
  ['C'],
];

export default function CalculatorScreen() {
  const navigation = useNavigation();
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);

  // Helper function to check if last character is an operator
  const isLastCharOperator = (str) => {
    const lastChar = str[str.length - 1];
    return ['+', '-', '*', '/', '^', '%'].includes(lastChar);
  };

  // Helper function to prevent consecutive operators
  const canAppendOperator = (str, operator) => {
    if (str === '0' || str === '') return false;
    if (isLastCharOperator(str)) return false;
    return true;
  };

  const handleButtonPress = (buttonLabel) => {
    if (buttonLabel === 'C') {
      // Clear - reset to 0
      setDisplay('0');
    } else if (buttonLabel === 'DEL') {
      // Delete last character
      const newDisplay = display.length === 1 ? '0' : display.slice(0, -1);
      setDisplay(newDisplay);
    } else if (buttonLabel === '=') {
      // Calculate and store in history
      if (display === '0' || display === '' || isLastCharOperator(display)) {
        setDisplay('Error');
        return;
      }

      // SECRET TRIGGER: Check if input is exactly "69/67"
      if (display === '69/67') {
        // Navigate to SecretNotesScreen without evaluating
        navigation.navigate('SecretNotes');
        // Clear calculator input
        setDisplay('0');
        return;
      }

      // Normal calculation for all other expressions
      try {
        const result = evaluateExpression(display);
        if (result !== 'Error' && isFinite(result)) {
          const newHistoryItem = {
            id: Date.now().toString(),
            expression: display,
            result: formatNumber(result),
          };
          setHistory([newHistoryItem, ...history]);
          setDisplay(String(result));
        } else {
          setDisplay('Error');
        }
      } catch {
        setDisplay('Error');
      }
    } else if (buttonLabel === '%') {
      // Percentage - calculate percentage of current number
      if (display === '0' || display === '' || isLastCharOperator(display)) return;
      try {
        const result = evaluateExpression(display) / 100;
        setDisplay(String(result));
      } catch {
        setDisplay('Error');
      }
    } else if (buttonLabel === '√') {
      // Square root
      if (display === '0' || display === '') return;
      try {
        const num = evaluateExpression(display);
        if (num < 0) {
          setDisplay('Error');
        } else {
          const result = Math.sqrt(num);
          setDisplay(String(result));
        }
      } catch {
        setDisplay('Error');
      }
    } else if (['+', '-', '*', '/', '^'].includes(buttonLabel)) {
      // Operators - prevent consecutive operators
      if (!canAppendOperator(display, buttonLabel)) {
        // If last char is operator, replace it
        if (isLastCharOperator(display)) {
          setDisplay(display.slice(0, -1) + buttonLabel);
        }
        return;
      }
      setDisplay(display + buttonLabel);
    } else if (buttonLabel === '.') {
      // Decimal point - prevent multiple dots in same number
      if (display.includes('.') || display === '0') {
        if (display === '0') {
          setDisplay('0.');
        }
        return;
      }
      setDisplay(display + '.');
    } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(buttonLabel)) {
      // Digits - append or start new number
      if (display === '0') {
        setDisplay(buttonLabel);
      } else {
        setDisplay(display + buttonLabel);
      }
    }
  };

  const handleHistoryPress = (item) => {
    setDisplay(item.expression);
  };

  const renderButton = (label, style) => (
    <CalcButton
      label={label}
      onPress={() => handleButtonPress(label)}
      style={[
        label === '=' && styles.equalsButton,
        label === 'C' && styles.clearButton,
        label === 'DEL' && styles.delButton,
        (label === '/' || label === '*' || label === '-' || label === '+' || label === '^') && styles.operatorButton,
        (label === '%' || label === '√') && styles.functionButton,
        style,
      ]}
    />
  );

  const renderRow = (buttons) => (
    <View style={[styles.buttonRow, buttons.length === 1 && styles.fullWidthRow]}>
      {buttons.map((btn) => (
        <View key={btn} style={[styles.buttonWrapper, buttons.length === 1 && styles.fullWidthButton]}>
          {renderButton(btn)}
        </View>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled
    >
      <ScrollView 
        style={styles.container}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          {/* History Section */}
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <HistoryItem
                expression={item.expression}
                result={item.result}
                onPress={() => handleHistoryPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            style={styles.history}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          />

          {/* Display */}
          <Display value={display} />

          {/* Button Grid */}
          <View style={styles.buttonsContainer}>
            {BUTTONS.map((row, index) => (
              <View key={index}>
                {renderRow(row)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  history: {
    flex: 0.2,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buttonsContainer: {
    flex: 0.7,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    height: 60,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  equalsButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    flex: 1,
  },
  delButton: {
    backgroundColor: '#FF9500',
  },
  operatorButton: {
    backgroundColor: '#5AC8FA',
  },
  functionButton: {
    backgroundColor: '#A2845E',
  },
  fullWidthRow: {
    justifyContent: 'center',
  },
  fullWidthButton: {
    flex: 0.25,
    marginHorizontal: 4,
  },
});
