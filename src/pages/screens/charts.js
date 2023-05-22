import { View } from "react-native";
import { CategoryFreq } from "../../components/charts/categoryFreq";
import { VendorFreq } from "../../components/charts/vendorFreq";
import { MonthlyTotal } from "../../components/charts/monthlyTotal";
import { VALID_CHARTS } from "../../constants/chartConstants";
import { MonthlyAverage } from "../../components/charts/monthlyAverage";
import { CategoryTables } from "../../components/charts/categoryTable";
import { useColorScheme } from "react-native";

export const ChartsScreen = ({ chartSelection }) => {
  const colorScheme = useColorScheme();

  const bgColor = colorScheme === "dark" ? "black" : "white";

  return (
    <View style={{ backgroundColor: bgColor, height: "120%" }}>
      {chartSelection.id === VALID_CHARTS[0].id ? <CategoryFreq /> : null}
      {chartSelection.id === VALID_CHARTS[1].id ? <VendorFreq /> : null}
      {chartSelection.id === VALID_CHARTS[2].id ? <MonthlyTotal /> : null}
      {chartSelection.id === VALID_CHARTS[3].id ? <MonthlyAverage /> : null}
      {chartSelection.id === VALID_CHARTS[4].id ? <CategoryTables /> : null}

      <View style={{ marginTop: "30%", backgroundColor: bgColor }} />
    </View>
  );
};
