import React from "react";
import { getTotalMonthlyCosts } from "../../utils/chartUtils";
import { useFetch } from "../../hooks/index";
import { monthName } from "../../constants/chartConstants";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { categories } from "../../constants/categoryConstants";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

export const CategoryTables = () => {
  const { response: chartResp } = useFetch(getTotalMonthlyCosts);

  const transformedCategories = {};

  (chartResp || []).forEach((item) => {
    transformedCategories[`${item.year}-${item.month}-${item.category}`] =
      item.total;
  });

  const monthArr = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 0; i <= 11; i++) {
    monthArr.push({
      monthNum: d.getMonth() + 1,
      year: d.getFullYear(),
      monthName: monthName[d.getMonth()],
    });
    d.setMonth(d.getMonth() - 1);
  }

  const usableCategories = categories.map((c) => ({
    key: c.value,
    label: c.name,
  }));
  const field = [];
  const data = [
    [
      "Categories",
      ...(field.length > 0 ? field : categories.map((c) => c.value)).map(
        (v) => categories[Number(v) - 1]?.name
      ),
    ],
    ...monthArr.map((m) => {
      return [
        `${m.monthName}, ${m.year}`,
        ...(field.length > 0 ? field : categories.map((c) => c.value)).map(
          (c) =>
            `$${transformedCategories[`${m.year}-${m.monthNum}-${c}`] ?? 0}`
        ),
      ];
    }),
  ];
  console.log(data);

  const width = data[0].map(() => 100)

  // return null;

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
        Category Totals
      </Text>
      <View style={{ height: 800, marginTop: 20 }}>
        <ScrollView style={{height: 800}} horizontal={true} alwaysBounceHorizontal={false} bounces={false}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            {data.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                style={[index % 2 && { backgroundColor: "#F7F6E7" }, {height: 25}]}
                widthArr={width}
                textStyle={[{ fontSize: 12 }]}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
    </>
  );
};
