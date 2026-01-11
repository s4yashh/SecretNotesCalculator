import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const KEYS = {
  CALCULATOR_INPUT: 'calculator_input',
  CALCULATOR_HISTORY: 'calculator_history',
  SECRET_NOTES: 'secret_notes',
};

/**
 * Save calculator input string to AsyncStorage
 * @param {string} input - The input string to save
 * @returns {Promise<void>}
 */
export const saveInput = async (input) => {
  try {
    await AsyncStorage.setItem(KEYS.CALCULATOR_INPUT, input);
    console.log('Input saved successfully');
  } catch (error) {
    console.error('Error saving input:', error);
    throw error;
  }
};

/**
 * Load calculator input string from AsyncStorage
 * @returns {Promise<string>} The saved input or '0' if not found
 */
export const loadInput = async () => {
  try {
    const input = await AsyncStorage.getItem(KEYS.CALCULATOR_INPUT);
    return input || '0';
  } catch (error) {
    console.error('Error loading input:', error);
    return '0';
  }
};

/**
 * Save calculator history array to AsyncStorage
 * @param {Array} history - The history array to save
 * @returns {Promise<void>}
 */
export const saveHistory = async (history) => {
  try {
    const jsonString = JSON.stringify(history);
    await AsyncStorage.setItem(KEYS.CALCULATOR_HISTORY, jsonString);
    console.log('History saved successfully');
  } catch (error) {
    console.error('Error saving history:', error);
    throw error;
  }
};

/**
 * Load calculator history array from AsyncStorage
 * @returns {Promise<Array>} The saved history or empty array if not found
 */
export const loadHistory = async () => {
  try {
    const historyString = await AsyncStorage.getItem(KEYS.CALCULATOR_HISTORY);
    return historyString ? JSON.parse(historyString) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

/**
 * Save secret notes array to AsyncStorage
 * @param {Array} notes - The notes array to save
 * @returns {Promise<void>}
 */
export const saveNotes = async (notes) => {
  try {
    const jsonString = JSON.stringify(notes);
    await AsyncStorage.setItem(KEYS.SECRET_NOTES, jsonString);
    console.log('Notes saved successfully');
  } catch (error) {
    console.error('Error saving notes:', error);
    throw error;
  }
};

/**
 * Load secret notes array from AsyncStorage
 * @returns {Promise<Array>} The saved notes or empty array if not found
 */
export const loadNotes = async () => {
  try {
    const notesString = await AsyncStorage.getItem(KEYS.SECRET_NOTES);
    return notesString ? JSON.parse(notesString) : [];
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
};

/**
 * Clear all stored data (for testing or reset purposes)
 * @returns {Promise<void>}
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.CALCULATOR_INPUT,
      KEYS.CALCULATOR_HISTORY,
      KEYS.SECRET_NOTES,
    ]);
    console.log('All storage cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

/**
 * Get all storage keys and their sizes (for debugging)
 * @returns {Promise<Object>} Object with all keys and values
 */
export const getAllStorage = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const allData = await AsyncStorage.multiGet(allKeys);
    const result = {};
    allData.forEach(([key, value]) => {
      result[key] = value;
    });
    return result;
  } catch (error) {
    console.error('Error getting all storage:', error);
    return {};
  }
};
