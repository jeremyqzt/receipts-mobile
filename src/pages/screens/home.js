import { useEffect, useState } from "react";
import { View } from "react-native";
import { getReceipts } from "../../utils/fetchUtils";
import { deactivateReceipt } from "../../utils/receiptUtils";
import { MainTable } from "../../components/mainTable/mainTable";
import { useAtom } from "jotai";
import { receiptAtom } from "../../atom/atom";
import Toast from "react-native-toast-message";
import { PageModal } from "../../components/mainTable/pageModal";

export const HomeScreen = ({ settingsModalOpen, setSettingsModalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [refetch, setReFetch] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageMeta, setPageMeta] = useState({ offset: 0, limit: 20 });

  const [rAtom] = useAtom(receiptAtom);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    setReceipts([]);
  }, [rAtom]);

  useEffect(() => {
    setLoading(true);
    getReceipts(pageMeta)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((res) => {
        const { receipts: r, total } = res;
        /// const { pages, receipts: r, total } = res;
        const receiptsArr = !refetch ? [...r] : [...receipts, ...r];
        setReceipts(receiptsArr);
        setTotalCount(total);
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
        setReFetch(false);
      });
  }, [setReceipts, setLoading, setReFetch, refetch, rAtom, pageMeta]);

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
      <PageModal
        visible={settingsModalOpen}
        close={() => setSettingsModalOpen(false)}
        totalCount={totalCount}
        setPaging={(v) => {
          setPageMeta(v);
        }}
      />
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
            setReFetch(!refetch);
            setReceipts([]);
          }}
        />
      </View>
    </>
  );
};
