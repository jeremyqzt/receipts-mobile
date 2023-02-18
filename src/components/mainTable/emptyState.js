import { View, Image, Text, TouchableOpacity } from "react-native";
import Logo from "../../../assets/logoDark.png";

export const EmptyState = ({ navigation, onRefresh }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          width: "60%",
          marginHorizontal: "auto",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: null,
            height: "20%",
            resizeMode: "contain",
            marginTop: "0%",
          }}
          source={Logo}
        />
      </View>
      <View
        style={{
          width: "100%",
          marginHorizontal: "auto",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 28,
          }}
        >
          No Receipts found here!
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Upload");
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 18,
              marginTop: 48,
              textDecorationLine: "underline",
              color: "#dc3545",
            }}
          >
            📷 Click me to upload your first receipt.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 18,
              marginTop: 48,
              textDecorationLine: "underline",
              color: "#dc3545",
            }}
          >
            ⚙️ Or, click me to change your active bucket.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onRefresh();
          }}
        >
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 18,
              marginTop: 48,
              textDecorationLine: "underline",
              color: "#dc3545",
            }}
          >
            🚫 Is this an error? Press me to
            try again!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
