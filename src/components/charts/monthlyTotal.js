import React from "react";
import { getReceiptCategoryCount } from "../../utils/chartUtils";
import { useFetch } from "../../hooks/index";
import { categories } from "../../constants/categoryConstants";
import { Text, View } from "react-native";
import { PieChart } from "react-native-svg-charts";

export const CategoryFreqChart = () => {
  const { response: categoryDataRaw } = useFetch(getReceiptCategoryCount);

  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );

    console.log(categoryDataRaw)
  const pieData = (categoryDataRaw || [])
    .filter((value) => value.total > 0)
    .map((value, index) => ({
      value: value.total,
      name: value.name,
      svg: {
        fill: randomColor(),
      },
      key: `pie-${index}`,
    }));

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={24}
          stroke={"black"}
          strokeWidth={0.2}
        >
          {data.name}
        </Text>
      );
    });
  };

  return (
    <PieChart
      style={{ height: "85%" }}
      valueAccessor={({ item }) => item.value}
      data={pieData}
      spacing={0}
      outerRadius={"95%"}
    >
      <Labels />
    </PieChart>
  );
  //<PieChart style={{ height: 200 }} data={pieData} />;
};
