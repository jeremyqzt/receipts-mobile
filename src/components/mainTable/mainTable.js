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

export const MainTable = (props) => {
  const { receipts, loading } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState();

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
                onPress={(item) => {
                  setActiveReceipt(item);
                  setModalOpen(true);
                }}
              >
                <Avatar
                  title={item.alive}
                  source={item.image_url && { uri: item.image_url }}
                />
              </TouchableOpacity>
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
              <ListItem.Chevron />
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
      {loading ? <ActivityIndicator size="large" color="red" /> : null}
    </View>
  );
};
