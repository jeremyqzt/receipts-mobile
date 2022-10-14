import { useEffect, useState } from "react";
import { View } from "react-native";
import { getReceipts } from "../../utils/fetchUtils";
import { deactivateReceipt } from "../../utils/receiptUtils";
import { MainTable } from "../../components/mainTable/mainTable";

export const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);

  const [receipts, setReceipts] = useState([]);
  const [paging, setPaging] = useState({});

  useEffect(() => {
    if (fetched) {
      return;
    }
    getReceipts()
      .then((res) => res.json())
      .then((res) => {
        const { pages, receipts: r, total } = res;
        setReceipts([...receipts, ...r]);
        setPaging({ pages, total });
      })
      .finally(() => {
        setLoading(false);
        setFetched(true);
      });
  }, [setReceipts, setPaging, setLoading, setFetched, fetched]);

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
            setFetched(false);
          }}
        />
      </View>
    </>
  );
};
