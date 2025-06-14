import React, {useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Animated,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import PlanetItem from './components/planets';
import Planet3D from './components/planet3D';
import LottiePlanet from './components/lottiePlanet';
import LottieView from 'lottie-react-native';
import {planets} from './constants/planets';
import CurrentUniverse from './components/currentUniverse';

const spacing = 20;
const {width, height} = Dimensions.get('screen');

export default function App() {
  const [currentUniverse, setCurrentUniverse] = useState('LPU');
  const translateX = useRef(new Animated.Value(width - 100 - spacing)).current; // 60 = half of astronaut width
  const translateY = useRef(new Animated.Value(height - 140)).current;
  const [travellingTo, setTravellingTo] = useState(null);

  const planetRefs = useRef({});

  const onPlanetPress = planetId => {
    setTravellingTo(planetId);
    const ref = planetRefs.current[planetId];
    if (!ref) return;

    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      const offsetX = pageX - 40;
      const offsetY = pageY - 40;

      Animated.timing(translateX, {
        toValue: offsetX,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(translateY, {
        toValue: offsetY,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTravellingTo(null);
      });
    });
  };

  const renderItem = ({item}) => {
    const ref = React.createRef();
    planetRefs.current[item.id] = ref;
    return (
      <LottiePlanet
        ref={ref}
        onPress={() => onPlanetPress(item.id)}
        animation={item.animation}
        universe={item.universe}
        metaData={item.metaData}
      />
    );
    // return <Planet3D ref={ref} onPress={() => onPlanetPress(item.id)} />;
    // return <PlanetItem ref={ref} onPress={() => onPlanetPress(item.id)} />;
  };

  const resetAstronautPosition = () => {
    setTravellingTo(null);
    Animated.timing(translateX, {
      toValue: width - 100 - spacing,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: height - 140,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.astronaut, {transform: [{translateX}, {translateY}]}]}>
        <LottieView
          source={require('./assets/astronaut.json')}
          autoPlay
          loop
          style={{width: 100, height: 100}}
        />
      </Animated.View>
      <TextInput
        placeholder="Search universe"
        style={styles.input}
        placeholderTextColor={'white'}
        cursorColor={'white'}
      />
      <FlatList
        data={planets.filter(e => e.universe !== currentUniverse)}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <CurrentUniverse
        universe={currentUniverse}
        resetAstronautPosition={resetAstronautPosition}
        travellingTo={travellingTo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  astronaut: {
    position: 'absolute',
    zIndex: 2,
  },
  list: {
    padding: spacing,
  },
  input: {
    marginHorizontal: spacing,
    height: 60,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: spacing,
    paddingHorizontal: spacing,
    fontWeight: '600',
    color: 'white',
  },
});
