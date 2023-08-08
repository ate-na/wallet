import { StyleSheet, Text, Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
// import { ScrollView } from "react-native";
// import { PieChart } from "react-native-chart-kit";
// import PieChart from 'react-native-pie-chart'

const CircleChart = ({ chartData }) => {
    const colors = [
        "#FF5733",
        "#C70039",
        "#900C3F",
        "#581845",
        "#FFC300",
        "#FF5733",
        "#F39C12",
        "#D35400",
        "#E74C3C",
        "#C0392B",
        "#3498DB",
        "#2980B9",
        "#1F618D",
        "#9B59B6",
        "#8E44AD",
        "#663399",
        "#27AE60",
        "#2ECC71",
        "#16A085",
        "#1ABC9C",
    ];

    const data = chartData.map((e, index) => {
        return {
            name: e.label,
            population: Math.floor(e.value),
            color: colors[index],
            legendFontColor: "white",
            legendFontSize: 10,
        };
    });

    const chartConfig = {
        backgroundColor: "#FFF",
        backgroundGradientFrom: "#FFF",
        backgroundGradientTo: "#FFF",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    return (
        <View>
            {data.length == 0 ? (
                <View
                    style={{
                        width: 330,
                        height: 130,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", paddingBottom: 20 }}>
                        No Transaction
                    </Text>
                </View>
            ) : (
                <PieChart
                    data={data}
                    width={330}
                    height={130}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    style={{
                        marginVertical: 8,
                        borderRadius: 10,
                        backgroundColor: "transparent",
                        marginLeft: 0,
                    }}
                />
            )}
        </View>
    );
};

export default CircleChart;
