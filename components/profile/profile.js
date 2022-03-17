import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Spacer,
  Text,
  VStack,
  HStack,
  Badge,
  Flex,
  FlatList,
  Avatar,
<<<<<<< HEAD
  Divider
} from "native-base";
import { Card, Button, Icon } from "react-native-elements";
import { auth, db } from "../../firebase";
=======
  Divider,
  Button
} from "native-base";
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { auth, db } from "../../firebase"
>>>>>>> 3e0af1152a7f7e1b2faca46d3dcdfc2433df88f8

export default function Application() {
  const [currentUser, setCurrentUser] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const navigation = useNavigation()
  async function handleSignOut() {
    try {
      await auth
      .signOut().then(() => {
        localStorage.removeItem("uid");
        navigation.navigate("login")
    
      });
    } catch {
      console.log("faile to logout");
    }
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(auth.currentUser);
      return unsubscribe;
    });
  }, []);

  //current user
  useEffect(() => {
    if (currentUser) {
      let userId = currentUser.uid;
      db.collection("users")
        .doc(userId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUserDetails(snapshot.data());
          }
        });
      console.log(userId);
    }
  }, [currentUser]);

  console.log(userDetails);
  return (
    <>
      <VStack space={1} mt="5">
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: "gray.600"
          }}
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2"
        >
          <HStack space={3} justifyContent="space-between">
            <Avatar
              size="48px"
              source={{
                uri: userDetails.imageUrl
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50"
                }}
                color="coolGray.800"
                bold
              >
                {`${userDetails.firstName}  ${userDetails.lastName}`}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200"
                }}
              >
                {userDetails.title}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </VStack>
      <ScrollView>
        <Card containerStyle={{ marginTop: 15, backgroundColor: "#F7F9FF" }}>
          <Card.Title>Genral Info</Card.Title>
          <Card.Divider />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>birthDate:</Text>
            <Text style={{ display: "inline" }}>
              {userDetails.birthDate?`${userDetails.birthDate?.day} ${userDetails.birthDate?.month} ${userDetails.birthDate?.year}`:""}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>gender:</Text>
            <Text style={{ display: "inline" }}>{userDetails?.gender}</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>Marital Status:</Text>
            <Text style={{ display: "inline" }}>
              {userDetails?.maritalStatus}
            </Text>
          </View>

<<<<<<< HEAD
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>Military Status:</Text>
=======
          {userDetails?.gender!="female"?<View style={{ display: "flex", flexDirection: "row", paddingVertical: "7px" }}>
            <Text style={styles.boldText}>
              Military Status:
            </Text>
>>>>>>> 3e0af1152a7f7e1b2faca46d3dcdfc2433df88f8
            <Text style={{ display: "inline" }}>
              {userDetails?.militarySatus}
            </Text>
          </View>:""}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>Driving License:</Text>
            <Text style={{ display: "inline" }}>
              {userDetails?.drivingLicense}
            </Text>
          </View>
        </Card>

        <Card containerStyle={{ marginTop: 15, backgroundColor: "#F7F9FF" }}>
          <Card.Title>Contact Info</Card.Title>
          <Card.Divider />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>Email</Text>
            <Text style={{ display: "inline" }}>{userDetails?.email}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>Mobile</Text>
            <Text style={{ display: "inline" }}>{userDetails?.mobile}</Text>
          </View>
<<<<<<< HEAD
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingVertical: "7px"
            }}
          >
            <Text style={styles.boldText}>Alternative Mobile</Text>
            <Text style={{ display: "inline" }}>{userDetails?.altMobile}</Text>
          </View>
=======
          {userDetails?.altMobile?<View style={{ display: "flex", flexDirection: "row", paddingVertical: "7px" }}>
            <Text style={styles.boldText}>
              Alternative Mobile
            </Text>
            <Text style={{ display: "inline" }}>
              {userDetails?.altMobile}
            </Text>
          </View>:""}
>>>>>>> 3e0af1152a7f7e1b2faca46d3dcdfc2433df88f8
        </Card>
        <View
        style={{
          marginBottom: 15,
          marginTop: 20,
          alignItems:"center"
        }}
      >
        <Button onPress={handleSignOut}  color="rgb(7, 7, 143)" w="20%">
          Logout
        </Button>
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fonts: {
    marginBottom: 8
  },
  user: {
    flexDirection: "row",
    marginBottom: 6
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  name: {
    fontSize: 16,
    marginTop: 5
  },
  boldText: {
    color: "#4D6182",
    fontWeight: "bold",
    marginEnd: "5px"
  }
});
