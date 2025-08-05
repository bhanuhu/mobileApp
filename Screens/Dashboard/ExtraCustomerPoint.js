import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  token
} from 'react-native';
import { Button } from 'react-native-paper';
import { Portal } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import { postRequest } from '../../Services/RequestServices';
const { width } = Dimensions.get('window');


const ExtraCustomerPoint = ({
  visible,
  onClose,
  totalPoints,
  name,
  mobile,
  redeemPoints, 
  cusomerId
}) => {
  const [redeemingPoints, setRedeemingPoints] = useState('');
  const [staffName, setStaffName] = useState('');
  const [remark, setRemark] = useState('');

  const remainingChars = 200 - remark.length;

  const [visibleActivePoints, setVisibleActivePoints] = useState(false);
  const [visibleRedeemPoints, setVisibleRedeemPoints] = useState(false);
  const [visibleExpiredPoints, setVisibleExpiredPoints] = useState(false);

  const handleSubmit = () => {
        const payload = {
          customer_id: cusomerId,
          extra_point: redeemingPoints,
          full_name: name,
          mobile: mobile,
          remark: remark,
          staff_name: staffName,
        };
        console.log("payload",payload)
        postRequest("customervisit/insert/extraPoint", payload, token)
          .then((response) => {
            console.log("response",response)
            if (response?.status === 200) {
              console.log("✅ Extra point added successfully:", response?.data);
              // Optionally show a toast or close modal
            } else {
              console.warn("❌ Failed to add extra point:", response?.message);
            }
          })
          .catch((error) => {
            console.error("🚨 Error adding extra point:", error);
          });
      
  };

  return (
    <>
      <Portal>
        <Modal visible={visible} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modalWrapper}>
               <View style={styles.modalHeader}>
                <Text>Extra Customer Point</Text>
               </View> 
               <Divider />
              {/* Profile Card */}
              <View style={styles.profileCard}>
                <Text style={styles.profileName}>{name?.toUpperCase()}</Text>
                <Text style={styles.profileMobile}>{mobile}</Text>
                <View style={styles.profilePointsBadge}>
                  <Text style={styles.profilePointsText}>TOTAL POINTS: {totalPoints}</Text>
                </View>
              </View>

              {/* Redeem Form Section */}
              <View style={styles.formRow}>
                {/* Left Column */}
                <View style={styles.formCol}>
                  <Text style={styles.label}>Extra Points</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Extra Points"
                    value={redeemingPoints}
                    onChangeText={setRedeemingPoints}
                    keyboardType="numeric"
                    maxLength={6}
                    placeholderTextColor="#999"
                  />
                  <Text style={styles.helperText}>Enter a value that is smaller or equal to {totalPoints}.</Text>
                </View>
                {/* Right Column */}
                <View style={styles.formCol}>
                  <Text style={styles.label}>Staff Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Select Staff Name"
                    value={staffName}
                    onChangeText={setStaffName}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              {/* Remark Section */}
              <View style={styles.remarkSection}>
                <Text style={styles.label}>Remark</Text>
                <TextInput
                  style={styles.remarkInput}
                  placeholder="Type here..."
                  value={remark}
                  onChangeText={setRemark}
                  multiline
                  maxLength={200}
                  placeholderTextColor="#999"
                />
                <Text style={styles.charCount}>
                  <Text style={{ color: remainingChars === 0 ? 'blue' : '#222', fontWeight: 'bold' }}>{200 - remainingChars}</Text>/200
                </Text>
              </View>

              {/* Action Buttons Row */}
              <View style={styles.actionRow}>
                <Button mode="contained" style={[styles.actionButton, styles.submit]} labelStyle={styles.actionLabel} onPress={handleSubmit}>
                  ADD POINT
                </Button>
                <Button mode="contained" style={[styles.actionButton, styles.back]} labelStyle={styles.actionLabel} onPress={onClose}>
                  BACK
                </Button>
                <Button mode="contained" style={[styles.actionButton, styles.close]} labelStyle={styles.actionLabel} onPress={onClose}>
                  CLOSE
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default ExtraCustomerPoint;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '98%',
    maxWidth: 600,
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 10,
    elevation: 0,
    backgroundColor: '#e4e6ef',
    height: 38,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#3699fe',
  },
  expireButton: {
    backgroundColor: '#f64e60',
  },
  tabButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafbfc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  profileName: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#b0b0b0',
    fontWeight: '600',
    flex: 1,
  },
  profileMobile: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#b0b0b0',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  profilePointsBadge: {
    backgroundColor: '#ffba3c',
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginLeft: 16,
  },
  profilePointsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  formCol: {
    flex: 1,
    minWidth: 120,
    flexShrink: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: '500',
    color: '#222',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 4,
    backgroundColor: '#fafbfc',
    color: '#222',
  },
  helperText: {
    fontSize: 13,
    color: '#b0b0b0',
    marginBottom: 8,
    marginLeft: 2,
  },
  remarkSection: {
    marginTop: 8,
    marginBottom: 6,
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 15,
    backgroundColor: '#fafbfc',
    color: '#222',
    minHeight: 80,
    maxHeight: 120,
    marginBottom: 4,
  },
  charCount: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    borderRadius: 8,
    minWidth: 90,
    height: 40,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  submit: {
    backgroundColor: '#191b28',
  },
  back: {
    backgroundColor: '#22d1c3',
  },
  close: {
    backgroundColor: '#f64e60',
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
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
