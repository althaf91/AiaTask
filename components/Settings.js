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
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {useDispatch} from 'react-redux';
import {getaccount} from '../reducer/index';

const Settings = () => {
  const account = useSelector(getaccount);
  const [username, setUsername] = useState(account.username);
  const dispatch = useDispatch();

  const onUpate = () => {
    if (username.length == 0) {
      Alert.alert('please enter username');
    } else {
      let userRef = database().ref('users/' + account.uid);
      userRef
        .child('account')
        .update({username: username})
        .then(() => {
          database()
            .ref('users/' + account.uid)
            .once('value')
            .then(function(snapshot) {
              let updatedUser = snapshot.val();
              dispatch({type: 'UPDATE_USER', payload: updatedUser.account});

              Alert.alert('User update successfully!');
            });
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 50}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{'User Name'}</Text>
        <TextInput
          style={styles.Input}
          type="text"
          placeholder="username"
          value={username}
          onChangeText={text => setUsername(text)}
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
