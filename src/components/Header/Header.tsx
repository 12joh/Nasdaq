import { Image, View } from "react-native";
import { colors } from "../../theme/colors";

const Header = () =>{
return(
    <View style={{backgroundColor:colors.header, height:'100%', flexDirection:'row'}}>
    <Image style={{left:'5%',width:'30%',resizeMode:'contain', alignSelf:'center'}} source={require("../../../assets/images/headerLogo/headerLogo.png")}/>
    </View>
);
}

export default Header;