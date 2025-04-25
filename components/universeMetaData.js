import LottieView from 'lottie-react-native';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const SPACING = 12;
const {width, height} = Dimensions.get('screen');

export default function UniverseMetaData({universe, metaData}) {
  function formatNumber(num) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + ' K';
    }
    return num.toString();
  }
  console.log('D', metaData);
  return (
    <View style={styles.metaBox}>
      <Text numberOfLines={1} style={styles.t2}>
        {metaData.fullName}
      </Text>
      <View style={styles.row}>
        <Text style={[styles.t3]}>{metaData.location}</Text>
      </View>
      <View style={[styles.row, {marginTop: SPACING}]}>
        <View style={[styles.row, styles.box]}>
          <Text style={[styles.t2, {fontSize: 14, marginRight: 3}]}>
            {metaData.travleFare}
          </Text>
          <LottieView
            source={require('../assets/star.json')}
            autoPlay
            loop
            style={{width: 30, height: 30}}
          />
        </View>
        <View style={[styles.row, styles.box]}>
          <Text style={[styles.t2, {fontSize: 14, marginRight: 3}]}>
            {metaData.rank}
          </Text>
          <LottieView
            source={require('../assets/rank.json')}
            autoPlay
            loop
            style={{width: 30, height: 30}}
          />
        </View>
        <View style={[styles.box]}>
          <Text style={[styles.t2, {fontSize: 14}]}>
            {formatNumber(metaData.activeUsers)} traffic
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  metaBox: {
    maxWidth: width - 2 * SPACING,
    height: 120,
    borderRadius: SPACING,
    borderWidth: 1,
    borderColor: 'white',
    padding: SPACING,
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  t2: {
    fontWeight: '600',
    color: 'white',
    maxWidth: width - 4 * SPACING,
  },
  t3: {
    fontWeight: '500',
    fontSize: 12,
    color: 'white',
  },
  box: {
    padding: 3,
    paddingHorizontal: SPACING / 2,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: SPACING,
    alignSelf: 'flex-start',
    marginRight: SPACING / 2,
  },
});
