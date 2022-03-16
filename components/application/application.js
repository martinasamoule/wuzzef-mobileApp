import React from "react";
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
  Divider
} from "native-base";
import Card from "../card/index";
import  { useEffect, useState } from "react";
import app from '../../firebase';
const db = app.firestore();
export default function  Application (props) 
 {  
  const [applicationLength, setapplicationLength] = useState(0);
  const [appliction, setappliction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadApplication() {
  const jobdata = db.collection('users').doc(localStorage.getItem("uid")).collection('applicion');
  const querySnapshot = await jobdata.get();
  setapplicationLength(querySnapshot.docs.length);
  // console.log(querySnapshot.docs[0].data())
  if(querySnapshot.docs.length>0)
  {
    setIsLoading(false);
  }
  else if(querySnapshot.docs.length==0)
  {
    setIsLoading(false);
  }
  setappliction(
    querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data()
    }))
  );
}
useEffect(() => {

  loadApplication();
}, []);
    return (
    <VStack space={1} mt="5" >
        <Text bold fontSize="3xl" mx="3">Applications({applicationLength})</Text>
        <Divider bg="rgb(9, 9, 209)" thickness="3" mx="2" w="220" mb="2"/>
        {applicationLength==0?
        <Text  fontSize="2xl"  mt="20" alignSelf="center">No applications yet !!</Text>:
        <FlatList data={appliction} renderItem={({ item }) => <Card item={item}/>}
        keyExtractor={(item) => item.id}/>
 }      
    </VStack>
      );
  };