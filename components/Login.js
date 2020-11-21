import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import NavigationService from '../NavigationService';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onLogin = () => {
    if (email.length == 0 && password.length == 0) {
      Alert.alert('Please enter all the fields');
    } else if (!ValidateEmail()) {
      Alert.alert('Email Not Valid');
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          database()
            .ref('users/' + res.user.uid)
            .once('value')
            .then(function(snapshot) {
              let updatedUser = snapshot.val();
              dispatch({type: 'UPDATE_USER', payload: updatedUser.account});
              console.log('User login successfully!');
              setEmail('');
              setPassword('');

              NavigationService.navigate('Home');
            });
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    }
  };

  const ValidateEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
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
          <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
            <Text style={{color: '#ffffff', fontSize: 18}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            Style={styles.register}
            onPress={() => NavigationService.navigate('Register')}>
            <Text style={{fontSize: 18}}>Click here for Register</Text>
          </TouchableOpacity>
        </View>
      )}
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
  register: {
    alignSelf: 'center',
  },
});

export default Login;
