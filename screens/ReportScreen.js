import { Text, View } from "react-native";
import CircleChart from "../components/CircleChart";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import MonthList from "../components/MonthList";
import { getAllMonthsOfYear } from "../utils/AllMonthOfYear";
import TotalReport from "../components/totalReport";
import { api } from "../constants";
import { getTokenData } from "../services/tokenService";
import { useQuery } from "react-query";
import { ActivityIndicator } from "react-native";

const fetchChartReportData = async (param, year, month) => {
  const token = await getTokenData();
  return fetch(
    `${api}/api/transaction/chart/${param}?year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .then(({ data }) => data);
};
const fetchTotalReport = async (year, month) => {
  const token = await getTokenData();
  return fetch(
    `${api}/api/transaction/total/report?year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .then(({ data }) => data);
};

const Report = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState();

  const isFocused = useIsFocused();

  const allMonths = useMemo(() => {
    return getAllMonthsOfYear();
  }, []);

  useEffect(() => {
    const month = new Date().toLocaleString("en-us", { month: "long" });
    const year = new Date().getFullYear();
    const Index = allMonths.findIndex((x) => x === `${month} ${year}`);
    setCurrentMonthIndex(Index);
  }, []);

  const selectedDate = useMemo(() => {
    return {
      year: allMonths[currentMonthIndex]?.split(" ")[1],
      month: allMonths[currentMonthIndex]?.split(" ")[0],
    };
  }, [currentMonthIndex]);

  const { data: chartDataIncome, isLoading: chartIncomeLoading } = useQuery(
    [`report-chart-${"Income"}-${selectedDate.year}-${selectedDate.month}`],
    fetchChartReportData.bind(
      null,
      "Income",
      selectedDate.year,
      selectedDate.month
    ),
    { placeholderData: [], enabled: isFocused }
  );

  const { data: chartDataExpense, isLoading: chartExpenseLoading } = useQuery(
    [`report-chart-${"Expense"}-${selectedDate.year}-${selectedDate.month}`],
    fetchChartReportData.bind(
      null,
      "Expense",
      selectedDate.year,
      selectedDate.month
    ),
    { placeholderData: [], enabled: isFocused }
  );

  const { data: ReprotData, isLoading: ReportDataLoding } = useQuery(
    [`report-${selectedDate.year}-${selectedDate.month}`],
    fetchTotalReport.bind(null, selectedDate.year, selectedDate.month),
    { placeholderData: [], enabled: isFocused }
  );

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex - 1);
  };

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => prevIndex + 1);
  };

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
          title={ReprotData[0]?.type || "Expense"}
          amount={ReprotData[0]?.amount * -1 || 0}
        />
        <TotalReport
          title={ReprotData[1]?.type || "Income"}
          amount={ReprotData[1]?.amount || 0}
        />
      </View>
      <View style={styles.pieChart}>
        <Text style={styles.pieChartText}>Expense categories</Text>
        {chartExpenseLoading && (
          <ActivityIndicator color="#fff" style={{ height: 130 }} />
        )}
        {!chartExpenseLoading && <CircleChart chartData={chartDataExpense} />}
      </View>
      <View style={styles.pieChart}>
        <Text style={styles.pieChartText}>Income categories</Text>
        {chartIncomeLoading && (
          <ActivityIndicator color="#fff" style={{ height: 130 }} />
        )}
        {!chartIncomeLoading && <CircleChart chartData={chartDataIncome} />}
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
