import { Modal, StyleSheet, View } from "react-native";

const ModalPage = ({ onClose, visible, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalPage;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#444",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
});
