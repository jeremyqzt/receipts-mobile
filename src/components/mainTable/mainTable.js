import React, { useState } from "react";

import { ListItem, Avatar, Button } from "@rneui/themed";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { categories } from "../../constants/categoryConstants";
import { ImageModal } from "./imageModal";
import { EditModal } from "./editModal";
import Toast from "react-native-toast-message";

export const MainTable = (props) => {
  const { receipts, loading, updateLocalReceipt, deleteReceipt } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [activeReceipt, setActiveReceipt] = useState();
  const [activeReceiptIdx, setActiveReceiptIdx] = useState();

  if (!receipts && loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <Toast />
      <FlatList
        style={{
          width: "100%",
        }}
        keyExtractor={(_, index) => index.toString()}
        data={receipts}
        renderItem={({ item, index }) => {
          return (
            <ListItem.Swipeable
              style={{ backgroundColor: "white" }}
              rightContent={(reset) => (
                <Button
                  title="Delete"
                  onPress={() => {
                    reset();
                    deleteReceipt(index);
                  }}
                  icon={{ name: "delete", color: "white" }}
                  buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                />
              )}
              bottomDivider
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "75%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      marginVertical: "5%",
                    }}
                    onPress={() => {
                      setActiveReceipt(item);
                      setModalOpen(true);
                    }}
                  >
                    <Avatar
                      title={item.alive}
                      source={item.image_url && { uri: item.image_url }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setActiveReceiptIdx(index);
                      setActiveReceipt(item);
                      setEditModalOpen(true);
                    }}
                  >
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item.vendor} `}</Text>
                      </ListItem.Title>
                      <ListItem.Subtitle>{`Receipt Total: $${item.total_amount} `}</ListItem.Subtitle>
                      <ListItem.Subtitle>{`Purchase Date: ${item.receipt_date} `}</ListItem.Subtitle>
                      <ListItem.Subtitle>{`Purchase Category: ${
                        categories[item.category - 1]?.name
                      } `}</ListItem.Subtitle>
                    </ListItem.Content>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: "5%",
                    width: "30%",
                  }}
                  onPress={() => {
                    setActiveReceiptIdx(index);
                    setActiveReceipt(item);
                    setEditModalOpen(true);
                  }}
                >
                  <ListItem.Chevron />
                </TouchableOpacity>
              </View>
            </ListItem.Swipeable>
          );
        }}
      />
      <ImageModal
        visible={modalOpen}
        receipt={activeReceipt}
        close={() => {
          setModalOpen(false);
        }}
      />
      <EditModal
        visible={editModalOpen}
        receipt={activeReceipt}
        arrayIdx={activeReceiptIdx}
        updateLocalReceipt={updateLocalReceipt}
        close={() => {
          setEditModalOpen(false);
        }}
      />
      {loading ? <ActivityIndicator size="large" color="red" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginTop: 5,
    fontSize: 35,
  },
});
