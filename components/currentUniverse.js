import {useState} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, Dimensions, Text, Pressable} from 'react-native';
import {planets} from '../constants/planets';

const {width, height} = Dimensions.get('screen');
const SPACING = 12;

export default function CurrentUniverse({
  universe,
  resetAstronautPosition,
  travellingTo,
}) {
  const [activePlanet, setActivePlanet] = useState(
    planets.filter(e => e.universe === universe)[0],
  );
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <View>
            <Text style={styles.t2}>Stationed at: LPU(native)</Text>
            <Text style={[styles.t2, {marginTop: SPACING / 2}]}>
              Universe rank: 745
            </Text>
          </View>
          <View style={[styles.row, styles.box]}>
            <Text style={[styles.t2, {fontSize: 14}]}>10</Text>
            <LottieView
              source={require('../assets/star.json')}
              autoPlay
              loop
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <Pressable
          style={({pressed}) => [pressed && {opacity: 0.6}, styles.row]}
          onPress={resetAstronautPosition}>
          <View style={{width: '50%'}}>
            <LottieView
              source={activePlanet.animation}
              autoPlay
              loop
              style={{width: 120, height: 120}}
            />
          </View>
          <View style={{width: '50%'}}>
            {travellingTo && (
              <View>
                <Text
                  style={[
                    styles.t2,
                    {position: 'absolute', top: 2 * SPACING, fontSize: 12},
                  ]}>
                  Travelling to{' '}
                  {planets.filter(p => p.id === travellingTo)[0].universe}
                </Text>
                <LottieView
                  source={require('../assets/planet_loader.json')}
                  autoPlay
                  loop
                  style={{width: 120, height: 120}}
                />
              </View>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 2 * SPACING,
    height: 180,
    borderRadius: 2 * SPACING,
    borderWidth: 1.5,
    borderColor: 'white',
    marginLeft: SPACING,
    padding: SPACING,
  },
  t2: {
    fontWeight: '600',
    color: 'white',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    padding: 3,
    paddingHorizontal: SPACING / 2,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: SPACING,
  },
});
