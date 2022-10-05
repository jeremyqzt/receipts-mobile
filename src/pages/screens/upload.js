import { Input, Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { View, Image, Text, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { listBuckets, getActiveBucket } from "../../utils/bucketUtils";
import { useEffect, useState } from "react";
import { BucketsSelect } from "../../components/settings/buckets";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from 'expo-camera';

export const UploadScreen = () => {
  const [buckets, setBuckets] = useState([]);
  const [activeBucket, setActiveBucket] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  });

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
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


  useEffect(() => {
    
    listBuckets().then((res) => {
      setBuckets(res);
    });

    getActiveBucket().then((res) => {
      setActiveBucket(res);
    });
  }, [setActiveBucket, setBuckets, setLoading]);

  if (!permission) {
    return null
  } 

  if (!permission.granted) {
    return null
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
        <BucketsSelect buckets={buckets} activeBucket={activeBucket} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      </View>

      <Button
        title={"Upload!"}
        onPress={async () => {
          pickImage();
        }}
      />
    </View>
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
  