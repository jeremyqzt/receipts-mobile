import React, { useState } from "react";
import { Button, Text, Input } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useColorScheme } from "react-native";

export const PageModal = (props) => {
  const { setPaging, visible, close, totalCount } = props;
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";

  const [page, setPage] = useState(1);
  const [countPer, setCountPer] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const availablePages = Math.ceil(totalCount / countPer);

  return (
    <Modal isVisible={visible} onBackdropPress={close}>
      <View
        style={[styles.modal, { backgroundColor: bgColor, borderRadius: 25 }]}
      >
        <Text h3 style={{ color: textColor }}>
          Search Term
        </Text>
        <View style={styles.counter}>
          <Input
            containerStyle={{
              width: "100%",
              paddingHorizontal: 10,
              marginLeft: 0,
              backgroundColor: bgColor,
              color: textColor,
            }}
            style={[{ color: textColor }]}
            placeholder="Search for Vendor or Description..."
            returnKeyType="done"
            onChangeText={(v) => setSearchTerm(v)}
            value={searchTerm}
          />
        </View>
        <Text h3 style={{ marginBottom: 8, marginTop: 8, color: textColor }}>
          Page Number
        </Text>
        <View
          style={[
            styles.counter,
            { backgroundColor: bgColor, color: textColor },
          ]}
        >
          <View style={{ display: "flex" }}>
            <Button
              disabled={page <= 1}
              onPress={() => {
                setPage(page - 1);
              }}
            >
              -
            </Button>
          </View>
          <View
            style={{
              display: "flex",
              marginVertical: "auto",
              paddingVertical: "auto",
            }}
          >
            <Text
              style={{
                display: "flex",
                marginVertical: "auto",
                paddingVertical: "auto",
                color: textColor,
              }}
            >{`Current Page: ${page} of ${availablePages}`}</Text>
          </View>
          <View style={{ display: "flex" }}>
            <Button
              disabled={page >= availablePages}
              onPress={() => {
                setPage(page + 1);
              }}
            >
              +
            </Button>
          </View>
        </View>
        <Text h3 style={{ marginBottom: 8, marginTop: 16, color: textColor }}>
          Page Size
        </Text>

        <View
          style={[
            styles.counter,
            { backgroundColor: bgColor, color: textColor },
          ]}
        >
          <View style={{ display: "flex" }}>
            <Button
              disabled={countPer <= 5}
              onPress={() => {
                setCountPer(countPer - 5);
                setPage(1);
              }}
            >
              -
            </Button>
          </View>
          <View
            style={{
              display: "flex",
              marginVertical: "auto",
              paddingVertical: "auto",
            }}
          >
            <Text
              style={{
                display: "flex",
                marginVertical: "auto",
                paddingVertical: "auto",
                color: textColor,
              }}
            >{`Page Size: ${countPer}`}</Text>
          </View>
          <View style={{ display: "flex" }}>
            <Button
              disabled={countPer >= 100}
              onPress={() => {
                setCountPer(countPer + 5);
                setPage(1);
              }}
            >
              +
            </Button>
          </View>
        </View>

        <Text style={{ marginTop: 16, color: textColor }}>
          {`Storage capacity remaining: ${1000 - totalCount}`}
        </Text>
        <View
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ marginTop: 24, width: "48%" }}>
            <Button
              style={{ width: "100%" }}
              color="#cccccc"
              title="Cancel"
              onPress={() => close()}
            />
          </View>
          <View style={{ marginTop: 24, width: "47%" }}>
            <Button
              style={{ width: "100%" }}
              title="Apply"
              onPress={() => {
                setPaging({
                  searchTerm,
                  offset: page - 1,
                  limit: countPer,
                });

                setSearchTerm("");
                close();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  counter: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },

  modal: {
    backgroundColor: "white",
    padding: 25,
  },
});
