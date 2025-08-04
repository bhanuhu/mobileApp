import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Portal } from 'react-native-paper';
const { width } = Dimensions.get('window');


const Points = ({
  visible,
  onClose,
  totalPoints,
  name,
  mobile,
}) => {
  const [redeemPoints, setRedeemPoints] = useState('');
  const [staffName, setStaffName] = useState('');
  const [remark, setRemark] = useState('');

  const remainingChars = 200 - remark.length;

  const handleSubmit = () => {
    onSubmit({
      redeemPoints: parseInt(redeemPoints),
      staffName,
      remark,
    });
  };

  return (
    <Portal>
    <Modal visible={visible} transparent animationType="fade" style={styles.modalContainer}>
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.threeButton}>
            <Button mode="contained"  contentStyle={{ backgroundColor:"#3699fe" }}  >
              Active Points
            </Button> 
            <Button mode="contained" contentStyle={{ backgroundColor:"#e4e6ef" }}     labelStyle={{ color: '#000' }}
            >
              Redeem Points
            </Button> 
            <Button mode="contained" contentStyle={{ backgroundColor:"#f64e60" }}>
              Expire Points
            </Button> 
          </View>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{name.toUpperCase()}</Text>
            <Text style={styles.mobile}>{mobile}</Text>
            <View style={styles.pointsBox}>
              <Text style={styles.pointsText}>TOTAL POINT: {totalPoints}</Text>
            </View>
          </View>

          {/* Inputs */}
          <View style={styles.formRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Redeem Point</Text>
              <TextInput
                placeholder="Redeem Point"
                style={styles.input}
                value={redeemPoints}
                onChangeText={setRedeemPoints}
                keyboardType="numeric"
              />
              <Text style={styles.helperText}>
                Enter a value that is smaller or equal to {totalPoints}.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Staff Name</Text>
              <TextInput
                placeholder="Select Staff Name"
                style={styles.input}
                value={staffName}
                onChangeText={setStaffName}
              />
              {/* You can replace this with a Picker or dropdown */}
            </View>
          </View>

          {/* Remark */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Remark</Text>
            <TextInput
              style={styles.remarkInput}
              multiline
              maxLength={200}
              placeholder="Type here..."
              value={remark}
              onChangeText={setRemark}
            />
            <Text style={styles.charCount}>{200 - remark.length}/200</Text>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={[styles.button, styles.submit]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.back]} onPress={onClose}>
              <Text style={styles.buttonText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.close]} onPress={onClose}>
              <Text style={styles.buttonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </Portal>
  );
};

export default Points;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
   
    alignSelf: 'center',
    margin: 8,
    justifyContent: 'center',
  },
  modalWrapper: {
    width: width * 0.9,
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  threeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  name: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#999',
    fontSize: 18,
  },
  mobile: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#999',
    fontSize: 16,
  },
  pointsBox: {
    backgroundColor: '#ffa500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  pointsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: 'blue',
    marginTop: 4,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  submit: {
    backgroundColor: '#1c1c2c',
  },
  back: {
    backgroundColor: '#1abc9c',
  },
  close: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
