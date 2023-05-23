import React, { useState } from "react";
import { getTotalMonthlyCosts } from "../../utils/chartUtils";
import { useFetch } from "../../hooks/index";
import { monthName } from "../../constants/chartConstants";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { categories } from "../../constants/categoryConstants";
import { Table, Row } from "react-native-table-component";
import MultiSelect from "react-native-multiple-select";
import { useColorScheme } from "react-native";
import { CheckBox } from "@rneui/themed";

export const CategoryTables = () => {
  const { response: chartResp, loading } = useFetch(getTotalMonthlyCosts);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";
  const middleColor = colorScheme === "dark" ? "grey" : "#DCDCDC";
  const transformedCategories = {};

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: "20%" }} />;
  }

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
      "",
      ...(checked ? ["Total"] : []),
      ...(field.length > 0 ? field : categories.map((c) => c.value)).map(
        (v) => categories[Number(v) - 1]?.name
      ),
    ],
    ...monthArr.map((m) => {
      return [
        `${m?.monthName}, ${m?.year}`,
        ...checked
          ? [
              "$" +
                (field.length > 0 ? field : categories.map((c) => c.value))
                  .reduce((accumulator, c) => {
                    accumulator += Number(
                      transformedCategories[`${m.year}-${m.monthNum}-${c}`] ?? 0
                    );
                    return accumulator;
                  }, 0)
                  .toFixed(2),
            ]
          : [],
        ...(field.length > 0 ? field : categories.map((c) => c.value)).map(
          (c) =>
            `$${transformedCategories[`${m.year}-${m.monthNum}-${c}`] ?? 0}`
        ),
      ];
    }),
  ];

  const width = data[0].map(() => 150);

  return (
    <ScrollView
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginTop: "5%",
          width: "100%",
          textAlign: "center",
          color: textColor,
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
            styleRowList={{ marginVertical: 3 }}
            fontSize={20}
            itemFontSize={20}
            selectedItems={selectedItems}
            selectText=" Pick Categories"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            styleInputGroup={{
              color: textColor,
              backgroundColor: bgColor,
            }}
            styleDropdownMenu={{
              color: textColor,
              backgroundColor: bgColor,
            }}
            styleSelectorContainer={{
              color: textColor,
              backgroundColor: bgColor,
              height: Dimensions.get("window").height * 0.5,
            }}
            styleTextDropdown={{
              color: textColor,
              backgroundColor: bgColor,
            }}
            styleMainWrapper={{
              color: textColor,
              backgroundColor: bgColor,
            }}
            styleIndicator={{
              color: textColor,
              backgroundColor: bgColor,
              height: 30,
            }}
            styleDropdownMenuSubsection={{
              color: textColor,
              backgroundColor: bgColor,
            }}
            searchInputStyle={{ color: textColor }}
            textInputProps={{ editable: false, autoFocus: false }}
            searchInputPlaceholderText=""
            searchIcon={false}
            hideSubmitButton
          />
        </View>
      </View>
      <View style={{ marginTop: 12 }}>
        <ScrollView
          style={{}}
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
                    index % 2 === 1 && { backgroundColor: bgColor },
                    index % 2 === 0 && { backgroundColor: middleColor },
                    { height: 30 },
                  ]}
                  widthArr={width}
                  textStyle={{
                    ...{
                      fontSize: 18,
                      textAlign: "center",
                      color: textColor,
                      fontWeight: "bold",
                    },
                    ...(index === 0 ? { fontWeight: "bold" } : {}),
                  }}
                />
              ))}
            </Table>
          ) : null}
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <CheckBox
            right
            title="Show Totals"
            textStyle={{
              color: textColor
            }}
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
