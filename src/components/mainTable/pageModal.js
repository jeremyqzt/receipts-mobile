import React from "react";
import { Button, Image } from "@rneui/themed";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

export const PageModal = (props) => {
  const { receipt = {}, visible, close } = props;
  const { image_url } = receipt;
  return (
    <Modal isVisible={visible} onBackdropPress={close}>
      <View style={styles.dialog}>
        <Image
          source={{uri:image_url}}
          style={{width: "100%", aspectRatio: 1}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <Button title="Done" onPress={close} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    padding: 25,
  },

});
