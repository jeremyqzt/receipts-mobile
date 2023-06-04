import React from "react";
import { Button } from "@rneui/themed";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { StyleSheet, View, Text, Image } from "react-native";
import Modal from "react-native-modal";
import { useColorScheme } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";

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

  const downloadPhoto = async () => {
    const res = await MediaLibrary.requestPermissionsAsync();

    if (!res.granted || !image_url) {
      Toast.show({
        type: "error",
        text1: "🛑 Error!",
        text2: "Photo permissions not granted, cannot save!",
        position: "bottom",
      });
    }

    try {
      const fileName = image_url.replace(/^.*[\\\/]/, "").split("?")[0];

      Toast.show({
        type: "success",
        text1: "✅ Success!",
        text2: "Starting to download and save the photo!",
        position: "bottom",
      });

      let imageFullPathInLocalStorage = FileSystem.documentDirectory + fileName;
      return new Promise(async (resolve) => {
        FileSystem.downloadAsync(image_url, imageFullPathInLocalStorage).then(
          async ({ uri }) => {
            MediaLibrary.saveToLibraryAsync(imageFullPathInLocalStorage);
            return resolve(imageFullPathInLocalStorage);
          }
        );
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "🛑 Error!",
        text2: "Something wrong happened while saving, please try again!",
        position: "bottom",
      });
    }
  };

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
                marginLeft: 0,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                type="clear"
                onPress={() => {
                  downloadPhoto();
                }}
                title={"Download Image"}
              />
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
            marginTop: "5%",
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
