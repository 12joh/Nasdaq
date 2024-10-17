


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const Card = ({ mainText, subText} : {mainText : string, subText : string}) => {
  const firstTwoLetters = mainText.substring(0, 2).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.box}>
        <Text style={styles.boxText}>{firstTwoLetters}</Text>
      </View>
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={styles.subText}>{(subText?.length >= 30?
           subText?.slice(0, 30) + "..."
            : subText)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.black, 
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%', 
    marginBottom: 20,
    height: 150,
  },
  box: {
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  subText: {
    color: 'white',
    fontSize: 14,
    textAlign:'center'
  },
});

export default Card;
