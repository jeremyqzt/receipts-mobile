import React, { useEffect, useState } from "react";

import { ListItem, Avatar, Button } from "@rneui/themed";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { getVendors } from "../../utils/receiptUtils";
import { useFetch } from "../../hooks/";
import { categories } from "../../constants/categoryConstants";
import { ImageModal } from "./imageModal";
import { EditModal } from "./editModal";
import { EmptyState } from "./emptyState";
import { vendorAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { useColorScheme } from "react-native";

export const MainTable = (props) => {
  const {
    receipts,
    loading: topLoading,
    updateLocalReceipt,
    deleteReceipt,
    refetch,
    navigation,
  } = props;
  const colorScheme = useColorScheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editModaReload, setEditModalReload] = useState(false);

  const [activeReceipt, setActiveReceipt] = useState();
  const [activeReceiptIdx, setActiveReceiptIdx] = useState();
  const [vAtom] = useAtom(vendorAtom);

  const {
    response: vendors,
    loading: loadingVendors,
    retryCall,
  } = useFetch(getVendors);

  useEffect(() => {
    retryCall();
  }, [vAtom]);

  const loading = topLoading || loadingVendors;

  const textColor = colorScheme === "dark" ? "white" : "black";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        width: "100%",
      }}
    >
      {loading ? (
        <View style={{ marginTop: "40%", height: "40%", width: "100%" }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : null}
      {!loading && (receipts.length ?? []) === 0 ? (
        <EmptyState
          navigation={navigation}
          onRefresh={() => {
            refetch();
          }}
        />
      ) : null}
      {!loading ? (
        <FlatList
          scrollEnabled={scrollEnabled}
          style={{
            width: "100%",
            marginBottom: 90,
          }}
          keyExtractor={(_, index) => index.toString()}
          data={receipts}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={false}
              onRefresh={() => {
                refetch();
              }}
            />
          }
          renderItem={({ item, index }) => {
            return (
              <ListItem.Swipeable
                onSwipeBegin={() => {
                  setScrollEnabled(false);
                  setTimeout(() => setScrollEnabled(true), 2000);
                }}
                onSwipeEnd={() => setScrollEnabled(true)}
                closeOnScroll={false}
                style={{
                  backgroundColor: colorScheme === "dark" ? "black" : "white",
                  color: textColor,
                  borderBottomColor: textColor,
                  borderBottomWidth: 1,
                }}
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
                        setEditModalReload(!editModaReload);
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
                        setEditModalReload(!editModaReload);
                        setEditModalOpen(true);
                      }}
                    >
                      <ListItem.Content>
                        <ListItem.Title>
                          <Text
                            style={{ fontWeight: "bold", color: textColor }}
                          >{`${item.vendor} `}</Text>
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          <Text style={{ color: textColor }}>
                            {`Receipt Total: $${item.total_amount} `}
                          </Text>
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          <Text
                            style={{ color: textColor }}
                          >{`Purchase Date: ${item.receipt_date} `}</Text>
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          <Text
                            style={{ color: textColor }}
                          >{`Purchase Category: ${
                            categories[item.category - 1]?.name
                          } `}</Text>
                        </ListItem.Subtitle>
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
      ) : null}
      <ImageModal
        visible={modalOpen}
        receipt={activeReceipt}
        close={() => {
          setModalOpen(false);
        }}
      />
      <EditModal
        vendors={vendors}
        visible={editModalOpen}
        receipt={activeReceipt}
        arrayIdx={activeReceiptIdx}
        updateLocalReceipt={updateLocalReceipt}
        parentReload={editModaReload}
        close={() => {
          setEditModalOpen(false);
        }}
      />
    </View>
  );
};
