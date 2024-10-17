import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_LOCAL_STORAGE } from "../constants";

export const setLoginDataInAsyncStorage = async ({
  token,
}: {
  token: string;
}) => {
  await AsyncStorage.setItem(USER_TOKEN_LOCAL_STORAGE, token);
};

export const checkLink = (link: string) => {
  if(link != undefined){
  if (link.includes("https://")) {
    return link;
  } else {
    return "https://" + link;
  }
}
};
