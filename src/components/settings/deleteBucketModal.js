import { Button, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { deactivateBucket } from "../../utils/bucketUtils";
import Toast from "react-native-toast-message";
import { BucketsSelect } from "./deleteBucketSelect";
import { bucketAtom } from "../../atom/atom";
import { useAtom } from "jotai";
import { useColorScheme } from "react-native";

export const DeleteBucketModal = (props) => {
  const { visible, closeModal, activeBucket, buckets } = props;
  const [loading, setLoading] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState();
  const [bAtom, setBucketAtom] = useAtom(bucketAtom);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "#202020" : "white";
  return (
    <Modal avoidKeyboard isVisible={visible} onBackdropPress={closeModal}>
      <View style={[styles.dialog, {backgroundColor:bgColor , borderRadius: 25}]}>
      <View style={[styles.header, {color: textColor}]}>
          <Text h2 style={{color: textColor}}>Delete Bucket</Text>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <BucketsSelect
              buckets={buckets}
              activeBucket={activeBucket}
              toDelete={selectedBucket}
              setToDelete={(a) => {
                setSelectedBucket(a);
              }}
            />
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <View style={{ marginTop: 24, width: "45%" }}>
            <Button
              style={{ width: "100%" }}
              color="#cccccc"
              loading={loading}
              title="Cancel"
              onPress={() => closeModal()}
            />
          </View>
          <View style={{ marginTop: 24, width: "45%" }}>
            <Button
              style={{ width: "100%" }}
              loading={loading}
              title="Delete"
              disabled={!selectedBucket}
              onPress={() => {
                setLoading(true);
                deactivateBucket(selectedBucket.id)
                  .then(() => {
                    Toast.show({
                      type: "success",
                      text1: "✅ Success!",
                      text2: "Your bucket has been deleted!",
                      position: "bottom",
                    });
                    setBucketAtom(bAtom + 1);
                  })
                  .catch(() => {
                    Toast.show({
                      type: "error",
                      text1: "🛑 Error!",
                      text2: "Bucket could not be deleted, please try again!",
                      position: "bottom",
                    });
                  })
                  .finally(() => {
                    closeModal();
                    setLoading(false);
                  });
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginTop: 5,
    fontSize: 35,
  },
  header: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  buttomBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtn: {
    flex: 1,
  },

  dialog: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
  },
  dropdown: {
    height: 45,
    width: "85%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 0,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
