// components/PlanetItem.js
import React, {forwardRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';

const LottiePlanet = forwardRef(({onPress, animation, universe}, ref) => {
  const alignments = ['flex-start', 'center', 'flex-end'];
  const randomAlign = alignments[Math.floor(Math.random() * alignments.length)];
  const randomSize = 120 + Math.random() * 20;
  const randomMargin = 10 + Math.random() * 20;

  return (
    <View
      style={[
        styles.wrapper,
        {
          alignSelf: randomAlign,
          margin: randomMargin,
        },
      ]}>
      <TouchableOpacity ref={ref} onPress={onPress} activeOpacity={0.8}>
        <LottieView
          source={animation}
          autoPlay
          loop
          style={{width: randomSize, height: randomSize}}
        />
        <Text style={{fontWeight: '700', color: 'white', alignSelf: 'center'}}>
          {universe}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LottiePlanet;
