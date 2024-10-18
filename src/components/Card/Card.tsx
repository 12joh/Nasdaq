import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

// THE CARD IS THE ELEMENT SHOWN IN THE HOME PAGE
const Card = ({mainText, subText}: {mainText: string; subText: string}) => {
  const firstTwoLetters: string = mainText.substring(0, 2).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.box}>
        <Text style={styles.boxText}>{firstTwoLetters}</Text>
      </View>
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={styles.subText} numberOfLines={1}>
        {subText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '46%',
    marginBottom: 20,
    height: 150,
  },
  box: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: colors.iconBackground,
    borderWidth: 3,
    marginBottom: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 3,
  },
  mainText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  subText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Card;
