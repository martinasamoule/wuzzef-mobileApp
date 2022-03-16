import React from "react";
import {
  Box
} from "native-base";
export default function  Application () 
 {
    return <Box>
        <Box alignSelf="center" bg="primary.500" _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg"
      }}>
          application
        </Box>
      </Box>;
  };