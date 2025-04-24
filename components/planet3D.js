// components/PlanetItem.js
import React, {useEffect, useRef, forwardRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Circle, Ellipse} from 'react-native-svg';

const Planet3D = forwardRef(({onPress}, ref) => {
  const wobble = useRef(new Animated.Value(0)).current;

  const alignments = ['flex-start', 'center', 'flex-end'];
  const randomAlign = alignments[Math.floor(Math.random() * alignments.length)];
  const randomSize = 60 + Math.random() * 20;
  const randomMargin = 10 + Math.random() * 20;
  const initialRotate = Math.random() * 20 - 10;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wobble, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(wobble, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        rotate: wobble.interpolate({
          inputRange: [0, 1],
          outputRange: [`${initialRotate - 4}deg`, `${initialRotate + 4}deg`],
        }),
      },
      {
        scale: wobble.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.03],
        }),
      },
    ],
    alignSelf: randomAlign,
    margin: randomMargin,
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <TouchableOpacity ref={ref} onPress={onPress} activeOpacity={0.8}>
        <Svg height={randomSize} width={randomSize}>
          {/* Main Planet Body */}
          <Circle
            cx={randomSize / 2}
            cy={randomSize / 2}
            r={randomSize / 2}
            fill="#4fc3f7"
          />

          {/* Light highlight for a faux-3D feel */}
          <Ellipse
            cx={randomSize * 0.35}
            cy={randomSize * 0.35}
            rx={randomSize * 0.12}
            ry={randomSize * 0.08}
            fill="rgba(255,255,255,0.3)"
          />

          {/* Craters */}
          <Circle
            cx={randomSize * 0.6}
            cy={randomSize * 0.5}
            r={randomSize * 0.07}
            fill="#3aacc5"
          />
          <Circle
            cx={randomSize * 0.7}
            cy={randomSize * 0.7}
            r={randomSize * 0.05}
            fill="#3aacc5"
          />
        </Svg>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Planet3D;
