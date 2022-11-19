import React from "react";
import { getVendorCount } from "../../utils/chartUtils";
import { useFetch } from "../../hooks/index";
import { categories } from "../../constants/categoryConstants";
import { Text, View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export const VendorFreq = () => {
  const { response: vendorDataRaw } = useFetch(getVendorCount);
  console.log(vendorDataRaw);

  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );

  const pieData = (vendorDataRaw || [])
    .filter((value) => value.total > 0)
    .map((value, index) => ({
      value: value.total,
      name: value.vendor,
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
        }}
      >
        Vendor Frequency Chart
      </Text>
      <View style={{ height: 200 }}>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
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
