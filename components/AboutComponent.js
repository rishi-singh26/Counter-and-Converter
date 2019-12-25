import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
  Linking
} from "react-native";
import email from "react-native-email";
import {
  SocialIcon,
  Button,
  Icon,
  Card,
  ListItem
} from "react-native-elements";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { ExpoConfigView } from "@expo/samples";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const SCREEN_WIDTH = Dimensions.get("window").width;

const images = {
  background: require("./images/orange.jpg") // Put your own image here
};

// class starts here

export default class About extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={300}
          extraScrollHeight={20}
          navbarColor="#FF7544"
          statusBarColor="#fff"
          title="About"
          titleStyle={styles.titleStyle}
          backgroundImage={images.background}
          backgroundImageScale={1.1}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
            onScrollEndDrag: () => console.log("onScrollEndDrag")
          }}
        />
      </View>
    );
  }

  renderNavBar = () => {
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
          <Icon name="add" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
          <Icon name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>;
  };

  renderContent = () => (
    <View>
      <ExpoConfigView />
      <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text style={styles.text}>
          Contact Me to share you experiance or to send some feedback or just to
          say hi.
        </Text>
        <Text></Text>
        <View>
          <View style={styles.fixToScreen}>
            <SocialIcon
              onPress={() =>
                Linking.openURL("https://github.com/rishi-singh26")
              }
              // light
              type="github"
            />

            <SocialIcon
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/in/rishi-singh-b2226415b/"
                )
              }
              // light
              type="linkedin"
            />

            <SocialIcon
              onPress={() =>
                Linking.openURL("https://codepen.io/rishisingh-26/")
              }
              // light
              type="codepen"
            />
            <SocialIcon
              onPress={() =>
                Linking.openURL("https://join.skype.com/invite/bSsjEVuBEpcN")
              }
              light
              type="skype"
            />
          </View>
        </View>

        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  fixToScreen: {
    flexDirection: "row",
    justifyContent: "space-around",
    minWidth: (SCREEN_WIDTH / 10) * 8,
    marginLeft: 30,
    marginRight: 30
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#000",
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 30
    // letterSpacing: 1
    // textAlign: 'center',
  },
  contentContainer: {
    flexGrow: 1
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: "transparent"
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  titleStyle: {
    // fontFamily: 'serif',
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    // marginRight: 80,
    marginTop: 20
  }
});
