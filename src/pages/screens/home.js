import { Input, Button } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { View, Image, Text, Linking, ActivityIndicator } from "react-native";
import { getReceipts } from "../../utils/fetchUtils";
import { MainTable } from "../../components/mainTable/mainTable";

export const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [receipts, setReceipts] = useState([]);
  const [paging, setPaging] = useState({});

  useEffect(() => {
    getReceipts()
      .then((res) => res.json())
      .then((res) => {
        const { pages, receipts: r, total } = res;
        setReceipts([...receipts, ...r]);
        setPaging({ pages, total });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setReceipts, setPaging, setLoading]);

  const updateLocalReceipt = (update, updateIdx) => {
    const newReceipts = [...receipts];
    if (!isNaN(updateIdx) && updateIdx >= 0 && updateIdx < receipts.length) {
      newReceipts[updateIdx] = {
        ...newReceipts[updateIdx],
        ...update,
      };
    }

    setReceipts(newReceipts);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <MainTable
          loading={loading}
          receipts={receipts}
          updateLocalReceipt={updateLocalReceipt}
        />
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
    </>
  );
};
