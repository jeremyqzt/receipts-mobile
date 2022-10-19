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
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Toast />

      <View
        style={{
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 12,
            }}
          >
            Bucket Selection
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 4 }}>
            Update your active bucket below, receipts will automatically, load
            from, and upload to this bucket.
          </Text>
        </View>
        <BucketsSelect buckets={buckets} activeBucket={activeBucket} />
      </View>

      <View
        style={{
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 24,
            }}
          >
            Bucket Creation
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 4 }}>
            Create a new bucket to upload receipts into below, this will open a modal.
            The active bucket will not change when a new bucket is created.
          </Text>
        </View>
        <BucketsSelect buckets={buckets} activeBucket={activeBucket} />
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 24,
            }}
          >
            Logout
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 4, marginBottom: 8 }}>
            Click the logout button to end the current session.
            You will need to re-enter your credentials.
          </Text>
        </View>
        <Button
          title={"Logout!"}
          style={{
            width: "100%",
            paddingHorizontal: 10,
          }}
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
    </View>
  );
};
