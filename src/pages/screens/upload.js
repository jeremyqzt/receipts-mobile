import { Button } from "@rneui/themed";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import Logo from "../../../assets/logo.png";

export const UploadScreen = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  });

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Toast />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {showCamera ? (
          <Camera style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>Take Picture And Upload!</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <>
            <View
              style={{
                marginTop: "1%",
                width: "100%",
                height: "30%",
                margin: "auto",
              }}
            >
              <Image
                style={{
                  width: null,
                  height: "50%",
                  resizeMode: "contain",
                  marginTop: "1%",
                }}
                source={Logo}
              />
            </View>
            <Text style={{ fontSize: 24 }}>
              Take an image to create a receipt record!
            </Text>
          </>
        )}
      </View>

      <View
        style={{
          marginTop: "3%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginBottom: "3%",
        }}
      >
        <View
          style={{
            width: "100%",
          }}
        >
          <Button
            style={{
              width: 200,
            }}
            title={"Select Image!"}
            onPress={async () => {
              pickImage();
            }}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              width: 200,
            }}
            title={showCamera ? "Hide Camera!" : "Show Camera!"}
            onPress={async () => {
              setShowCamera(!showCamera);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: "100%",
  },
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
