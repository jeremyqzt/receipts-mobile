import { useEffect, useState } from "react";
import { View } from "react-native";
import { getReceipts } from "../../utils/fetchUtils";
import * as ImagePicker from "expo-image-picker";

import {
  deactivateReceipt,
  postReceipt,
  postReceiptImageUpdate,
} from "../../utils/receiptUtils";
import { MainTable } from "../../components/mainTable/mainTable";
import { useAtom } from "jotai";
import { receiptAtom, bucketAtom } from "../../atom/atom";
import Toast from "react-native-toast-message";
import { PageModal } from "../../components/mainTable/pageModal";
import { useColorScheme } from "react-native";
import { getActiveBucket } from "../../utils/bucketUtils";

export const HomeScreen = ({
  settingsModalOpen,
  setSettingsModalOpen,
  navigation,
  creating,
  setCreating,
}) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const bgColor = colorScheme === "dark" ? "black" : "white";
  const [aLoading, setLoading] = useState(true);
  const [Bloading, setBLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [refetch, setReFetch] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageMeta, setPageMeta] = useState({ offset: 0, limit: 20 });
  const [rAtom] = useAtom(receiptAtom);
  const [_, setImage] = useState(null);
  const [uploadFile, setUploadFile] = useState({});
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [bAtom] = useAtom(bucketAtom);
  const [receipts, setReceipts] = useState([]);
  const [activeBucket, setActiveBucket] = useState({});
  useEffect(() => {
    if (creating) {
      createLocalReceipt();
    }
    setCreating(false);
  }, [creating]);

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
        // setReceipts([]);
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

  useEffect(() => {
    setBLoading(true);

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
      .finally(() => setBLoading(false));
  }, [bAtom]);

  const createLocalReceipt = () => {
    if (!activeBucket) {
      return;
    }

    postReceipt({ bucket: activeBucket.id })
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "✅ Success!",
          text2: "Quick entry created!",
          position: "bottom",
        });
        const newReceipt = res?.receipt;
        if (newReceipt) {
          const newReceipts = [{ ...newReceipt }, ...receipts];
          setReceipts(newReceipts);
        }
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "🛑 Error!",
          text2: "Quick entry creation failed, please try again!",
          position: "bottom",
        });
      })
      .finally(() => setLoading(false));
  };

  const deleteReceipt = (idx) => {
    deactivateReceipt(receipts[idx].pk).then(() => {
      const newReceipts = [...receipts];
      newReceipts.splice(idx, 1);
      setReceipts(newReceipts);
      setTotalCount(() => totalCount - 1);
    });
  };

  const resetPaging = () => {
    setPageMeta({ offset: pageMeta.offset, limit: pageMeta.limit });
  };

  const pickImage = async (uid, arrayIdx) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0,
    });

    if (!result.canceled) {
      setIsUploadLoading(true);
      const fileName = result.assets[0].uri.split("/").pop();
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : `image`;
      const file = { uri: result.assets[0].uri, name: fileName, type };
      setImage(result.assets[0].uri);
      setUploadFile(file);
      postReceiptImageUpdate(file, uid)
        .then((res) => {
          const { image_url, thumbnail } = res;
          Toast.show({
            type: "success",
            text1: "✅ Success!",
            text2: "Image Updated!",
            position: "bottom",
          });
          updateLocalReceipt({ image_url, thumbnail }, arrayIdx);
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "🛑 Error!",
            text2: "Image could not be edited, please try again!",
            position: "bottom",
          });
        })
        .finally(() => {
          setIsUploadLoading(false);
          setModalOpen(false);
        });
    }
  };

  const changeImage = (uid, arrayIdx) => {
    pickImage(uid, arrayIdx);
  };

  const loading = aLoading || Bloading;

  return (
    <>
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
          backgroundColor: bgColor,
          color: textColor,
          width: "100%",
        }}
      >
        <MainTable
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          navigation={navigation}
          changeImage={changeImage}
          loading={loading}
          isUploadLoading={isUploadLoading}
          receipts={receipts}
          deleteReceipt={deleteReceipt}
          updateLocalReceipt={updateLocalReceipt}
          openPageModal={() => setSettingsModalOpen(true)}
          resetPaging={() => resetPaging()}
          pageMeta={pageMeta}
          refetch={() => {
            setReFetch(!refetch);
            setReceipts([]);
          }}
        />
      </View>
    </>
  );
};
