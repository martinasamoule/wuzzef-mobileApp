import React, { useEffect } from "react";
import { auth } from "../../firebase"
import { Text, View, TouchableOpacity } from 'react-native'

import {
  Box
} from "native-base";

export default function Profile() {

  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      console.log(user.uid);
    })
  })


  return(
    <View>
      <Text>text</Text>
    </View>
  )
};