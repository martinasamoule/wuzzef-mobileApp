import { Box, Text, FlatList } from "native-base";
import Card from "./../card";
import React, { useEffect, useState, useContext } from "react";
import explor from "../../services/explore";

export default function Explore(props) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    explor
      .getAlljobs()
      .then((response) => {
        setJobItems(response);

        console.log(response);

        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);

        console.log("Error  " + error);
      });
  }, []);
  return (
    <>
      <Text px="1" color="blue.700" style={{ margin: 10 }}>
        Explore New Career Opportunities
      </Text>
      <FlatList
        data={jobItems}
        renderItem={({ item }) => <Card item={item} {...props} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
