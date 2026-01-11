import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { saveNotes, loadNotes } from '../storage/asyncStorage';

export default function SecretNotesScreen() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Load notes on screen focus
  useFocusEffect(
    useCallback(() => {
      loadNotesData();
    }, [])
  );

  // Load notes from AsyncStorage
  const loadNotesData = async () => {
    try {
      const savedNotes = await loadNotes();
      setNotes(savedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  // Save notes to AsyncStorage
  const persistNotes = async (updatedNotes) => {
    try {
      await saveNotes(updatedNotes);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error saving notes:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  };

  // Add new note
  const addNote = () => {
    if (noteText.trim() === '') {
      Alert.alert('Empty Note', 'Please write something before saving');
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = [newNote, ...notes];
    persistNotes(updatedNotes);
    resetModal();
  };

  // Update existing note
  const updateNote = () => {
    if (noteText.trim() === '') {
      Alert.alert('Empty Note', 'Please write something before saving');
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === editingId
        ? {
            ...note,
            text: noteText.trim(),
            updatedAt: new Date().toISOString(),
          }
        : note
    );

    persistNotes(updatedNotes);
    resetModal();
  };

  // Delete note
  const deleteNote = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => {
            const updatedNotes = notes.filter((note) => note.id !== id);
            persistNotes(updatedNotes);
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Open modal for editing
  const openEditModal = (note) => {
    setEditingId(note.id);
    setNoteText(note.text);
    setModalVisible(true);
  };

  // Open modal for new note
  const openNewNoteModal = () => {
    setEditingId(null);
    setNoteText('');
    setModalVisible(true);
  };

  // Reset modal state
  const resetModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setNoteText('');
  };

  // Render individual note item
  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => openEditModal(item)}
      activeOpacity={0.7}
    >
      <View style={styles.noteContent}>
        <Text style={styles.noteText} numberOfLines={2}>
          {item.text}
        </Text>
        <Text style={styles.noteDate}>
          {new Date(item.updatedAt).toLocaleDateString()} at{' '}
          {new Date(item.updatedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(item.id)}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Notes List */}
        {notes.length > 0 ? (
          <FlatList
            data={notes}
            renderItem={renderNote}
            keyExtractor={(item) => item.id}
            style={styles.notesList}
            scrollEnabled={true}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No secret notes yet</Text>
            <Text style={styles.emptySubText}>
              Tap the + button to add your first note
            </Text>
          </View>
        )}

        {/* Add Note Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={openNewNoteModal}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Add/Edit Note */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={resetModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={resetModal}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingId ? 'Edit Note' : 'New Note'}
            </Text>
            <TouchableOpacity
              onPress={editingId ? updateNote : addNote}
              style={styles.saveButtonContainer}
            >
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              placeholder="Write your secret note here..."
              placeholderTextColor="#999"
              multiline={true}
              value={noteText}
              onChangeText={setNoteText}
              autoFocus={true}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notesList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#5AC8FA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteContent: {
    flex: 1,
    marginRight: 10,
  },
  noteText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 22,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 32,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: Platform.OS === 'ios' ? 16 : 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cancelButton: {
    fontSize: 16,
    color: '#5AC8FA',
    fontWeight: '500',
  },
  saveButtonContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  saveButton: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    padding: 12,
    textAlignVertical: 'top',
    fontWeight: '400',
  },
});
