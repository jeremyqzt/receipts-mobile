import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ChartSelectDropdown = (props) => {
  const { charts, activeChart, setChart } = props;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.inputIcon}>Select Chart To View: </Text>
      <View style={{ width: "60%", marginBottom: 0, marginLeft: 8 }}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "red" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={charts}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={!isFocus ? "Select A Chart" : "..."}
          searchPlaceholder="Search..."
          value={activeChart}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setChart(item);
          }}
          renderLeftIcon={() => <View />}
        />
      </View>
    </View>
  );
};

export const ChartSelect = (props) => {
  const { setChartValue } = props;
  const validCharts = [{ id: 0, name: "Category Frequency" }];

  return (
    <ChartSelectDropdown
      charts={validCharts}
      setChart={(a) => {
        setChartValue(a);
      }}
      activeChart={validCharts[0]}
    />
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    width: "40%",
    marginTop: 5,
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 36,
  },
  header: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttomBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtn: {
    flex: 1,
  },

  dialog: {
    backgroundColor: "white",
    padding: 15,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
  },
  dropdown: {
    height: 45,
    width: "85%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 0,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
