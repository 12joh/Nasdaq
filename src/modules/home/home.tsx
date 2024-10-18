import { FlatList, StatusBar, Text, TextInput, View } from "react-native";
import { colors } from "../../theme/colors";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { GET_MORE_STOCKS, GET_STOCKS } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { cardType, StoreType } from "../../redux/store/StoreType";

const Home = () =>{
    const dispatch = useDispatch()
    const { card } =
    useSelector((state: StoreType) => state.home);
    const [search,setSearch] = useState("")
    const [results, setResults] = useState<cardType[]>([]);
    const [issearch,setIsSearch] = useState(false)
    const [isMore,setIsMore] = useState(false)
    useEffect(()=>{
      setIsMore(false)
      setIsSearch(false)
        dispatch({
            type: GET_STOCKS,
            payload: {
              search:""
            },
        })
    },[])
    const loadMoreData = () => {
      if(card?.next_url != undefined){
      setIsMore(true)
      const cursorMatch = card?.next_url.match(/cursor=([^&]*)/);
      if(cursorMatch[1] != undefined){
      console.log(cursorMatch[1])
      dispatch({
        type: GET_MORE_STOCKS,
        payload: {
          next:cursorMatch[1]
        },
    })
  }
  }
    };

    useEffect(() => {
      if (isMore) {
        setResults((prevResults) =>
          [...prevResults, ...card?.results]
        );
      }else{
        setResults(card?.results)
      }
    }, [card?.results]);

    useEffect(()=>{
      const delayDebounceFn = setTimeout(() => {
            if (search != undefined) {
              if(search!= ""){
              setIsMore(false)
              setIsSearch(true)
              }else{
                setIsSearch(false)
              }
              dispatch({
                type: 'GET_STOCKS',
                payload: {
                  search: search,
                },
              });
            }
          }, 300); 
      
          return () => {
            clearTimeout(delayDebounceFn); 
          };
    },[search])

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
  <TextInput onChangeText={(text: string) => {setSearch(text);}} placeholder="Search" textAlign='left' style={{marginTop:'5%',height:'22%' , backgroundColor:colors.card , borderRadius:30 , borderColor:colors.iconBackground, borderWidth:3 , paddingLeft:10}} ></TextInput>
  </View>
  {issearch && card?.results.length == 0? (
    <Text style={{color:colors.white,alignSelf:'center' , fontSize:16}}>No Result Found</Text>
  ):(
  <View style={{top:'-15%', marginBottom:'40%'}}>
  <FlatList
        data={results} 
        renderItem={renderCardItem}
        keyExtractor={(item:cardType, index) => index.toString()}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: '5%' }} 
        contentContainerStyle={{ paddingVertical: '5%' }}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.8}
      />
      </View>
    )}
 </View>
);
}

export default Home;