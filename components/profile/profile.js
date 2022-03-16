import React from "react";
import {
  Box
} from "native-base";
export default function  Profile () 
 {
    return <Box>
        <Box alignSelf="center" bg="primary.500" _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg"
      }}>
          profile
        </Box>
      </Box>;
  };