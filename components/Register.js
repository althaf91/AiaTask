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

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [conformEmail, setConformEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onRegister = () => {
    if (
      username.length == 0 &&
      email.length == 0 &&
      conformEmail.length == 0 &&
      password.length == 0
    ) {
      Alert.alert('Please enter all the fields');
    } else if (!ValidateEmail(email) || !ValidateEmail(conformEmail)) {
      Alert.alert('Email Not Valid');
    } else if (email !== conformEmail) {
      Alert.alert('Email and Confirmed Email not matched');
    } else {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          let account = {};
          account.email = email.toLowerCase();
          account.uid = res.user.uid;
          account.username = username;
          database()
            .ref('users/' + res.user.uid)
            .set({
              account,
            })
            .then(() => {
              // ******** Now we need to grap a snapshot from the DB to validate account creation and update the redux store locally ********
              database()
                .ref('users/' + res.user.uid)
                .once('value')
                .then(function(snapshot) {
                  let updatedUser = snapshot.val();
                  dispatch({type: 'UPDATE_USER', payload: updatedUser.account});
                  console.log('User registered successfully!');
                  setLoading(false);
                  setUsername('');
                  setEmail('');
                  setConformEmail('');
                  setPassword('');

                  NavigationService.navigate('Home');
                });
            });
        })
        .catch(error => Alert.alert(error.message));
    }
  };

  const ValidateEmail = email => {
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
            placeholder="username"
            value={username}
            onChangeText={text => setUsername(text)}
            returnKeyType="done"
          />
          <TextInput
            style={styles.Input}
            type="text"
            placeholder="email"
            value={email}
            keyboardType="email-address"
            onChangeText={text => setEmail(text.toLowerCase())}
            returnKeyType="done"
          />
          <TextInput
            style={styles.Input}
            type="text"
            placeholder="conform email"
            value={conformEmail}
            keyboardType="email-address"
            onChangeText={text => setConformEmail(text.toLowerCase())}
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
          <TouchableOpacity style={styles.loginButton} onPress={onRegister}>
            <Text style={{color: '#ffffff', fontSize: 18}}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            Style={styles.login}
            onPress={() => NavigationService.navigate('Login')}>
            <Text style={{fontSize: 18}}>Click here for Login</Text>
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
  login: {
    alignSelf: 'center',
  },
});

export default Register;
