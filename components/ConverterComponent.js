import React, { Component } from "react";
import {
   StyleSheet,
   Text,
   View,
   Dimensions,
   Platform,
   TouchableOpacity,
   Clipboard
} from "react-native";
import { SocialIcon, Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import {
   TextField,
   FilledTextField,
   OutlinedTextField
} from "react-native-material-textfield";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const images = {
   background: require("./images/orange.jpg") // Put your own image here
};

var today = new Date();
var date =
   today.getDate() +
   "/" +
   parseInt(today.getMonth() + 1) +
   "/" +
   today.getFullYear();

export default class Converter extends React.Component {
   constructor(props) {
      super(props);
   }

   static navigationOptions = {
      header: null
   };

   state = {
      decimalInput: "Decimal",
      binaryInput: "Binary",
      hexainput: "Hexadecimal",
      textinput: "Text",
      bin2input: "Binary",
      decRes: "Result Here",
      bin1Res: "Result Here",
      hexRes: "Result Here",
      textRes: "Result Here",
      bin2Res: "Result Here"
   };

   render() {
      return (
         <View style={styles.container}>
            <ReactNativeParallaxHeader
               headerMinHeight={HEADER_HEIGHT}
               headerMaxHeight={300}
               extraScrollHeight={20}
               navbarColor="#FF7544"
               statusBarColor="#fff"
               title="Converter"
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
         <Text></Text>
         <Text></Text>
         <Text style={styles.date}>{date}</Text>
         <Text></Text>
         <View
            style={{
               padding: 10,
               margin: 10,
               borderRadius: 5,
               borderColor: "rgb(68,137,215)",
               borderStyle: "solid",
               borderWidth: 1
            }}
         >
            <OutlinedTextField
               label="Decimal"
               keyboardType="phone-pad"
               formatText={this.formatText}
               onSubmitEditing={this.onSubmit1}
               ref={this.fieldRef1}
            />
            <Text
               style={{
                  margin: 10
               }}
            >
               {this.state.decRes}
            </Text>
            <Button title="Copy Result" type="clear" onPress={this.copy1} />
            <Text></Text>
            <OutlinedTextField
               label="Binary"
               keyboardType="phone-pad"
               formatText={this.formatText}
               onSubmitEditing={this.onSubmit2}
               ref={this.fieldRef2}
            />
            <Text
               style={{
                  margin: 10
               }}
            >
               {this.state.bin1Res}
            </Text>
            <Button title="Copy Result" type="clear" onPress={this.copy2} />
            <Text></Text>
            <OutlinedTextField
               label="Hexadecimal"
               keyboardType="default"
               // formatText={this.formatText}
               onSubmitEditing={this.onSubmit3}
               ref={this.fieldRef3}
            />
            <Text
               style={{
                  margin: 10
               }}
            >
               {this.state.hexRes}
            </Text>
            <Button title="Copy Result" type="clear" onPress={this.copy3} />
         </View>
         <Text></Text>
         <Text></Text>
         <Text></Text>
         <View
            style={{
               padding: 10,
               margin: 10,
               borderRadius: 5,
               borderColor: "rgb(68,137,215)",
               borderStyle: "solid",
               borderWidth: 1
            }}
         >
            <OutlinedTextField
               label="Text"
               keyboardType="default"
               // formatText={this.formatText}
               onSubmitEditing={this.onSubmit4}
               ref={this.fieldRef4}
            />
            <Text
               style={{
                  margin: 10
               }}
            >
               {this.state.textRes}
            </Text>
            <Button title="Copy Result" type="clear" onPress={this.copy4} />
            <Text></Text>
            <OutlinedTextField
               label="Binary"
               keyboardType="phone-pad"
               formatText={this.formatText}
               onSubmitEditing={this.onSubmit5}
               ref={this.fieldRef5}
            />
            <Text
               style={{
                  margin: 10
               }}
            >
               {this.state.bin2Res}
            </Text>
            <Button title="Copy Result" type="clear" onPress={this.copy5} />
         </View>
         <Text style={styles.text}>
            You can convert Decimal number to Binary and Hexadecimal...and
            convert Text to Binary using this app.
         </Text>
         <Text></Text>
         <Text></Text>
         <Text></Text>
         <Text></Text>
      </View>
   );

   fieldRef1 = React.createRef();

   fieldRef2 = React.createRef();

   fieldRef3 = React.createRef();

   fieldRef4 = React.createRef();

   fieldRef5 = React.createRef();

   onSubmit1 = () => {
      let { current: field } = this.fieldRef1;

      console.log(field.value());

      var dec = field.value();
      // Deciaml to binary
      var bin = (dec >>> 0).toString(2);
      this.setState({ bin1Res: bin });
      // Decimal to Hex
      var hex = (dec >>> 0).toString(16).toUpperCase();
      this.setState({ hexRes: hex });
   };

   onSubmit2 = () => {
      let { current: field } = this.fieldRef2;

      console.log(field.value());

      var bin = field.value();
      // Binary to Decimal
      var dec = parseInt(bin, 2);
      this.setState({ decRes: dec });
      // Binary to Hexadecimal
      var hex = parseInt(bin, 2)
         .toString(16)
         .toUpperCase();
      this.setState({ hexRes: hex });
   };

   onSubmit3 = () => {
      let { current: field } = this.fieldRef3;

      console.log(field.value());

      var hex = field.value();
      console.log(hex);
      // Hex to Decmal
      var dec = parseInt(hex, 16);
      this.setState({ decRes: dec });
      // Hex to Binary
      var bin = parseInt(hex, 16)
         .toString(2)
         .padStart(8, "0");
      this.setState({ bin1Res: bin });
   };

   onSubmit4 = () => {
      let { current: field } = this.fieldRef4;

      console.log(field.value());

      var input = field.value();
      // text to binary
      var bin = input
         .split("")
         .map(function(char) {
            return char.charCodeAt(0).toString(2);
         })
         .join(" ");
      this.setState({ bin2Res: bin });
   };

   onSubmit5 = () => {
      let { current: field } = this.fieldRef5;

      console.log(field.value());

      var text = "";
      var input = field.value();
      input.split(" ").map(function(bin) {
         text += String.fromCharCode(parseInt(bin, 2));
      });
      this.setState({ textRes: text });
   };

   copy1 = () => {
      Clipboard.setString(this.state.decRes);
   };

   copy2 = () => {
      Clipboard.setString(this.state.bin1Res);
   };

   copy3 = () => {
      Clipboard.setString(this.state.hexRes);
   };

   copy4 = () => {
      Clipboard.setString(this.state.textRes);
   };

   copy5 = () => {
      Clipboard.setString(this.state.bin2Res);
   };

   formatText = text => {
      return text.replace(/[^+\d]/g, "");
   };
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
      justifyContent: "space-between",
      marginLeft: 50,
      marginRight: 50
   },
   text: {
      fontFamily: "Roboto",
      fontSize: 17,
      color: "#000",
      marginLeft: 30,
      marginRight: 30,
      lineHeight: 30,
      letterSpacing: 1
      // textAlign: 'center',
   },
   date: {
      fontFamily: "Roboto",
      fontSize: 22,
      color: "#000",
      marginLeft: 30,
      marginRight: 30,
      lineHeight: 30,
      letterSpacing: 1
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
   },
   button: {
      marginLeft: 30,
      marginRight: 30
   }
});
