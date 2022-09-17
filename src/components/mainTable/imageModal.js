import React from "react";
import { Dialog, Image } from "@rneui/themed";
import { Text, ActivityIndicator, StyleSheet } from "react-native";

export const ImageModal = (props) => {
  const { image_url, visible, close } = props;
  return (
    <Dialog isVisible={visible} onBackdropPress={close}>
      <Dialog.Title title="Dialog Title" />
      <Text>Uploaded Image</Text>
      <Image
        source={{ uri: image_url }}
        containerStyle={styles.item}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Dialog.Actions>
        <Dialog.Button title="Done" onPress={close} />
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    backgroundColor: "#000",
  },
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
});
