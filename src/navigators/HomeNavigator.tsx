import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import { HOME_SCREEN } from "./routes";
import Home from "../modules/home/home";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
    <Stack.Screen name={HOME_SCREEN} component={Home} />
     
    </Stack.Navigator>
  );
};

export default HomeNavigator;
