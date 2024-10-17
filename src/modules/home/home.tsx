import { StatusBar, Text, TextInput, View } from "react-native";
import { colors } from "../../theme/colors";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import { GET_STOCKS } from "../../constants/actionTypes";
import { useDispatch } from "react-redux";

const Home = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch({
            type: GET_STOCKS,
            payload: {
              search:""
            },
        })
    },[])

return(

  <View style={{backgroundColor:colors.homeBackground, flex:1}}>
  <StatusBar backgroundColor={colors.header} barStyle={"dark-content"} />
  <View style={{height:'10%', width:'100%'}}>
  <Header/>
  </View>
  <View style={{width:'90%', alignSelf:'center'}}>
  <TextInput placeholder="Search" textAlign='left' style={{marginTop:'5%',height:'22%' , backgroundColor:colors.card , borderRadius:30 , borderColor:colors.white, borderWidth:1 , paddingLeft:10}} ></TextInput>
  
  </View>
 </View>
);
}

export default Home;