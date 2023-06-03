import React from "react";
import { Button, Image } from "@rneui/themed";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

export const ImageModal = (props) => {
  const { receipt = {}, visible, close, onChangeImage, arrayIdx } = props;
  const { image_url, pk } = receipt;
  return (
    <Modal isVisible={visible} onBackdropPress={close}>
      <View style={styles.dialog}>
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
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <View style={{ marginTop: 24, width: "45%" }}>
            <Button title="Update Image" onPress={() => onChangeImage(pk, arrayIdx)} />
          </View>
          <View style={{ marginTop: 24, width: "45%" }}>
            <Button title="Done" onPress={close} color="#cccccc" />
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
