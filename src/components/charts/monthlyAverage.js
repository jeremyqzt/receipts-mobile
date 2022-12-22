import React from "react";
import { getAverageCosts } from "../../utils/chartUtils";
import { useFetch } from "../../hooks/index";
import { monthName } from "../../constants/chartConstants";
import { Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useColorScheme } from "react-native";

export const MonthlyAverage = () => {
  const { response: chartResp } = useFetch(getAverageCosts);
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";
  const d = new Date();
  d.setDate(1);
  const dateArr = [];

  for (let i = 0; i <= 8; i++) {
    dateArr.push({
      name: monthName[d.getMonth()],
      Total: (
        (chartResp || []).find((item) => {
          return (
            item?.month - 1 === d.getMonth() && d.getFullYear() === item?.year
          );
        })?.average || 0
      ).toFixed(2),
    });
    d.setMonth(d.getMonth() - 1);
  }

  const reversed = dateArr.reverse();

  const data = {
    labels: reversed.map((d) => d.name),
    datasets: [
      {
        data: reversed.map((d) => d.Total),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      },
    ],
    legend: ["Average Cost/Receipt ($)"], // optional
  };

  return (
    <>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginTop: "5%",
          width: "100%",
          textAlign: "center",
        }}
      >
        Average Receipt Cost
      </Text>
      <View style={{ height: 200 }}>
        <BarChart
          data={data}
          width={Dimensions.get("window").width}
          height={200}
          showValuesOnTopOfBars
          yAxisLabel="$"
          withInnerLines={false}
          chartConfig={{
            backgroundGradientFrom: bgColor,
            backgroundGradientTo: bgColor,
            color: () => textColor,
            barPercentage: 0.75,
          }}
        />
      </View>
    </>
  );
};
