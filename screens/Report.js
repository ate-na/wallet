import { Text, View } from "react-native";
import CircleChart from "../components/CircleChart";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MonthList from "../components/MonthList";
import { getAllMonthsOfYear } from "../utils/AllMonthOfYear";
import TotalReport from "../components/totalReport";

const Report = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState();
  const [chartDataExpense, setChartDataExpense] = useState([]);
  const [chartDataIncome, setChartDataIncome] = useState([]);
  const [totalReport, setTotalReport] = useState([]);

  const isFocused = useIsFocused();
  const allMonths = getAllMonthsOfYear();

  useEffect(() => {
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    const Index = allMonths.findIndex((x) => x === `${month} ${year}`);
    setCurrentMonthIndex(Index);
  }, []);

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex - 1);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const fetchData = async (param) => {
      try {
        const response = await fetch(
          `http://192.168.21.71:3000/api/transaction/chart/${param}?year=${
            allMonths[currentMonthIndex]?.split(" ")[1]
          }&month=${allMonths[currentMonthIndex]?.split(" ")[0]}`
        );
        const jsonData = await response.json();
        if (param === "Expense") {
          setChartDataExpense(jsonData.data || []);
        } else {
          setChartDataIncome(jsonData.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTotal = async () => {
      try {
        const response = await fetch(
          `http://192.168.21.71:3000/api/transaction/total/report?year=${
            allMonths[currentMonthIndex]?.split(" ")[1]
          }&month=${allMonths[currentMonthIndex]?.split(" ")[0]}`
        );
        const jsonData = await response.json();
        setTotalReport(jsonData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData("Expense");
    fetchData("Income");
    fetchTotal();
  }, [isFocused, currentMonthIndex]);

  return (
    <View style={styles.container}>
      <MonthList
        onPressNextMonth={handleNextMonth}
        onPressPreviousMonth={handlePreviousMonth}
        previousMonth={allMonths[currentMonthIndex + 1]}
        nextMonth={allMonths[currentMonthIndex - 1]}
        currentMonth={allMonths[currentMonthIndex]}
      />
      <View style={styles.totalReport}>
        <TotalReport
          title={totalReport[0]?.type || "Expense"}
          amount={totalReport[0]?.amount || 0}
        />
        <TotalReport
          title={totalReport[1]?.type || "Income"}
          amount={totalReport[1]?.amount * -1 || 0}
        />
      </View>
      <View style={styles.pieChart}>
        <Text style={styles.pieChartText}>Expense categories</Text>
        <CircleChart chartData={chartDataExpense} />
      </View>
      <View style={styles.pieChart}>
        <Text style={styles.pieChartText}>Income categories</Text>
        <CircleChart chartData={chartDataIncome} />
      </View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  totalReport: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  pieChart: {
    backgroundColor: "#555",
    width: "93%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  pieChartText: { textAlign: "right", paddingTop: 10, color: "white" },
});
