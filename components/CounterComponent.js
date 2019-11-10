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
import { SocialIcon, Button, Icon } from "react-native-elements";
// import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { LineChart, YAxis, Grid } from "react-native-svg-charts";
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

const data = [50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80];

const contentInset = { top: 20, bottom: 20 };

// getting the date here
var today = new Date();
var date =
   today.getDate() +
   "/" +
   parseInt(today.getMonth() + 1) +
   "/" +
   today.getFullYear();

// the count variable counts the number of days
var count = 0;

// the weekCount counts the number of weeks
var weekCount = 0;

// class starts here

export default class Counter extends React.Component {
   static navigationOptions = {
      header: null
   };

   constructor(props) {
      super(props);
      this.state = {
         inputValue: "",
         data: [],
         fullData: [],
         savedData: [
            [1, 7, 2, 6, 3, 5, 4],
            [2, 4, 2, 5, 6, 3, 2],
            [3, 5, 2, 8, 9, 5, 1]
         ],
         weekStartDate: [],
         weekEndDate: []
      };
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
               title="Coffie Counter"
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
         <View
            style={{
               padding: 10,
               margin: 10
            }}
         >
            <Text></Text>
            <Text></Text>
            <Text style={styles.date}>{date}</Text>
            <Text></Text>
            <Text></Text>
            <OutlinedTextField
               label="Enter Today's Data"
               keyboardType="default"
               onSubmitEditing={this.onSubmit}
               ref={this.fieldRef}
            />
         </View>
         <View style={styles.container}>
            <Text></Text>
            <View>
               <View style={styles.fixToScreen}>
                  <SocialIcon onPress={this.addData} light type="plus" />
               </View>
            </View>
            <Text></Text>
            <Text></Text>
            <View
               style={{
                  height: 200,
                  flexDirection: "row",
                  marginLeft: 10,
                  marginRight: 10
               }}
            >
               <YAxis
                  data={this.state.data}
                  contentInset={contentInset}
                  svg={{
                     fill: "grey",
                     fontSize: 15
                  }}
                  numberOfTicks={5}
                  formatLabel={value => `${value}`}
                  // formatLabel={value => `${value}ºC`}
               />
               <LineChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={this.state.data}
                  svg={{ stroke: "rgb(244, 74, 65)" }}
                  contentInset={contentInset}
               >
                  <Grid />
               </LineChart>
            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <View
               style={{
                  height: 200,
                  flexDirection: "row",
                  marginLeft: 10,
                  marginRight: 10
               }}
            >
               <YAxis
                  data={this.state.savedData[0]}
                  contentInset={contentInset}
                  svg={{
                     fill: "grey",
                     fontSize: 15
                  }}
                  numberOfTicks={5}
                  formatLabel={value => `${value}`}
                  // formatLabel={value => `${value}ºC`}
               />
               <LineChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={this.state.savedData[0]}
                  svg={{ stroke: "rgb(244, 74, 65)" }}
                  contentInset={contentInset}
               >
                  <Grid />
               </LineChart>
            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.text}>
               Contact Me to share you experiance or to send some feedback or
               just to say hi.
            </Text>
            <Text></Text>
            <View>
               <View style={styles.fixToScreen}>
                  <SocialIcon
                     onPress={() =>
                        Linking.openURL(
                           "https://join.skype.com/invite/bSsjEVuBEpcN"
                        )
                     }
                     light
                     type="skype"
                  />
               </View>
            </View>
            <View>
               <View style={styles.fixToScreen}>
                  <SocialIcon onPress={this.handleEmail} type="envelope" />
                  <SocialIcon
                     onPress={this.handleWhatsapp}
                     light
                     type="whatsapp"
                  />
               </View>
            </View>
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

   handleEmail = () => {
      const to = ["rishisingh0831@gmail.com"]; // string or array of email addresses
      email(to, {
         // Optional additional arguments
         // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
         // bcc: 'mee@mee.com', // string or array of email addresses
         subject: "Share your views."
         // body: 'Some body right here'
      }).catch(console.error);
   };

   handleWhatsapp = () => {
      Linking.openURL("whatsapp://send?text=hello&phone=+919513087147");
   };

   addData = () => {
      if (count < 7) {
         var joined = this.state.data.concat(Number(this.state.inputValue));
         this.setState({ data: joined });
         console.log(joined);
         count++;
         console.log(count);
      } else {
         count = 0;
         Alert.alert(
            "Week Complete",
            "Do you want to save this week?",
            [
               {
                  text: "No",
                  onPress: () => {
                     Alert.alert(
                        "This week's data will be DELETED!!",
                        "Aew you sure?",
                        [
                           {
                              text: "No, Save it",
                              onPress: () => {
                                 var newFUllData = this.state.fullData.concat(
                                    this.state.data
                                 );
                                 this.setState({ fullData: newFUllData });
                                 console.log(this.state.fullData);
                                 this.setState({ data: [] });
                                 console.log("No, Save it, pressed");
                              }
                              // style: "cancel"
                           },
                           {
                              text: "Yes",
                              onPress: () => {
                                 this.setState({ data: [] });
                                 Alert.alert(
                                    "Data Deleted",
                                    [
                                       {
                                          text: "Okay",
                                          onPress: () =>
                                             console.log("OK Pressed")
                                       }
                                    ],
                                    { cancelable: false }
                                 );
                              }
                           }
                        ],
                        { cancelable: false }
                     );
                  }
               },

               {
                  text: "Yes",
                  onPress: () => {
                     var newFUllData = this.state.fullData.concat([
                        this.state.data
                     ]);
                     this.setState({ fullData: newFUllData });
                     // this.setState({
                     //    fullData: this.state.fulldata.concat([this.state.data])
                     // });
                     console.log(this.state.fullData);
                     this.setState({ data: [] });
                     Alert.alert(
                        "Data Saved",
                        "Thanks for using my app",
                        [
                           {
                              text: "Chl Nikal",
                              onPress: () => console.log("Ask me later pressed")
                           },
                           {
                              text: "Taliya👌",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                           },
                           {
                              text: "Thik Hai",
                              onPress: () => console.log("OK Pressed")
                           }
                        ]
                        // {cancelable: false},
                     );
                  }
               }
            ],
            { cancelable: false }
         );
      }
   };

   fieldRef = React.createRef();

   onSubmit = () => {
      let { current: field } = this.fieldRef;
      var val = field.value();
      this.setState({ inputValue: val });
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
   textInput: {
      fontFamily: "Roboto",
      fontSize: 17,
      color: "#000",
      marginLeft: 30,
      marginRight: 30,
      lineHeight: 30,
      letterSpacing: 1,
      borderColor: "blue",
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 5,
      padding: 20
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
