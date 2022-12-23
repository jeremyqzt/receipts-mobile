import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { setActiveBucket } from "../../utils/bucketUtils";
import Toast from "react-native-toast-message";
import { receiptAtom, bucketAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { useColorScheme } from "react-native";

const BucketDropdown = (props) => {
  const { buckets, setBuckets, activeBucket, setLoading } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [rAtom, setReceiptAtom] = useAtom(receiptAtom);
  const [bAtom, setBucketAtom] = useAtom(bucketAtom);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";

  return (
    <View
      style={[styles.container, { backgroundColor: bgColor, color: textColor }]}
    >
      <Text style={styles.inputIcon}>🪣</Text>
      <Dropdown
        style={[styles.dropdown, { color: textColor }]}
        placeholderStyle={[styles.placeholderStyle, { color: textColor }]}
        selectedTextStyle={[styles.selectedTextStyle, { color: textColor }]}
        inputSearchStyle={[styles.inputSearchStyle, { color: textColor }]}
        iconStyle={styles.iconStyle}
        data={buckets}
        search
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder={!isFocus ? "Buckets" : "..."}
        searchPlaceholder="Search..."
        value={activeBucket}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setLoading(true);
          setActiveBucket(item.id)
            .then(() => {
              setBuckets(item);
              setReceiptAtom(rAtom + 1);
              setBucketAtom(bAtom + 1);
              Toast.show({
                type: "success",
                text1: "✅ Success!",
                text2: "Your active bucket has been updated!",
                position: "bottom",
              });
            })
            .catch(() => {
              Toast.show({
                type: "error",
                text1: "🛑 Error!",
                text2:
                  "Your active bucket could not be updated, please try again!",
                position: "bottom",
              });
            })
            .finally(() => setLoading(false));

          setIsFocus(false);
        }}
        renderLeftIcon={() => <View />}
      />
    </View>
  );
};

export const BucketsSelect = (props) => {
  const { buckets = [], activeBucket, setLoading } = props;
  const [selectedBucket, setSelectedBucket] = useState();

  return (
    <BucketDropdown
      buckets={buckets}
      setBuckets={(a) => {
        setSelectedBucket(a);
      }}
      setLoading={setLoading}
      activeBucket={selectedBucket ?? activeBucket.id}
    />
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginTop: 5,
    fontSize: 35,
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
