import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
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
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);

  const handleButtonPress = (buttonLabel) => {
    if (buttonLabel === 'C') {
      // Clear
      setDisplay('0');
    } else if (buttonLabel === 'DEL') {
      // Delete last character
      setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
    } else if (buttonLabel === '=') {
      // Calculate
      try {
        const result = evaluateExpression(display);
        if (result !== 'Error') {
          const newHistoryItem = {
            id: Date.now().toString(),
            expression: display,
            result: formatNumber(result),
          };
          setHistory([newHistoryItem, ...history]);
          setDisplay(String(result));
        }
      } catch {
        setDisplay('Error');
      }
    } else if (buttonLabel === '%') {
      // Percentage
      try {
        const result = evaluateExpression(display) / 100;
        setDisplay(String(result));
      } catch {
        setDisplay('Error');
      }
    } else if (buttonLabel === '√') {
      // Square root
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
    } else if (buttonLabel === '^') {
      // Power (add ^ to expression)
      setDisplay(display === '0' ? '0^' : display + '^');
    } else if (buttonLabel === '.' && display.includes('.')) {
      // Prevent multiple dots
      return;
    } else {
      // Append number or operator
      setDisplay(display === '0' && buttonLabel !== '.' ? buttonLabel : display + buttonLabel);
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
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  history: {
    flex: 0.25,
    marginBottom: 8,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  buttonsContainer: {
    flex: 0.6,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  buttonWrapper: {
    flex: 1,
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
    flex: 0.5,
  },
});
