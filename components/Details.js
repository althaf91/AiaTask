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
import {SharedElement} from 'react-navigation-shared-element';
import NavigationService from '../NavigationService';

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

const Details = props => {
  const {item} = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: 'lightblue',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          position: 'absolute',
          top: 60,
          left: 20,
          zIndex: 1000,
          shadowOffset: {
            width: 25,
            height: -25,
          },
          transform: [{rotate: '180deg'}],
        }}>
        <TouchableOpacity onPress={() => NavigationService.pop()}>
          <Image
            style={{width: 25, height: 25, resizeMode: 'contain'}}
            source={require('../assets/rightArrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        <SharedElement id={`item.${item.id}.head`}>
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
          <SharedElement id={`item.${item.id}.title`}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                width: 170,
                lineHeight: 25,
              }}>
              {item.title}
            </Text>
          </SharedElement>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Details;
