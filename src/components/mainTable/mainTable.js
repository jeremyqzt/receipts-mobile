import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logoDark.png";
import ImagePlaceHolder from "../../../assets/quick.png";

import { ListItem, Avatar, Button } from "@rneui/themed";
import {
  View,
  Text,
  Image,
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
import { Dimensions } from "react-native";

export const MainTable = (props) => {
  const {
    receipts,
    loading: topLoading,
    updateLocalReceipt,
    deleteReceipt,
    refetch,
    navigation,
    openPageModal,
    pageMeta,
    resetPaging,
  } = props;
  const colorScheme = useColorScheme();
  const windowWidth = Dimensions.get("window").width;
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
            marginBottom: 100,
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
            const isLast = index === receipts.length - 1;

            return (
              <>
                <ListItem.Swipeable
                  onSwipeBegin={() => {
                    setScrollEnabled(false);
                    setTimeout(() => setScrollEnabled(true), 2000);
                  }}
                  rightWidth={windowWidth / 6}
                  leftWidth={0}
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
                      onPress={() => {
                        reset();
                        deleteReceipt(index);
                      }}
                      icon={{ name: "delete", color: "white" }}
                      buttonStyle={{
                        minHeight: "100%",
                        backgroundColor: "red",
                      }}
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
                        disabled={!item.image_url}
                        style={{
                          marginRight: 10,
                          marginVertical: "5%",
                        }}
                        onPress={() => {
                          setActiveReceipt(item);
                          setEditModalReload(!editModaReload);
                          if (item.image_url) {
                            setModalOpen(true);
                          }
                        }}
                      >
                        <Avatar
                          title={"Quick"}
                          icon={{ name: "user", type: "font-awesome" }}
                          source={
                            item.image_url
                              ? { uri: item.image_url }
                              : ImagePlaceHolder
                          }
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
                              {`Receipt Total: $${item.total_amount ?? 0} `}
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
                {isLast ? (
                  <TouchableOpacity onPress={openPageModal}>
                    <View
                      style={{
                        height: 150,
                        paddingVertical: 20,
                        textAlign: "center",
                      }}
                    >
                      {pageMeta.searchTerm ? <></> : null}
                      <Image
                        style={{
                          width: null,
                          height: "20%",
                          resizeMode: "contain",
                          marginTop: "0%",
                          marginBottom: 20,
                        }}
                        source={Logo}
                      />
                      <View
                        style={{
                          width: "100%",
                          marginHorizontal: "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: 16,
                            color: "gray",
                          }}
                        >
                          {`Thats everything for this page!`}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          marginHorizontal: "auto",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: 16,
                            marginTop: 5,
                            color: "gray",
                          }}
                        >
                          {`Click me to view more pages`}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </>
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
