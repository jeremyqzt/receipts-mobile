import { Button } from "@rneui/themed";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { getActiveBucket } from "../../utils/bucketUtils";
import { postReceipt } from "../../utils/receiptUtils";
import { Icon } from "../../components/upload/icon";

export const UploadScreen = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadFile, setUploadFile] = useState({});

  const [activeBucket, setActiveBucket] = useState({});
  useEffect(() => {
    if (permission && permission?.granted) {
      return;
    }

    (async () => {
      await requestPermission();
    })();
  }, []);

  useEffect(() => {
    getActiveBucket()
      .then((res) => {
        setActiveBucket(res);
      })
      .catch(() => console.log(err));
  }, []);

  const triggerUpload = () => {
    postReceipt({ image: uploadFile, bucket: activeBucket.uid })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "✅ Success!",
          text2: "Your receipt has been uploaded!",
          position: "bottom",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "🛑 Error!",
          text2: "Upload could not be completed, please try again!",
          position: "bottom",
        });
      });
  };

  const takePicture = async () => {
    const options = { quality: 0, base64: true };
    const data = await camera.takePictureAsync(options);
    // Infer the type of the image
    const fileName = data.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(fileName);
    const type = match ? `image/${match[1]}` : `image`;
    setImage(data.uri);
    const file = { uri: data.uri, name: fileName, type };
    setUploadFile(file);
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
      const fileName = result.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : `image`;
      const file = { uri: result.uri, name: fileName, type };

      setImage(result.uri);
      setUploadFile(file);
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
            <View style={styles.buttonContainerOutter}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture} />
              </View>
            </View>
          </Camera>
        ) : (
          <>
            <View
              style={{
                marginTop: -100,
                width: "100%",
                height: "60%",
              }}
            >
              {image ? (
                <>
                  <Image
                    style={{
                      width: null,
                      height: "100%",
                      resizeMode: "contain",
                      marginTop: "1%",
                    }}
                    source={{ uri: image }}
                  />
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 0,
                    }}
                  >
                    <Button
                      style={{
                        width: 200,
                        marginHorizontal: "auto",
                        marginVertical: 16,
                      }}
                      title={"Upload Image!"}
                      onPress={async () => {
                        triggerUpload();
                      }}
                    />
                    <Text>Or try again.</Text>
                  </View>
                </>
              ) : (
                <View
                  style={{
                    width: null,
                    height: "75%",
                    resizeMode: "contain",
                    marginVertical: "1%",
                    marginHorizontal: 50,
                    borderRadius: 25,
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <Icon
                    width="100%"
                    height="100%"
                    strokeWidth={15}
                    stroke="black"
                  />
                </View>
              )}
            </View>
            {!image ? (
              <Text style={{ fontSize: 20 }}>
                Take or upload an image to create a record!
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
  buttonContainerOutter: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    elevation: 8,
    marginBottom: 32,
    backgroundColor: "grey",
    borderRadius: 50,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  button: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: 30,
    paddingHorizontal: 30,
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
