import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Anima,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import datalist from '../data';
import NavigationService from '../NavigationService';

const Item = ({item, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      height: 100,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      width: '95%',
      alignSelf: 'center',
      margin: 10,
    }}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <SharedElement id={`item.${item.id}.head`}>
          <Image
            style={{width: 80, height: 80, resizeMode: 'contain'}}
            source={require('../assets/assement.png')}
          />
        </SharedElement>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <SharedElement id={`item.${item.id}.title`}>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {item.title}
          </Text>
        </SharedElement>
        <View>
          <Text style={{color: 'gray'}}>Earn up to</Text>
          <Text style={{color: 'gray'}}>
            <Text style={{color: 'lightgreen', fontWeight: 'bold'}}>
              {item.maximumPoint}
            </Text>
            {' pts'}
          </Text>
        </View>
      </View>
      <View style={{marginRight: 15, alignSelf: 'flex-end'}}>
        <Image
          style={{width: 30}}
          source={require('../assets/rightArrow.png')}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const CardList = () => {
  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          NavigationService.push('Details', {item});
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={datalist}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default CardList;
