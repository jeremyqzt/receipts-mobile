import { Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { View, Text, ScrollView } from "react-native";
import { listBuckets, getActiveBucket } from "../../utils/bucketUtils";
import { useEffect, useState } from "react";
import { BucketsSelect } from "../../components/settings/buckets";
import { CreateBucketModal } from "../../components/settings/bucketModal";
import { DeleteBucketModal } from "../../components/settings/deleteBucketModal";
import { useAtom } from "jotai";
import { bucketAtom } from "../../atom/atom";

import Toast from "react-native-toast-message";

export const SettingsScreen = ({ navigation }) => {
  const [buckets, setBuckets] = useState([]);
  const [activeBucket, setActiveBucket] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteVis, setDeleteVis] = useState(false);
  const [bAtom] = useAtom(bucketAtom);

  useEffect(() => {
    setLoading(true);
    listBuckets().then((res) => {
      setBuckets(res);
    });

    getActiveBucket()
      .then((res) => {
        setActiveBucket(res);
      })
      .finally(() => setLoading(false));
  }, [setActiveBucket, setBuckets, setLoading, bAtom]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <DeleteBucketModal
          buckets={buckets}
          activeBucket={activeBucket}
          visible={deleteVis}
          closeModal={() => {
            setDeleteVis(false);
          }}
        />
        <CreateBucketModal
          visible={visible}
          closeModal={() => {
            setVisible(false);
          }}
        />

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
          <BucketsSelect
            buckets={buckets}
            activeBucket={activeBucket}
            setLoading={(v) => setLoading(v)}
          />
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
              Create a new bucket to upload receipts into below, this will open
              a modal. The active bucket will not change when a new bucket is
              created.
            </Text>
          </View>
          <Button
            title={"Create A Bucket"}
            loading={loading}
            amount={(buckets ?? []).length}
            style={{
              width: "100%",
              paddingHorizontal: 10,
            }}
            onPress={async () => {
              setVisible(true);
            }}
          />
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
              Bucket Deletion
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 4 }}>
              Delete a bucket, this deletes all receipts associated with the
              bucket. Active buckets cannot be deleted.
            </Text>
          </View>
          <Button
            title={"Delete A Bucket"}
            loading={loading}
            style={{
              width: "100%",
              paddingHorizontal: 10,
            }}
            onPress={async () => {
              setDeleteVis(true);
            }}
          />
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
                marginTop: 150,
              }}
            >
              Logout
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                marginTop: 4,
                marginBottom: 8,
              }}
            >
              Click the logout button to end the current session. You will need
              to re-enter your credentials.
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
      </ScrollView>
      <Toast />
    </>
  );
};
