import { Box, Text, FlatList , Input , VStack , SearchIcon} from "native-base";
import Card from "./../card";
import React, { useEffect, useState, useContext } from "react";
import explor from "../../services/explore";

export default function Explore(props) {
  const [jobItems, setJobItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm , setSearchTerm] = useState('');

  const search =(text)=>
  {
    setSearchTerm(text)
    console.log(text)
  };

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
      <VStack w="100%" space={5} alignItems="center">
        <Input placeholder="Search for jobs " width="50%" borderRadius="7" py="3" px="1" fontSize="14"
         InputRightElement={<SearchIcon size="4" px="5" /> } onChangeText={search}/>
      </VStack>
      <FlatList
        data={jobItems.filter((item)=>{
          if (searchTerm === "")
          {
            return item ;
          }
             if(item.data.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
          {
            return item ;
          }
        })}
        renderItem={({ item }) => <Card item={item} {...props} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
