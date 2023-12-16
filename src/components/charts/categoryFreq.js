import React from "react";
import { getReceiptCategoryCount } from "../../utils/chartUtils";
import { useFetch } from "../../hooks/index";
import { categories } from "../../constants/categoryConstants";
import { Text, View, Dimensions, ActivityIndicator } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useColorScheme } from "react-native";

export const CategoryFreq = () => {
  const { response: categoryDataRaw, loading } = useFetch(getReceiptCategoryCount);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";

  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );

    if(loading){
      return <ActivityIndicator size="large" style={{marginTop: "20%"}} />
    }


  const pieData = (categoryDataRaw || [])
    .filter((value) => value.total > 0)
    .map((value, index) => ({
      value: value.total,
      name: categories[value.category - 1].name,
      key: `pie-${index}`,
      color: randomColor(),
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));

  return (
    <>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginTop: "5%",
          width: "100%",
          textAlign: "center",
          color: textColor
        }}
      >
        Category Frequency
      </Text>
      <View style={{ height: 200, backgroundColor: bgColor }}>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width}
          height={200}
          backgroundColor={bgColor}
          chartConfig={{
            backgroundGradientFrom: bgColor,
            backgroundGradientTo: bgColor,
            color: () => textColor,
            barPercentage: 0.75,
          }}
          accessor={"value"}
          paddingLeft={"0"}
          center={[20, 10]}
          absolute
        />
      </View>
    </>
  );
};
