import { Button } from "@rneui/themed";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { getActiveBucket } from "../../utils/bucketUtils";
import { postReceipt } from "../../utils/receiptUtils";
import { Icon } from "../../components/upload/icon";
import { useAtom } from "jotai";
import { receiptAtom, bucketAtom } from "../../atom/atom";
import { useColorScheme } from "react-native";

export const UploadScreen = () => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadFile, setUploadFile] = useState({});
  const [rAtom, setReceiptAtom] = useAtom(receiptAtom);
  const [loading, setLoading] = useState(false);
  const [bAtom] = useAtom(bucketAtom);

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
    setLoading(true);

    getActiveBucket()
      .then((res) => {
        setActiveBucket(res);
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "🛑 Error!",
          text2:
            "Sorry! Our servers aren't responding right now, please try again in a minute.",
          position: "bottom",
        });
      })
      .finally(() => setLoading(false));
  }, [bAtom]);

  const triggerUpload = () => {
    setLoading(true);
    postReceipt({ image: uploadFile, bucket: activeBucket.uid })
      .then(() => {
        Toast.show({
          type: "success",
          text1: "✅ Success!",
          text2: "Your receipt has been uploaded!",
          position: "bottom",
        });
        setReceiptAtom(rAtom + 1);
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "🛑 Error!",
          text2: "Upload could not be completed, please try again!",
          position: "bottom",
        });
      })
      .finally(() => setLoading(false));
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
    // const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!perm.granted) {
    //  return;
    // }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
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
    return (
      <Text style={{ color: textColor, textAlign: "center", marginTop: "25%" }}>
        This app requires camera access to upload images! New receipts cannot be
        uploaded but you can continue to manage your existing entries.
      </Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: bgColor,
        }}
      >
        <View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: 700,
              backgroundColor: bgColor,
              paddingBottom: 100,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "70%",
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
                      <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                      />
                    </View>
                  </View>
                </Camera>
              ) : (
                <>
                  <View
                    style={{
                      marginTop: -159,
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
                            loading={loading}
                            style={{
                              width: 200,
                              marginHorizontal: "auto",
                              marginVertical: 16,
                            }}
                            title={`Upload to ${activeBucket.name}!`}
                            onPress={async () => {
                              triggerUpload();
                            }}
                          />
                          <Text style={{ color: textColor }}>
                            Hint: Change the active bucket by visiting the
                            settings.
                          </Text>
                          <Text style={{ color: textColor }}>
                            If this image doesn't look right, you can always try
                            again!
                          </Text>
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
                          backgroundColor: bgColor,
                        }}
                      >
                        <Icon
                          width="100%"
                          height="100%"
                          strokeWidth={15}
                          stroke={textColor}
                        />
                      </View>
                    )}
                  </View>
                  {!image ? (
                    <Text style={{ fontSize: 20, color: textColor }}>
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
                  loading={loading}
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
                  loading={loading}
                  title={showCamera ? "Hide Camera!" : "Show Camera!"}
                  onPress={async () => {
                    setShowCamera(!showCamera);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
