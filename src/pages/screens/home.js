import { useEffect, useState } from "react";
import { View } from "react-native";
import { getReceipts } from "../../utils/fetchUtils";
import { deactivateReceipt } from "../../utils/receiptUtils";
import { MainTable } from "../../components/mainTable/mainTable";
import { useAtom } from "jotai";
import { receiptAtom } from "../../atom/atom";
import Toast from "react-native-toast-message";

export const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [refetch, setReFetch] = useState(false);

  const [rAtom] = useAtom(receiptAtom);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    setReceipts([]);
  }, [rAtom]);

  useEffect(() => {
    setLoading(true);
    getReceipts(2000)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        const { receipts: r } = res;
        /// const { pages, receipts: r, total } = res;
        const receiptsArr = !refetch ? [...r] : [...receipts, ...r];
        setReceipts(receiptsArr);
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
      .finally(() => {
        setLoading(false);
        setFetched(true);
        setReFetch(false);
      });
  }, [
    setReceipts,
    setLoading,
    setFetched,
    setReFetch,
    fetched,
    refetch,
    rAtom,
  ]);

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

  const deleteReceipt = (idx) => {
    deactivateReceipt(receipts[idx].pk).then((res) => {
      const newReceipts = [...receipts];
      newReceipts.splice(idx, 1);
      setReceipts(newReceipts);
    });
  };

  return (
    <>
      <Toast />

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
          deleteReceipt={deleteReceipt}
          updateLocalReceipt={updateLocalReceipt}
          refetch={() => {
            setReFetch(false);
            setFetched(false);
          }}
        />
      </View>
    </>
  );
};
