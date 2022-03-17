import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Center,
  Image,
  Button,
  HStack,
  Icon,
  Badge
} from "native-base";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import savejob from "../../services/savejob";
export default function Card({ item, navigation }) {
  const [save, setSave] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React"
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const savedJob = () => {
    savejob
      .addJobtoSavedPage(item.data)
      .then(() => {
        setSave(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSinglePage = () => {
    console.log("", item.id, item.companyId, navigation);
    navigation.navigate({
      name: "JobDtails",
      params: {
        jobId: item.id,
        companyId: item.companyId
      }
    });
  };
  return (
    <Box
      bg="white"
      borderColor="coolGray.200"
      borderWidth="1"
      style={{ margin: 10 }}
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg"
      }}
    >
      <Box bg="white" style={{ padding: 10 }}>
        <VStack space="4">
          <HStack space={2} justifyContent="space-between">
            <Box>
              <Text fontSize="md" onPress={getSinglePage} color="blue.700">
                {item?.data.jobTitle}
              </Text>

              <Text fontSize="md">{item?.data.jobType}</Text>
              <HStack space={2}>
                <Text fontSize="md" fontWeights="black">
                  {item?.data.companyName} -
                </Text>
                <Text fontSize="md" color="light.500">
                  {item?.data.companyCountry}
                </Text>
              </HStack>
            </Box>
            <Center>
              <Image
                source={{
                  uri: item?.data.logo
                }}
                alt={item?.data.companyName}
                size="sm"
              />
            </Center>
          </HStack>
          <VStack color="light-400">
            <Text>
              {item?.data.careerLevel} , {item?.data.jobCategories}
            </Text>
            <Text>
              {item?.data.companyIndustry} , {item?.data.experience}
            </Text>
          </VStack>
          <HStack
            px="4"
            space={3}
            justifyContent="space-between"
            borderTopColor="light.200"
            borderTopWidth="1"
          >
            <Button
              variant="ghost"
              colorScheme="light.100"
              onPress={savedJob}
              leftIcon={
                <Icon
                  as={Ionicons}
                  name="bookmark-outline"
                  size="sm"
                  color="muted.500"
                />
              }
            >
              Save
            </Button>
            <Button
              variant="ghost"
              colorScheme="light.100"
              onPress={onShare}
              leftIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  name="share-outline"
                  size="sm"
                  color="muted.500"
                />
              }
            >
              Share
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
