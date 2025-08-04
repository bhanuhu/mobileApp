import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import RedeemVoucher from './RedeemVoucher';
import { Modal, Portal } from 'react-native-paper';
import Points from './Points';


const RedeemModal = ({ redeem, points, voucherList, visible, onClose }) => {
    const [visibleVoucher, setVisibleVoucher] = React.useState(false);
    const [visiblePoints, setVisiblePoints] = React.useState(false);
   

    if (!visible) return null;
  return (
    <Portal>
<Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
<View style={styles.container}>
      <Text style={styles.header}>Customer Redeem Point System</Text>
      <View style={styles.divider} />

      <View style={styles.pointsContainer}>
        <Button style={styles.badge} onPress={() => {setVisibleVoucher(true)}}>
          <Text style={styles.buttonText}>VOUCHERS : {redeem[0]?.voucher_count}</Text>
        </Button>
        <Button style={styles.badge} onPress={() => {setVisiblePoints(true)}}>
          <Text style={styles.buttonText}>POINTS : {points?.total_points}</Text>
        </Button>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>PROFILE</Text>
        <View style={styles.divider} />
        <View style={styles.profileContent}>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.label}>Date Of Birth</Text>
            <Text style={styles.label}>Date Of Anniversary</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{voucherList?.full_name}</Text>
            <Text style={styles.value}>{voucherList?.dob}</Text>
            <Text style={styles.value}>{voucherList?.doa}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Category Name</Text>
            <Text style={styles.label}>Total Visit</Text>
            <Text style={styles.label}>Last Visit</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{voucherList?.category_name}</Text>
            <Text style={styles.value}>{voucherList?.visit_count}</Text>
            <Text style={styles.value}>{voucherList?.last_visit}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtons}>
        <Button mode="contained" style={[styles.button, { backgroundColor: "#1abc9c" }]}>
          <Text style={styles.buttonText}>EXTRA</Text>
        </Button>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: "#e74c3c" }]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>CLOSE</Text>
        </Button>
      </View>
    </View>
  </Modal>
    <Points visible={visiblePoints} onClose={() => {setVisiblePoints(false)}} totalPoints={points?.total_points} name={voucherList?.full_name} mobile={voucherList?.mobile} />
  <RedeemVoucher visible={visibleVoucher} redeem={redeem} customer={{name:voucherList?.full_name,phone:voucherList?.mobile,points:points?.total_points}} onClose={() => {setVisibleVoucher(false)}} />
</Portal>

  );
};

export default RedeemModal;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '80%',
        height: '90%',
        maxWidth: 700,
        padding: 20,
        alignSelf: 'center',
        elevation: 6,
        marginBottom: 8,
      },
      container: {
        width: '100%',
      },
    header: {
      fontSize: 18,
      fontWeight: "700",
      textAlign: "left",
      paddingLeft: 4,
      marginTop: 16,
      color: '#1a1a40',
    },
    landscapeContainer: {
        display: 'flex',
        flexDirection: 'column',
      },
      pointsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderRadius: 10,
      },
      bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
        marginBottom: 16,
      },
    badge: {
      backgroundColor: "#3d66f2",
      borderRadius: 6,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 10,
      paddingHorizontal:8,
      paddingVertical: 6,
    },
    profileCard: {
      backgroundColor: "#535c65",
      borderRadius: 10,
      padding: 8,
    },
    profileTitle: {
      fontStyle: "italic",
      fontWeight: "600",
      color: "#d3d3d3",
      marginBottom: 4,
      marginLeft: 4,
      fontSize: 12,
      textTransform: 'uppercase',
    },
    profileContent: {
      backgroundColor: "#6c757d",
      padding: 8,
      borderColor: '#adb5bd',
      borderWidth: 2,
      margin: 4,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    label: {
      flex: 1,
      color: "#dee2e6",
      fontSize: 10,
      fontWeight: "500",
    },
    value: {
      flex: 1,
      color: "#fff",
      fontSize: 12,
      fontWeight: "700",
      textAlign: "left",
    },
    divider: {
      height: 1,
      backgroundColor: "#adb5bd",
      marginBottom: 4,
    },
    button: {
      borderRadius: 6,
      paddingHorizontal: 16,
      minWidth: 100,
    },
  });
  
