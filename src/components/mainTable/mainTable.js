import { ListItem, Avatar } from "@rneui/themed";
import {
  View,
  Image,
  Text,
  Linking,
  ActivityIndicator,
  FlatList,
} from "react-native";

const list = [
  {
    name: "Amy Farha",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
];

export const MainTable = (props) => {
  const { receipts, loading } = props;

  if (!receipts && loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <FlatList
      style={{
        width: '100%'
      }}
        keyExtractor={(_, index) => index.toString()}
        data={receipts}
        renderItem={({ item, index }) => {
          return (
            <ListItem bottomDivider>
              <Avatar
                title={item.alive}
                source={item.image_url && { uri: item.image_url }}
              />
              <ListItem.Content>
                <ListItem.Title>{item.description}</ListItem.Title>
                <ListItem.Subtitle>{item.receipt_date}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          );
        }}
      />
      {loading ? <ActivityIndicator size="large" color="red" /> : null}
    </View>
  );
};
