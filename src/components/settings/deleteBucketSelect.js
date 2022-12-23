import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useColorScheme } from "react-native";

const DeleteBucketDropdown = (props) => {
  const { buckets, activeBucket, setBuckets } = props;
  const [isFocus, setIsFocus] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.inputIcon, { color: textColor }]}>To Delete: </Text>
      <View style={{ width: "60%", marginBottom: 0, marginLeft: 8 }}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "red" }]}
          placeholderStyle={[styles.placeholderStyle, { color: textColor }]}
          selectedTextStyle={[styles.selectedTextStyle, { color: textColor }]}
          inputSearchStyle={[styles.inputSearchStyle, { color: textColor }]}
          iconStyle={styles.iconStyle}
          data={buckets}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={!isFocus ? "Select A Bucket" : "..."}
          searchPlaceholder="Search..."
          value={activeBucket}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setBuckets(item);
          }}
          renderLeftIcon={() => <View />}
        />
      </View>
    </View>
  );
};

export const BucketsSelect = (props) => {
  const { buckets = [], activeBucket, setToDelete, toDelete } = props;
  const deletableBuckets = buckets.filter(
    (bucket) => bucket.id !== activeBucket.id
  );

  return (
    <DeleteBucketDropdown
      buckets={deletableBuckets}
      setBuckets={(a) => {
        setToDelete(a);
      }}
      activeBucket={toDelete}
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
