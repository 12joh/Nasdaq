import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
// THE hEADER IS THE ELEMENT SHOWN IN THE HOME PAGE
const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/headerLogo/headerLogo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.header,
    height: '100%',
    flexDirection: 'row',
  },
  logo: {
    left: '5%',
    width: '30%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Header;
