import React from "react";
import { getVendorCount } from "../../utils/chartUtils";
import { useFetch } from "../../hooks/index";
import { Text, View, Dimensions, ActivityIndicator } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useColorScheme } from "react-native";

export const VendorFreq = () => {
  const { response: vendorDataRaw, loading } = useFetch(getVendorCount);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
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

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: "20%" }} />;
  }

  return (
    <>
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
        Vendor Frequency
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
