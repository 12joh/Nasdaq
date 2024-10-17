import { FlatList, StatusBar, Text, TextInput, View } from "react-native";
import { colors } from "../../theme/colors";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import { GET_STOCKS } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { cardType, StoreType } from "../../redux/store/StoreType";

const Home = () =>{
    const dispatch = useDispatch()
    const { card } =
    useSelector((state: StoreType) => state.home);
    useEffect(()=>{
        dispatch({
            type: GET_STOCKS,
            payload: {
              search:""
            },
        })
    },[])
    const renderCardItem = ({item}:{item:cardType}) => (
        <Card mainText={item.ticker} subText={item.name} />
      );

return(
  <View style={{backgroundColor:colors.homeBackground, flex:1}}>
  <StatusBar backgroundColor={colors.header} barStyle={"dark-content"} />
  <View style={{height:'10%', width:'100%'}}>
  <Header/>
  </View>
  <View style={{width:'90%', alignSelf:'center'}}>
  <TextInput placeholder="Search" textAlign='left' style={{marginTop:'5%',height:'22%' , backgroundColor:colors.card , borderRadius:30 , borderColor:colors.white, borderWidth:1 , paddingLeft:10}} ></TextInput>
  </View>
  <View style={{top:'-15%', marginBottom:'40%'}}>
  <FlatList
        data={card.results} 
        renderItem={renderCardItem}
        keyExtractor={(item:cardType, index) => index.toString()}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: '5%' }} 
        contentContainerStyle={{ paddingVertical: '5%' }}
      />
      </View>
 </View>
);
}

export default Home;