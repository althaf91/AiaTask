import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {SharedElement} from 'react-native-shared-element';

const DetailItem = ({value, head, icon}) => {
  return (
    <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
      <Image
        style={{
          width: 30,
          height: 30,
          resizeMode: 'contain',
          marginRight: 5,
        }}
        source={icon}
      />
      <View style>
        <Text
          style={{
            color: 'gray',
            fontWeight: 'bold',
          }}>
          {head}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const Details = ({route}) => {
  const item = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SharedElement id="headerIcon">
          <Image
            style={{
              backgroundColor: 'lightgray',
              width: '100%',
              height: 200,
              resizeMode: 'stretch',
            }}
            source={require('../assets/assement.png')}
          />
        </SharedElement>
      </View>
      <View style={{marginLeft: 20, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              width: 170,
              lineHeight: 25,
            }}>
            {item.title}
          </Text>
          <View
            style={{
              borderRadius: 10,
              borderColor: 'lightblue',
              borderWidth: 2,
              height: 30,
              width: 80,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 25,
                color: 'lightblue',
              }}>
              {'Online'}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 14}}>{item.subTitle}</Text>
        </View>
        <View style={{marginTop: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <DetailItem
              value={item.spendTime}
              head={'Spend approx'}
              icon={require('../assets/time.png')}
            />
            <View style={{marginRight: 40}}>
              <DetailItem
                value={item.currentPoint}
                head={'Get'}
                icon={require('../assets/add.png')}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <DetailItem
              value={item.date}
              head={'Retake for points on'}
              icon={require('../assets/calendar.png')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

Details.sharedElements = navigation => {
  return ['headerIcon'];
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Details;
