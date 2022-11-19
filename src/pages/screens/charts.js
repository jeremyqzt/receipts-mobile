import { Button } from "@rneui/themed";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { getActiveBucket } from "../../utils/bucketUtils";
import { postReceipt } from "../../utils/receiptUtils";
import { Icon } from "../../components/upload/icon";
import { useAtom } from "jotai";
import { receiptAtom, bucketAtom } from "../../atom/atom";
import { CategoryFreq } from "../../components/charts/categoryFreq";
import { ChartSelect } from "../../components/charts/chartSelect";
export const ChartsScreen = () => {
  return (
    <View>
      <CategoryFreq />
      <ChartSelect
        setChartValue={(a) => {
          console.log(a);
        }}
      />
    </View>
  );
};
