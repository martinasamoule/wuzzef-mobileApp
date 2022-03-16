import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  Box,
  VStack,
  Heading,
  Image,
  Stack,
  Button,
  HStack,
  AspectRatio,
  Icon,
  Badge,
} from "native-base";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import explor from "../../services/explore";
export default function JobDtails({ route, navigation }) {
  const jobId = route.params.jobId;
  const companyId = route.params.companyId;
  const [jobDetails, setjobrDetails] = useState({});
  const getSinglePage = () => {
    navigation.navigate({
      name: "applaytojob",
      params: {
        jobId: jobId,
        companyId: companyId,
      },
    });
  };
  const loadingdetails = () => {
    explor
      .getSingleJob(companyId, jobId)
      .then((response) => {
        setTimeout(() => {
          setjobrDetails(response);
        }, 100);
      })
      .catch((error) => {
        console.log("Error occured while fetching the menu item. " + error);
      });
  };
  useEffect(() => {
    loadingdetails();
  }, []);
  return (
    <>
      <Box borderColor="coolGray.200" borderWidth="1" style={{ margin: 10 }}>
        <Box bg="white" overflow="hidden">
          <HStack space={2} justifyContent="space-between">
            <Box>
              <Image
                source={{
                  uri: jobDetails.logo,
                }}
                alt={jobDetails.companyName}
                size="md"
              />
            </Box>
            <Box>
              <HStack pt="2" px="2">
                <Button
                  variant="subtle"
                  colorScheme="muted"
                  leftIcon={
                    <Icon
                      as={Ionicons}
                      name="bookmark-outline"
                      size="sm"
                      color="muted.600"
                    />
                  }
                ></Button>
                <Button
                  variant="subtle"
                  colorScheme="muted"
                  mx="1"
                  leftIcon={
                    <Icon
                      as={MaterialCommunityIcons}
                      name="share-outline"
                      size="sm"
                      color="muted.600"
                    />
                  }
                ></Button>
              </HStack>
            </Box>
          </HStack>

          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {jobDetails.jobTitle}
              </Heading>
              <Badge
                colorScheme="light.400"
                bg="light.200"
                width={85}
                height={7}
              >
                <Text fontSize="md">{jobDetails.jobType}</Text>
              </Badge>
              <Text fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
                <Text color="blue.700"> {jobDetails.companyName} -</Text>
                {jobDetails.companyCountry}
              </Text>
            </Stack>

            <HStack alignItems="center">
              <Button colorScheme="blue" width={"100%"} onPress={getSinglePage}>
                Apply For Job
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Box>
      <Box
        borderColor="coolGray.200"
        borderWidth="1"
        bg="white"
        style={{ margin: 10, padding: 10 }}
      >
        <Text fontWeights="black" pb="3" px="2">
          <Heading fontSize="sm"> job Details</Heading>
        </Text>
        <Box pb="1" px="4">
          <Text fontWeights="black">
            <Heading fontSize="sm"> Experience Needed : </Heading>
            {jobDetails.experience}
          </Text>
          <Text>
            <Heading fontSize="sm"> Career Level : </Heading>
            {jobDetails.experience}
          </Text>
          <Text>
            <Heading fontSize="sm"> Education Level : </Heading>
            {jobDetails.educationLevel}
          </Text>
          <Text>
            <Heading fontSize="sm"> salary: </Heading>
            {jobDetails.salary}
          </Text>
          <Text>
            <Heading fontSize="sm">Job Categories: </Heading>
            {jobDetails.jobCategories}
          </Text>
        </Box>
      </Box>
      <Box
        borderColor="coolGray.200"
        borderWidth="1"
        bg="white"
        style={{ margin: 10, padding: 10 }}
      >
        <Text fontWeights="black" pb="3" px="2">
          <Heading fontSize="sm"> Job Description</Heading>
        </Text>
        <Box pb="1" px="4">
          <Text fontWeights="black">{jobDetails.jobDescription}</Text>
        </Box>
      </Box>
      <Box
        borderColor="coolGray.200"
        borderWidth="1"
        bg="white"
        style={{ margin: 10, padding: 10 }}
      >
        <Text fontWeights="black" pb="3" px="2">
          <Heading fontSize="sm"> Job Requirements</Heading>
        </Text>
        <Box pb="1" px="4">
          <Text fontWeights="black">{jobDetails.jobRequirements}</Text>
        </Box>
      </Box>
    </>
  );
}
