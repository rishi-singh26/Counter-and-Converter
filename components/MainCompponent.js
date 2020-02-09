import React from "react";
import Counter from "./CounterComponent";
import Converter from "./ConverterComponent";
import About from "./AboutComponent";
import CounterHome from "./CounterHomeComponent";
import Search from "./SearchComponent";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";

const CounterHomeNavigator = createStackNavigator({
  CounterHome: { screen: CounterHome },
  Counter: { screen: Counter },
  Search: { screen: Search }
});

const MainNavigator = createBottomTabNavigator({
  CounterHome: {
    screen: CounterHomeNavigator,
    initialRouteName: "CounterHome",
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={25} />
      ),
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "#f5f5f5"
        },
        style: {
          borderTopColor: "#f5f5f5"
        }
      }
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      tabBarLabel: "About",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="info-circle" color={tintColor} size={25} />
      ),
      tabBarOptions: {
        tabStyle: {
          backgroundColor: "#f5f5f5"
        },
        style: {
          borderTopColor: "#f5f5f5"
        }
      }
    }
  }
});

const Main = createAppContainer(MainNavigator);

export default Main;
