import React, { useState } from "react";

import { ListItem, Avatar } from "@rneui/themed";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { categories } from "../../constants/categoryConstants";
import { ImageModal } from "./imageModal";
import { EditModal } from "./editModal";
import Toast from "react-native-toast-message";

export const Settings = (props) => {
  const { receipts, loading, updateLocalReceipt } = props;

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
            <ListItem bottomDivider>
              <TouchableOpacity
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
              <TouchableOpacity
                onPress={() => {
                  setActiveReceiptIdx(idx);
                  setActiveReceipt(item);
                  setEditModalOpen(true);
                }}
              >
                <ListItem.Chevron />
              </TouchableOpacity>
            </ListItem>
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
