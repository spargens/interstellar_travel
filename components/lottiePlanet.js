// components/PlanetItem.js
import React, {forwardRef, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Popover from 'react-native-popover-view';
import UniverseMetaData from './universeMetaData';

const SPACING = 12;

const LottiePlanet = forwardRef(
  ({onPress, animation, universe, metaData}, ref) => {
    const [showMetaData, setShowMetaData] = useState(false);
    const alignments = ['flex-start', 'center', 'flex-end'];
    const randomAlign = useRef(
      alignments[Math.floor(Math.random() * alignments.length)],
    ).current;
    const randomSize = useRef(120 + Math.random() * 20).current;
    const randomMargin = useRef(10 + Math.random() * 20).current;

    return (
      <Popover
        isVisible={showMetaData}
        popoverStyle={{borderRadius: SPACING}}
        arrowShift={-0.3}
        onRequestClose={() => {
          setShowMetaData(false);
        }}
        from={
          <View
            style={[
              styles.wrapper,
              {
                alignSelf: randomAlign,
                margin: randomMargin,
              },
            ]}>
            <TouchableOpacity
              ref={ref}
              onPress={onPress}
              activeOpacity={0.8}
              onLongPress={() => {
                setShowMetaData(true);
              }}>
              <LottieView
                source={animation}
                autoPlay
                loop
                style={{width: randomSize, height: randomSize}}
              />
              <Text
                style={{
                  fontWeight: '700',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                {universe}
              </Text>
            </TouchableOpacity>
          </View>
        }>
        <UniverseMetaData metaData={metaData} universe={universe} />
      </Popover>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LottiePlanet;
