import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice

const IconCategory = ({
  name,
  size,
  color,
  isActive,
  isTouchable,
  onPress,
}) => {
  if (isTouchable) {
    return (
      <TouchableOpacity
        style={[
          styles.circle,
          isActive ? styles.activeCategory : styles.unActiveCategory,
        ]}
        onPress={onPress}
      >
        <Icon name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.circle,
        isActive ? styles.activeCategory : styles.unActiveCategory,
      ]}
    >
      <Icon name={name} size={size} color={color} />
    </View>
  );
};

export default IconCategory;

const styles = StyleSheet.create({
  circle: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5
  },
  activeCategory: {
    backgroundColor: "orange",
  },
  unActiveCategory: {
    backgroundColor: "#555",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
});
