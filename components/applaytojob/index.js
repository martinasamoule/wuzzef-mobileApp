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
  Center,
  FormControl,
  TextArea,
  Input,
} from "native-base";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import appliction from "./../../services/appliction";
import explore from "../../services/explore";
export default function ApplyToJob({ route, navigation }) {
  const jobId = route.params.jobId;
  const companyId = route.params.companyId;
  const [jobDetails, setjobrDetails] = useState({});

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const loadingdetails = () => {
    explore.getSingleJob(companyId, jobId).then((job) => {
      setjobrDetails(job);
    });
  };
  useEffect(() => {
    loadingdetails();
    console.log(jobDetails);
  }, []);

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "field  is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "field   is too short" });
    } else if (formData.position === undefined) {
      setErrors({ ...errors, position: "field  is required" });
      return false;
    } else if (formData.position.length < 3) {
      setErrors({ ...errors, position: "field   is too short" });
      return false;
    } else if (formData.responsibilities === undefined) {
      setErrors({ ...errors, responsibilities: "field  is required" });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    const data = {
      userPosition: formData.name,
      userSampleWork: formData.position,
      currentPosition: formData.responsibilities,
    };
    validate()
      ? appliction
          .addApplicationJob(jobId, companyId, data, jobDetails)
          .then(() => {
            navigation.navigate({
              name: "Explore",
            });
          })
          .catch((err) => {
            console.log(err);
          })
      : alert("Please enter a valid data");
    console.log(formData.name, formData.position);
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
        letterSpacing: "lg",
      }}
    >
      <Box bg="white" style={{ padding: 10 }}>
        <VStack space="4">
          <HStack space={2} justifyContent="space-between">
            <Box>
              <Text fontSize="md" color="blue.700">
                {jobDetails.jobTitle}
              </Text>

              <Text fontSize="md">{jobDetails.jobType}</Text>
              <HStack>
                <Text fontSize="md" fontWeights="black">
                  The hiring team at
                  {jobDetails.companyName}
                </Text>
              </HStack>
            </Box>
            <Center>
              <Image
                source={{
                  uri: jobDetails.logo,
                }}
                alt={jobDetails.companyName}
                size="xl"
              />
            </Center>
          </HStack>
          <VStack color="light-400">
            <FormControl isRequired isInvalid={"name" in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Why should we hire you for this position?
              </FormControl.Label>
              <TextArea
                aria-label="t1"
                numberOfLines={2}
                placeholder="Invalid TextArea"
                isInvalid
                onChangeText={(value) => setData({ ...formData, name: value })}
                _dark={{
                  placeholderTextColor: "gray.300",
                }}
                mb="5"
              />
              {"name" in errors && (
                <FormControl.ErrorMessage>
                  Required field
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"position" in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Can you provide us with a sample of your work?
              </FormControl.Label>
              <TextArea
                aria-label="t1"
                numberOfLines={2}
                placeholder="Invalid TextArea"
                isInvalid
                onChangeText={(value) =>
                  setData({ ...formData, position: value })
                }
                _dark={{
                  placeholderTextColor: "gray.300",
                }}
                mb="5"
              />
              {"position" in errors && (
                <FormControl.ErrorMessage>
                  Required field
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={"responsibilities" in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Describe your current job responsibilities
              </FormControl.Label>
              <TextArea
                aria-label="t1"
                numberOfLines={2}
                placeholder="Invalid TextArea"
                isInvalid
                onChangeText={(value) =>
                  setData({ ...formData, responsibilities: value })
                }
                _dark={{
                  placeholderTextColor: "gray.300",
                }}
                mb="5"
              />
              {"responsibilities" in errors && (
                <FormControl.ErrorMessage>
                  Required field
                </FormControl.ErrorMessage>
              )}
            </FormControl>
            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
              Submit
            </Button>
          </VStack>
          <HStack
            px="4"
            space={3}
            justifyContent="space-between"
            borderTopColor="light.200"
            borderTopWidth="1"
          ></HStack>
        </VStack>
      </Box>
    </Box>
  );
}
