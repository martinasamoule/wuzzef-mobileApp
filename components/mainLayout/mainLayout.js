import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab  = createMaterialTopTabNavigator();
import Explore from "../explore/explore";
import Saved from "../saved/saved";
import Application from "../application/application";
import Profile from "../profile/profile";
export default function  MainLayout () 
 {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Explore" component={Explore} />
          <Tab.Screen name="Saved" component={Saved} />
          <Tab.Screen name="Application" component={Application} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
  };