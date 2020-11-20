import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import NavigationService from '../NavigationService';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onUpate = () => {
    if (email.length == 0 && password.length == 0) {
      Alert.alert('Please enter all the fields');
    } else if (!ValidateEmail()) {
      Alert.alert('Email Not Valid');
    } else if (password.length < 5) {
      Alert.alert('password not valid');
    } else {
      NavigationService.push('Home');
    }
  };

  const ValidateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 50}}>
        <TextInput
          style={styles.Input}
          type="text"
          placeholder="email"
          value={email}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          returnKeyType="done"
        />
        <TextInput
          style={styles.Input}
          type="text"
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.loginButton} onPress={onUpate}>
          <Text style={{color: '#ffffff', fontSize: 18}}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 20,
    alignSelf: 'center',
    paddingLeft: 0,
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  loginButton: {
    alignSelf: 'center',
    backgroundColor: '#4c669f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    borderRadius: 10,
    height: 50,
    width: 200,
  },
});

export default Settings;
