import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { auth } from "../../firebase";
import { db } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  async function handleSumbite(e) {
    e.preventDefault();
    try {
      setError("");
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {
            db.collection("users")
              .doc(auth.user.uid)
              .set({
                email: email,
                firstName: firstName,
                lastName: lastName,
              })
              .then(() => {
                navigation.navigate("login");
              });
          }
        });
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setError(`Password is Invalid`);
          break;

        case "auth/invalid-email":
          setError(`Email is Invalid`);
          break;
        case "auth/email-already-exists":
          setError(`Email already Exists`);
          break;
        case "auth/weak-password":
          setError(`Password must be more than 6 characters`);
          break;

        default:
          setError(`Please Valid Your Data`);
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text>WUZZUF</Text>
      </View>
      <View style={styles.welcome}>
        <Text> Sign Up and Start Appling For Jobs</Text>
      </View>
      <View
        style={{
          borderBottomColor: "rgb(209, 201, 201)",
          borderBottomWidth: 1,
          marginBottom: 30,
        }}
      />
      <View style={styles.inputContainer}>
        <Text
          style={{
            fontWeight: "bold",
            color: "red",
            fontSize: 15,
            marginBottom: 3,
            marginTop: 5,
          }}
        >
          {error}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "rgb(39, 38, 38)",
            fontSize: 15,
            marginBottom: 3,
          }}
        >
          First Name
        </Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <Text
          style={{
            fontWeight: "bold",
            color: "rgb(39, 38, 38)",
            fontSize: 15,
            marginBottom: 3,
            marginTop: 10,
          }}
        >
          Last Name
        </Text>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
        <Text
          style={{
            fontWeight: "bold",
            color: "rgb(39, 38, 38)",
            fontSize: 15,
            marginBottom: 3,
            marginTop: 10,
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text
          style={{
            fontWeight: "bold",
            color: "rgb(39, 38, 38)",
            fontSize: 15,
            marginBottom: 3,
            marginTop: 10,
          }}
        >
          Password
        </Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View
        style={{
          marginBottom: 15,
        }}
      >
        <Button onPress={handleSumbite} title="Sign up" color="blue" />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontFamily: "Open Sans,sans-serif",
          marginBottom: 10,
          fontWeight: "bold",
          color: "black",
        }}
      >
        Already on WUZZUF?{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.replace("login")}
        >
          Sign in
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontFamily: "Open Sans,sans-serif",
    fontWeight: "bolder",
    marginBottom: 10,
    color: "rgb(9, 9, 209)",
  },
  welcome: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontFamily: "Open Sans,sans-serif",
    marginBottom: 10,
    color: "black",
  },
  container: {
    margin: 20,
  },
  input: {
    backgroundColor: "rgb(231, 227, 227)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderColor: "rgb(199, 195, 195)",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontFamily: "Open Sans,sans-serif",
  },
});
