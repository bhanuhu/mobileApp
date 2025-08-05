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
import ActivePoints from './ActivePoints';
import RedeemPoints from './RedeemPoints';
import ExpirePoints from './ExpirePoints';  
const { width } = Dimensions.get('window');
import { postRequest } from '../../Services/RequestServices';
import DropDown from '../../Components/DropDown';

const Points = ({
  visible,
  onClose,
  totalPoints,
  name,
  mobile,
  data,
  redeemPoints,
  expiredPoints,
  cusomerId,
  token,
  staffList,
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
        full_name: name,
        mobile: mobile,
        redeemPoint: redeemingPoints,
        remark: remark,
        staff_name: staffName,
      };
    
      const endpoint = 'customervisit/insertPointRedeem02';
    
      postRequest(endpoint, payload, token)
        .then((response) => {
          console.log('Success:', response);
          // handle success UI here
          alert("Add Extra Point Successfully");
        })
        .catch((error) => {
          console.error('Request failed:', error);
          // handle error UI here
        });
    };

  return (
    <>
      <Portal>
        <Modal visible={visible} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modalWrapper}>
              {/* Tab Row */}
              <View style={styles.buttonRow}>
                <Button
                  mode="contained"
                  style={[styles.tabButton, styles.activeButton]}
                  labelStyle={styles.tabButtonLabel}
                  onPress={() => setVisibleActivePoints(true)}
                >
                  Active Points
                </Button>
                <Button
                  mode="contained"
                  style={[styles.tabButton, styles.redeemButton]}
                  labelStyle={[styles.tabButtonLabel, { color: '#222' }]}
                  onPress={() => setVisibleRedeemPoints(true)}
                >
                  Redeem Points
                </Button>
                <Button
                  mode="contained"
                  style={[styles.tabButton, styles.expireButton]}
                  labelStyle={styles.tabButtonLabel}
                  onPress={() => setVisibleExpiredPoints(true)}
                >
                  Expire Points
                </Button>
              </View>

              {/* Profile Card */}
              <View style={styles.customerInfo}>
                <View style={styles.customerNameContainer}>
                  <Text style={styles.customerName}>{name?.toUpperCase()}</Text>
                </View>
                <View style={styles.customerPhoneContainer}>
                  <Text style={styles.customerPhone}>{mobile}</Text>
                </View>
                <View style={styles.pointsBox}>
                  <Text style={styles.pointsText}>TOTAL POINTS: {totalPoints}</Text>
                </View>
              </View>

              {/* Redeem Form Section */}
              <View style={styles.formRow}>
                {/* Left Column */}
                <View style={[styles.formCol, { marginRight: 12 }]}>
                  <Text style={styles.label}>Redeem Points</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Redeem Points"
                    value={redeemPoints}
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
                  <View style={styles.formCol}>
                    <DropDown
                      ext_lbl="name"
                      ext_val="staff_id"
                      data={staffList}
                      placeholder="Select Staff"
                      onChange={setStaffName}
                      value={staffName}
                      style={[styles.input, {
                        height: 47,
                        paddingVertical: 10,
                        justifyContent: 'center',
                        marginBottom: 20,
                      }]}
                      // dropDownContainerStyle={{
                      //   borderColor: '#d6d6d6',
                      //   marginTop: 4,
                      //   borderRadius: 8,
                      // }}
                      // placeholderStyle={{
                      //   color: '#999',
                      //   fontSize: 15,
                      //   padding: 0,
                      //   margin: 0,
                      // }}
                    />
                  </View>
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
                  SUBMIT
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
      <RedeemPoints visible={visibleRedeemPoints} onClose={() => setVisibleRedeemPoints(false)} data={redeemPoints} />
      <ExpirePoints visible={visibleExpiredPoints} onClose={() => setVisibleExpiredPoints(false)} data={expiredPoints} />
      <ActivePoints visible={visibleActivePoints} onClose={() => setVisibleActivePoints(false)} data={data} />
    </>
  );
};

export default Points;

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
    marginBottom: 10,
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
  redeemButton: {
    backgroundColor: '#f64e60',
  },
  expireButton: {
    backgroundColor: '#f64e60',
  },
  tabButtonLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  customerInfo: {
    backgroundColor: "#fdfdfd",
    elevation: 3,
    borderRadius: 10,
    padding: 5,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  customerName: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#888",

    marginLeft: 8,
  },
  // customerNameContainer: {
  //   textAlign: "center",
  // },
  customerPhone: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#888",
    // textAlign: "center",
  },
  pointsBox: {
    backgroundColor: "#ffa500",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
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
    marginBottom: 12,
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fafbfc',
    color: '#222',
    minHeight: 10,
    maxHeight: 100,
    marginBottom: 2,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-start',
    fontSize: 13,
    color: 'blue',
    fontWeight: '500',
    marginTop: 2,
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

  charCount: {
    textAlign: 'right',
    color: 'blue',
    marginTop: 2,
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
