import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface PointRecord {
  mobile: string;
  type: string;
  remark: string;
  points: string | number;
  date: string;
  expiredDate: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  data: PointRecord[];
}

const CustomerPointsModal: React.FC<Props> = ({ visible, onClose, data }) => {
  const renderItem = ({ item }: { item: PointRecord }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.mobile}</Text>
      <Text style={styles.cell}>{item.type}</Text>
      <Text style={styles.cell}>{item.remark}</Text>
      <Text style={styles.cell}>{item.points}</Text>
      <Text style={[styles.cell, { color: 'green' }]}>{item.date}</Text>
      <Text style={[styles.cell, { color: 'red' }]}>{item.expiredDate}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Active Customer Point</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Filter/Controls */}
          <View style={styles.controls}>
            <View style={styles.showDropdown}>
              <Text style={{ marginRight: 5 }}>Show</Text>
              <TextInput value="10" style={styles.dropdown} />
              <Text>records per page</Text>
            </View>
            <TextInput
              placeholder="Search in records..."
              style={styles.searchInput}
            />
          </View>

          {/* Table Header */}
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerText]}>Mobile</Text>
            <Text style={[styles.cell, styles.headerText]}>Type</Text>
            <Text style={[styles.cell, styles.headerText]}>Remark</Text>
            <Text style={[styles.cell, styles.headerText]}>Points</Text>
            <Text style={[styles.cell, styles.headerText]}>Date</Text>
            <Text style={[styles.cell, styles.headerText]}>Expired Date</Text>
          </View>

          {/* Table Data */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            style={{ maxHeight: 300 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomerPointsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.95,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#888',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  showDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 6,
    height: 30,
    width: 40,
    marginHorizontal: 5,
    borderRadius: 4,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    height: 35,
    borderRadius: 4,
    width: 180,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 6,
  },
  headerRow: {
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    paddingHorizontal: 3,
  },
});
