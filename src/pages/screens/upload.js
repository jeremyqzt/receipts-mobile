import { Input, Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { View, Image, Text, Linking } from "react-native";
import { listBuckets, getActiveBucket } from "../../utils/bucketUtils";
import { useEffect, useState } from "react";
import { BucketsSelect } from "../../components/settings/buckets";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

export const UploadScreen = () => {
  const [buckets, setBuckets] = useState([]);
  const [activeBucket, setActiveBucket] = useState({});
  const [loading, setLoading] = useState(false);

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
      <Button
        title={"Upload!"}
        onPress={async () => {
          pickImage();
        }}
      />
    </View>
  );
};
