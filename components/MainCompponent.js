import React from "react";
import Counter from "./CounterComponent";
import Converter from "./ConverterComponent";
import About from "./AboutComponent";
import CounterHome from "./CounterHomeComponent";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const CounterHomeNavigator = createStackNavigator({
  CounterHome: { screen: CounterHome },
  Counter: { screen: Counter }
});

const MainNavigator = createBottomTabNavigator({
  CounterHome: {
    screen: CounterHomeNavigator,
    initialRouteName: "CounterHome",
    navigationOptions: {
      tabBarLabel: "Counter Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={25} />
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
