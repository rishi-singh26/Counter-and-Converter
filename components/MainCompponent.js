import React from "react";
import Counter from "./CounterComponent";
import Converter from "./ConverterComponent";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

// History navigator component

const MainNavigator = createBottomTabNavigator({
   Home: {
      screen: Counter,
      navigationOptions: {
         tabBarLabel: "Counter",
         tabBarIcon: ({ tintColor }) => (
            <Icon name="server" color={tintColor} size={25} />
         )
      }
   },
   History: {
      screen: Converter,
      navigationOptions: {
         tabBarLabel: "Converter",
         tabBarIcon: ({ tintColor }) => (
            <Icon name="database" color={tintColor} size={25} />
         )
      }
   }
});

const Main = createAppContainer(MainNavigator);

export default Main;
