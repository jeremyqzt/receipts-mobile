import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { CategoryFreq } from "../../components/charts/categoryFreq";
import { VendorFreq } from "../../components/charts/vendorFreq";
import { MonthlyTotal } from "../../components/charts/monthlyTotal";
import { VALID_CHARTS } from "../../constants/chartConstants";
import { ChartSelect } from "../../components/charts/chartSelect";
import { MonthlyAverage } from "../../components/charts/monthlyAverage";

export const ChartsScreen = () => {
  const [chartSelection, setChartSelection] = useState(VALID_CHARTS[0]);

  return (
    <View>
      {chartSelection.id === VALID_CHARTS[0].id ? <CategoryFreq /> : null}
      {chartSelection.id === VALID_CHARTS[1].id ? <VendorFreq /> : null}
      {chartSelection.id === VALID_CHARTS[2].id ? <MonthlyTotal /> : null}
      {chartSelection.id === VALID_CHARTS[3].id ? <MonthlyAverage /> : null}

      <View style={{ marginTop: "50%" }} />

      <ChartSelect
        activeSelect={chartSelection}
        opts={VALID_CHARTS}
        setChartValue={(a) => {
          setChartSelection(a);
        }}
      />
    </View>
  );
};
