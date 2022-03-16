import React from "react";
import {
  Box,
  Button
} from "native-base";
export default function  Login (props) 
 {
    //  console.log(props.navigation)
    return <Box>
        <Box alignSelf="center" bg="primary.500" _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "black",
        letterSpacing: "lg"
      }}>
          login
        </Box>
        
      <Button onPress={()=>{props.navigation.navigate('MainLayout')}}>Go to mainlayout</Button>
      </Box>;
  };