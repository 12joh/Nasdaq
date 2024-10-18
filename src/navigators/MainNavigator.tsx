import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {StoreType} from '../redux/store/StoreType';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import HomeNavigator from './HomeNavigator';
import {colors} from '../theme/colors';

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  // THIS USEEFFECT IS USED TO SET A TMER FOR THE SPLASH SCREEN
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const navigatorHandler = () => {
    if (isLoading) {
      return (
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/Logo/Logo.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>John Samy Samir</Text>
        </View>
      );
    } else {
      return <HomeNavigator />;
    }
  };
  return <NavigationContainer>{navigatorHandler()}</NavigationContainer>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
    resizeMode: 'contain',
  },
  text: {
    color: colors.white,
    alignSelf: 'center',
    bottom: '-10%',
    fontSize: 16,
  },
});

export default MainNavigator;
