import React from "react";
import { Button, Image } from "@rneui/themed";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import { useColorScheme } from "react-native";

export const ImageModal = (props) => {
  const {
    receipt = {},
    visible,
    close,
    onChangeImage,
    arrayIdx,
    isUploadLoading,
  } = props;
  const { image_url, pk } = receipt;
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";

  return (
    <Modal isVisible={visible} onBackdropPress={close}>
      <View style={{ ...styles.dialog, backgroundColor: bgColor }}>
        {image_url ? (
          <Image
            source={{ uri: image_url }}
            style={{
              height: "90%",
              aspectRatio: 1,
              width: undefined,
              resizeMode: "contain",
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <View style={{ marginLeft: 12, display: "flex", justifyContent: "center", width: "100%" }}>
            <Text style={{color: textColor}}>Quick Entry - No Image</Text>
          </View>
        )}
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            backgroundColor: bgColor,
          }}
        >
          <View
            style={{ marginTop: 24, width: "45%", backgroundColor: bgColor }}
          >
            <Button
              title={image_url ? "Update Image" : "Attach Image"}
              onPress={() => onChangeImage(pk, arrayIdx)}
              loading={isUploadLoading}
            />
          </View>
          <View style={{ marginTop: 24, width: "45%" }}>
            <Button
              title="Done"
              onPress={close}
              color="#cccccc"
              loading={isUploadLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    padding: 25,
    maxHeight: "70%",
  },
});
