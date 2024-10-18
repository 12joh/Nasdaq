import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkLink = (link: string) => {
  if (link != undefined) {
    if (link.includes('https://')) {
      return link;
    } else {
      return 'https://' + link;
    }
  }
};
