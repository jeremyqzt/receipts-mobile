import { Button } from "@rneui/themed";
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import Logo from "../../../assets/logo.png";
import { getActiveBucket } from "../../utils/bucketUtils";
import { postReceipt } from "../../utils/receiptUtils";

export const UploadScreen = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const [activeBucket, setActiveBucket] = useState({});


  useEffect(() => {
    getActiveBucket().then((res) => {
        setActiveBucket(res);
      }).catch(() => console.log(err));
    // requestPermission();
  });

  const triggerUpload = (data) => {
    console.log("Uploading");
    postReceipt({image: data, bucket: activeBucket.uid}).then((res) => {
        console.log(JSON.stringify(res));
    }).catch((err)=>console.log("ERROR" + JSON.stringify(err)))
  }

  const takePicture = async () => {
    const options = { quality: 0, base64: true };
    const data = await camera.takePictureAsync(options);
      // Infer the type of the image
    const fileName = data.uri.split('/').pop()
    const match = /\.(\w+)$/.exec(fileName);
    const type = match ? `image/${match[1]}` : `image`;
    //Platform.OS === 'android' ? data: data.replace('file://', '')
    console.log(fileName, type)
    setImage(data.uri);
    const file = { uri: data.uri, name: fileName, type}
    triggerUpload(file);

    setShowCamera(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      //triggerUpload(result.uri);
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
          <Camera
            style={styles.camera}
            type={CameraType.back}
            ref={(ref) => setCamera(ref)}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={takePicture}
              >
                <Text style={styles.text}>Take Picture And Upload!</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <>
            <View
              style={{
                marginTop: 0,
                width: "100%",
                height: "70%",
              }}
            >
              {image ? (
                <Image
                  style={{
                    width: null,
                    height: "100%",
                    resizeMode: "contain",
                    marginTop: "1%",
                  }}
                  source={{ uri: image }}
                />
              ) : (
                <Image
                  style={{
                    width: null,
                    height: "50%",
                    resizeMode: "contain",
                    marginTop: "1%",
                  }}
                  source={Logo}
                />
              )}
            </View>
            {!image ? (
              <Text style={{ fontSize: 24 }}>
                Take an image to create a receipt record!
              </Text>
            ) : null}
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
  buttonContainer: {
    width: "100%"
  },
  button: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
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
