import React from "react";
import { Button } from "@rneui/themed";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { ActivityIndicator, StyleSheet, View, Text, Image } from "react-native";
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
          <>
            <View
              style={{
                height: "70%",
                width: "100%",
              }}
            >
              <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
              >
                <Image
                  source={{ uri: image_url }}
                  style={{
                    aspectRatio: 1,
                    width: "100%",
                    maxHeight: "100%",
                    resizeMode: "contain",
                  }}
                />
              </ReactNativeZoomableView>
            </View>
            <View
            style={{
              marginLeft: 12,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: textColor }}>Hint - Pinch to Zoom In or Out!</Text>
          </View>
          </>
        ) : (
          <View
            style={{
              marginLeft: 12,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text style={{ color: textColor }}>Quick Entry - No Image</Text>
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
