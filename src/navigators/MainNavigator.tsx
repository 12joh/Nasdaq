
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";



import { useSelector } from "react-redux";
import { StoreType } from "../redux/store/StoreType";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import HomeNavigator from "./HomeNavigator";
import { colors } from "../theme/colors";

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const navigatorHandler = () => {
    if(isLoading){
      console.log("hiii")
      return(
         <View style={{backgroundColor:colors.black , flex:1}}>
         <Image source={require('../../assets/images/Logo/Logo.png')} style={{width:'90%', alignSelf:'center'}}></Image> 
         
         </View>
       );
     }else{
      return <HomeNavigator/>
     }
  };
  return <NavigationContainer>{navigatorHandler()}</NavigationContainer>;
};

export default MainNavigator;
