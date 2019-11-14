import React from "react";
import Counter from "./CounterComponent";
import Converter from "./ConverterComponent";
import About from "./AboutComponent";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

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
  Converter: {
    screen: Converter,
    navigationOptions: {
      tabBarLabel: "Converter",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="retweet" color={tintColor} size={25} />
      )
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      tabBarLabel: "About",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="info-circle" color={tintColor} size={25} />
      )
    }
  }
});

const Main = createAppContainer(MainNavigator);

export default Main;
