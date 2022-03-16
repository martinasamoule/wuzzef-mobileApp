import Card from "./../savedCard";
import React, { useEffect, useState, useContext } from "react";
import { Box, FlatList, Text } from "native-base";
import savejob from "../../services/savejob";

export default function Saved(props) {
  const [save, setInfoSave] = useState([]);

  const loadsavedjobs = () => {
    savejob
      .getSavedJob()
      .then((response) => {
        setTimeout(() => {
          setInfoSave(response);
        }, 100);
      })
      .catch((error) => {
        console.log("Error  " + error);
      });
  };
  console.log(save);

  useEffect(() => {
    console.log(save);

    loadsavedjobs();
    console.log(save);
  }, []);
  return (
    <Box>
      {save.length > 0 ? (
        <FlatList
          data={save}
          renderItem={({ item }) => <Card item={item} {...props} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Box style={{ padding: 10, margin: 20 }}>
          <Text fontSize="md" fontWeights="black">
            No saved item
          </Text>
        </Box>
      )}
    </Box>
  );
}
