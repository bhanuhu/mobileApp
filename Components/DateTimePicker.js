import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Platform, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function FollowUpDateTimePicker({ onDateTimeChange, visible = true }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [formattedDate, setFormattedDate] = useState(moment().format('DD-MM-YYYY HH:mm'));
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (onDateTimeChange) {
      onDateTimeChange(date);
    }
  }, [date]);

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShowPicker(true);
  };
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    
    // Set the date first
    setDate(currentDate);
    setFormattedDate(moment(currentDate).format('DD-MM-YYYY HH:mm'));
  
    if (Platform.OS === 'android') {
      setShowPicker(false);
  
      // If currently picking date, go to time picker after a small delay
      if (mode === 'date') {
        setTimeout(() => {
          setMode('time');
          setShowPicker(true);
        }, 500); // Wait enough for the picker to unmount safely
      }
    } else {
      // On iOS, stay in picker until manually closed
      setShowPicker(true);
    }
  };
  

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        <Pressable 
          onPress={showDatepicker}
          style={styles.dateTimeButton}
        >
        <Text style={styles.selectedDate}>{formattedDate}</Text>

        </Pressable>
      </View>

      {showPicker && (
  Platform.OS === 'ios' ? (
    <Modal
      transparent={true}
      animationType="slide"
      visible={showPicker}
      onRequestClose={() => setShowPicker(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            minimumDate={new Date()}
            style={styles.picker}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowPicker(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.doneButton]}
              onPress={() => setShowPicker(false)}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ) : (
    <DateTimePicker
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onChange}
      minimumDate={new Date()}
    />
  )
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginBottom: 16,
    height: '80%',
    margin: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f17022',

  },
  dateTimeButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  selectedDate: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999, // Ensure it's above other elements
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    position: 'relative',
    zIndex: 10000, // Higher than container
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    zIndex: 10002, // Higher than picker
  },
  button: {
    padding: 10,
    borderRadius: 6,
    marginLeft: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  doneButton: {
    backgroundColor: '#f17022',
  },
  picker: {
    width: '100%',
    // For Android time picker spinner color
    color: '#f17022',
    zIndex: 10001, // Highest z-index in the component
  },
});
