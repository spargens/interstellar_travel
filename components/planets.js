// components/planets.js
import React, {useEffect, useRef, forwardRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';

const PlanetItem = forwardRef(({onPress}, ref) => {
  const wobble = useRef(new Animated.Value(0)).current;

  // Random values per render
  const horizontalAlignments = ['flex-start', 'center', 'flex-end'];
  const randomAlign = horizontalAlignments[Math.floor(Math.random() * 3)];
  const randomSize = 50 + Math.floor(Math.random() * 20); // 50 to 70
  const randomMargin = 10 + Math.floor(Math.random() * 20); // 10 to 30
  const initialRotate = Math.floor(Math.random() * 20) - 10; // -10deg to 10deg

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wobble, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(wobble, {
          toValue: 0,
          duration: 700,
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
          outputRange: [`${initialRotate - 3}deg`, `${initialRotate + 3}deg`],
        }),
      },
      {
        scale: wobble.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.04],
        }),
      },
    ],
    margin: randomMargin,
    width: randomSize,
    height: randomSize,
  };

  const highlightSize = randomSize * 0.25;

  return (
    <Animated.View
      style={[styles.wrapper, animatedStyle, {alignSelf: randomAlign}]}>
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[
          styles.planet,
          {
            width: randomSize,
            height: randomSize,
            borderRadius: randomSize / 2,
          },
        ]}>
        <View
          style={[
            styles.highlight,
            {
              width: highlightSize,
              height: highlightSize,
              borderRadius: highlightSize / 2,
            },
          ]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  planet: {
    backgroundColor: '#4fc3f7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  highlight: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    top: 10,
    left: 10,
  },
});

export default PlanetItem;
