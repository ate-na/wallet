import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Icon } from "react-native-vector-icons/Icon";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice

const CategoryItem = ({ item, onPress }) => {
  const [activeBtn, setActiveBtn] = useState("");
  const onClickBtnHandler = () => {
    setActiveBtn(item.id);
    onPress(item);
  };
  return (
    <View style={styles.categoryItem}>
      <TouchableOpacity
        style={[
          styles.circle,
          activeBtn === item.id
            ? styles.activeCategory
            : styles.unActiveCategory,
        ]}
        onPress={onClickBtnHandler}
      >
        <Icon size={27} name="home" />
      </TouchableOpacity>
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    height: 80,
    width: 80,
    justifyContent: "center",
    marginVertical: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    marginTop: 5,
    fontSize: 14,
    color: "white",
    marginTop: 10,
  },
  activeCategory: {
    backgroundColor: "red",
  },
  unActiveCategory: {
    backgroundColor: "#555",
    shadowColor: "#fff",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10
  },
});
