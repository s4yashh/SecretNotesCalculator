import AsyncStorage from '@react-native-async-storage/async-storage';

const CALCULATOR_HISTORY_KEY = 'calculator_history';
const SECRET_NOTES_KEY = 'secret_notes';

export const storage = {
  // Calculator history
  saveCalculationHistory: async (history) => {
    try {
      await AsyncStorage.setItem(CALCULATOR_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving calculation history:', error);
    }
  },

  getCalculationHistory: async () => {
    try {
      const history = await AsyncStorage.getItem(CALCULATOR_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error retrieving calculation history:', error);
      return [];
    }
  },

  clearCalculationHistory: async () => {
    try {
      await AsyncStorage.removeItem(CALCULATOR_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing calculation history:', error);
    }
  },

  // Secret notes
  saveSecretNotes: async (notes) => {
    try {
      await AsyncStorage.setItem(SECRET_NOTES_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving secret notes:', error);
    }
  },

  getSecretNotes: async () => {
    try {
      const notes = await AsyncStorage.getItem(SECRET_NOTES_KEY);
      return notes ? JSON.parse(notes) : [];
    } catch (error) {
      console.error('Error retrieving secret notes:', error);
      return [];
    }
  },

  clearSecretNotes: async () => {
    try {
      await AsyncStorage.removeItem(SECRET_NOTES_KEY);
    } catch (error) {
      console.error('Error clearing secret notes:', error);
    }
  },
};
