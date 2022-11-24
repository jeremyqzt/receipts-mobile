import React, { useState } from "react";
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
import MultiSelect from "react-native-multiple-select";

export const CategoryTables = () => {
  const { response: chartResp } = useFetch(getTotalMonthlyCosts);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
    id: c.value,
    name: c.name,
  }));

  const field = selectedItems;
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

  const width = data[0].map(() => 120);

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20,
        }}
      >
        <View style={{ display: "flex", width: "70%", marginHorizontal: "1%" }}>
          <MultiSelect
            hideTags
            items={usableCategories}
            uniqueKey="id"
            onSelectedItemsChange={(s) => {
              setSelectedItems(s);
            }}
            onToggleList={() => {
              setIsOpen((a) => !a);
            }}
            onClearSelector={() => {
              setIsOpen(false);
            }}
            styleSelectorContainer={{height: Dimensions.get("window").height * 0.5}}
            styleRowList={{marginVertical: 3}}
            fontSize={18}
            itemFontSize={18}
            selectedItems={selectedItems}
            selectText="Pick Categories"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            textInputProps={{ editable: false, autoFocus: false }}
            searchInputPlaceholderText=""
            searchIcon={false}
            hideSubmitButton
          />
        </View>
      </View>
      <View style={{ height: 1000, marginTop: 12 }}>
        <ScrollView
          style={{ height: 700 }}
          horizontal={true}
          alwaysBounceHorizontal={false}
          bounces={false}
        >
          {!isOpen ? (
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {data.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  style={[
                    index % 2 && { backgroundColor: "#F5F5F5" },
                    { height: 25 },
                  ]}
                  widthArr={width}
                  textStyle={[
                    { fontSize: 16, textAlign: "center" },
                    index === 0 && { fontWeight: "bold" },
                  ]}
                />
              ))}
            </Table>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};
