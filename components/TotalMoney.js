import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice

const TotalMoney = ({ money }) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstPart}>
                <Icon name="money" color={"white"} size={15} />
                <Text style={{ color: "white", paddingHorizontal: 5 }}>Total</Text>
            </View>
            <View style={{ padding: 17 }}>
                <Text style={styles.balanceText}>Balance</Text>
                <Text style={styles.moneyText}>{`$${money}`}</Text>
            </View>
        </View>
    );
};
export default TotalMoney;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        backgroundColor: "#de7812",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        borderRadius: 20,
    },
    moneyText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        paddingVertical: 5,
    },
    balanceText: {
        color: "white",
    },
    firstPart: {
        display: "flex",
        flexDirection: "row",
        padding: 17,
        justifyContent: "center",
        alignItems: "center",
    },
});
