import { Dialog } from "@rneui/themed";
import { Text } from "react-native";
export const EditModal = (props) => {
  return (
    <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
      <Dialog.Title title="Dialog Title" />
      <Text>Dialog body text. Add relevant information here.</Text>
    </Dialog>
  );
};
