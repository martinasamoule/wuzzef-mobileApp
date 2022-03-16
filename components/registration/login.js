
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View,Button } from 'react-native'
import { auth } from '../../firebase'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()




  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError("");
      await auth
        .signInWithEmailAndPassword(email, password).then(
          (auth) => {
            localStorage.setItem("uid", auth.user.uid);
            navigation.navigate('MainLayout')
          }
        );

    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setError(`Password is Invalid`);
          break;
        case "auth/invalid-email":
          setError(`Email is Invalid`);
          break;
        default:
          setError(`Please Valid your Data`);
      }
    }
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.header}>WUZZUF</View>
      <View style={styles.welcome}>Welcome Back</View>
      <View
        style={{
          borderBottomColor: 'rgb(209, 201, 201)',
          borderBottomWidth: 1,
          marginBottom: 30
        }}
      />
      <View style={styles.inputContainer}>
        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 15, marginBottom: 3, marginTop: 5 }}>{error}</Text>
        <Text style={{ fontWeight: 'bold',color:'rgb(39, 38, 38)', fontSize: 15, marginBottom: 3 }}>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Text style={{ fontWeight: 'bold',color:'rgb(39, 38, 38)', fontSize: 15, marginBottom: 3, marginTop: 10 }}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={{
        marginBottom: 15
      }}>
        <Button
          onPress={handleLogin}
          title="Sign in"
          color="rgb(7, 7, 143)"
        />
      </View>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: 'Open Sans,sans-serif',
        marginBottom: 10,
        fontWeight: "bold",
        color: "black",
      }}>New To WUZZUF? <Text style={{ color: 'blue' }}
        onPress={() => navigation.replace("sign-up")}>
          Join now
        </Text></View>
    </KeyboardAvoidingView>



  )
}

export default Login

const styles = StyleSheet.create({
  header: {

    fontSize: 40,
    fontFamily: 'Open Sans,sans-serif',
    fontWeight: "bolder",
    marginBottom: 10,
    color: "rgb(9, 9, 209)",


  },
  welcome: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontFamily: 'Open Sans,sans-serif',
    marginBottom: 10,
    color: "black",


  },
  container: {
    margin: 20
  },
  input: {
    backgroundColor: 'rgb(231, 227, 227)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderColor: 'rgb(199, 195, 195)',

  },
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontFamily: 'Open Sans,sans-serif',
  }
})
