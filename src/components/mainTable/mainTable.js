import { ListItem, Avatar } from "@rneui/themed";

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

keyExtractor = (_, index) => index.toString();

renderItem = ({ item }) => (
  <ListItem bottomDivider>
    <Avatar
      title={item.name[0]}
      source={item.avatar_url && { uri: item.avatar_url }}
    />
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
);

export const MainTable = (props) => {
  const { receipts } = props;
  return (
    <FlatList
      keyExtractor={this.keyExtractor}
      data={receipts}
      renderItem={this.renderItem}
    />
  );
};
