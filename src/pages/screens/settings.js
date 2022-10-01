import { Input, Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { View, Image, Text, Linking } from "react-native";
import { listBuckets, getActiveBucket } from "../../utils/bucketUtils";
import { useEffect, useState } from "react";
import { BucketsSelect } from "../../components/settings/buckets";
import Toast from "react-native-toast-message";

export const SettingsScreen = () => {
  const [buckets, setBuckets] = useState([]);
  const [activeBucket, setActiveBucket] = useState({});
  const [loading, setLoading] = useState(false);

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
        title={"Logout!"}
        onPress={async () => {
          await SecureStore.deleteItemAsync("access_token");
          await SecureStore.deleteItemAsync("refresh_token");

          navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
          });
        }}
      />
    </View>
  );
};
