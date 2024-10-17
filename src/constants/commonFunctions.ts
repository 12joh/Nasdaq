export {
  heightPercentageToDP as perfectHeight,
  widthPercentageToDP as perfectWidth,
} from "react-native-responsive-screen";
export { RFValue as perfectFont } from "react-native-responsive-fontsize";
// import messaging from "@react-native-firebase/messaging";
import { Alert, I18nManager, Platform } from "react-native";
import { store } from "../redux/store";
import { RESET_ERRORS } from "../constants/actionTypes";


// export const requestPushNotificationPermission = async (): Promise<boolean> => {
//   if (Platform.OS === "ios") {
//     const authStatus = await messaging().requestPermission();
//     return (
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL
//     );
//   } else {
//     return true;
//   }
// };

// export const getFCMToken = async (): Promise<String> => {
//   return await messaging().getToken();
// };

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const handleErrorAlert = ({
  errorTitle,
  errorMessage,
}: {
  errorTitle?: string;
  errorMessage: string;
}) => {
  Alert.alert(
    errorTitle || "FAILED",
    errorMessage,
    [
      {
        text: "OK",
        onPress: () => {
          store.dispatch({
            type: RESET_ERRORS,
          });
        },
      },
    ],
    { cancelable: false }
  );
};

export const PromptAlert = ({
  errorTitle,
  errorMessage,
}: {
  errorTitle: string;
  errorMessage: string;
}) => {
  Alert.alert(
    errorTitle,
    errorMessage,
    [
      {
        text: "OK",
        onPress: () => {},
      },
    ],
    { cancelable: false }
  );
};



