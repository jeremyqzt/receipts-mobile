import { Input, Button } from "@rneui/themed";
import { View, Image } from "react-native";
import Logo from "../../assets/logo.png"

export const SignUp = () => {
    return (
        <>
            <View style={{ marginTop: "1%", width: "100%", height: "25%", margin: "auto" }}>
                <Image style={{ width: null, height: "50%", resizeMode: "contain", marginTop: "10%" }} source={Logo} />
            </View>
            <View style={{ paddingHorizontal: "10%" }}>
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'at' }}
                />
                <Input placeholder="Password" secureTextEntry={true} leftIcon={{ type: 'font-awesome', name: 'key' }}

                />
                <Input placeholder="Confirm Password" secureTextEntry={true} leftIcon={{ type: 'font-awesome', name: 'key' }} />

            </View>
            <View style={{ paddingHorizontal: "10%", marginTop: "5%" }}>
                <Button title={"Sign Up"} buttonStyle={{ borderRadius: 5 }} />
            </View>
            <View style={{ paddingHorizontal: 15, marginTop: "30%" }}>
                <Button
                    type="clear"
                    buttonStyle={{ borderRadius: 5, }}
                    onPress={() => alert("click")}
                    title="Sign In Here!"
                    titleStyle={{ color: "rgb(0, 99, 191)" }}
                />
            </View>
        </>
    );
}