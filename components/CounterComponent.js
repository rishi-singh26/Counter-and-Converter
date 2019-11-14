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
import { Button, Icon, Card } from "react-native-elements";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { LineChart, YAxis, XAxis, Grid } from "react-native-svg-charts";
import { OutlinedTextField } from "react-native-material-textfield";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require("./images/orange.jpg") // Put your own image here
};

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
      fullData: []
    };
  }

  render() {
    //  this renders the saved graphs

    graphs = this.state.fullData
      .slice(0)
      .reverse()
      .map(graph => {
        return (
          <Card
            title="CARD WITH DIVIDER"
            key={graph.id}
            style={styles.container}
          >
            <View style={styles.user}>
              <View
                style={{
                  height: 200,
                  flexDirection: "row"
                  //  marginLeft: 10,
                  //  marginRight: 10
                }}
              >
                <YAxis
                  data={graph.data}
                  contentInset={contentInset}
                  svg={{
                    fill: "grey",
                    fontSize: 15
                  }}
                  numberOfTicks={5}
                  formatLabel={value => `${value}`}
                />
                <LineChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={graph.data}
                  svg={{ stroke: "rgb(244, 74, 65)" }}
                  contentInset={contentInset}
                >
                  <Grid />
                </LineChart>
              </View>
              <Text></Text>
              <Button
                //   icon={<Icon name="info-circle" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0
                }}
                title="VIEW NOW"
              />
            </View>
          </Card>
        );
      });

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
      <Text></Text>
      <Text></Text>
      <Text style={styles.date}>{date}</Text>
      <Text></Text>
      <View
        style={{
          padding: 10,
          margin: 10
        }}
      >
        <OutlinedTextField
          label="Enter Today's Data"
          keyboardType="number-pad"
          onSubmitEditing={this.onSubmit}
          ref={this.fieldRef}
        />
      </View>
      <View>
        <Text></Text>
        <View>
          <View style={styles.fixToScreen}>
            <Button title="Add This" type="clear" onPress={this.addData} />
            {/* <SocialIcon onPress={this.addData} light type="plus" /> */}
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
        <View>{graphs}</View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.text}>
          Contact Me to share you experiance or to send some feedback or just to
          say hi.
        </Text>
        <Text></Text>
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
                      weekCount++;
                      var data = this.state.data;
                      var fullData = {
                        id: weekCount,
                        endDate: date,
                        data: data
                      };

                      var newFUllData = this.state.fullData.concat(fullData);
                      this.setState({ fullData: newFUllData });
                      // this.setState({
                      //    fullData: this.state.fulldata.concat([this.state.data])
                      // });
                      console.log(this.state.fullData);
                      this.setState({ data: [] });
                      Alert.alert("Data Saved");
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
                            onPress: () => console.log("OK Pressed")
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
              weekCount++;
              var data = this.state.data;
              var fullData = {
                id: weekCount,
                endDate: date,
                data: data
              };

              var newFUllData = this.state.fullData.concat(fullData);
              this.setState({ fullData: newFUllData });
              // this.setState({
              //    fullData: this.state.fulldata.concat([this.state.data])
              // });
              console.log(this.state.fullData);
              this.setState({ data: [] });
              Alert.alert("Data Saved");
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  // the find ref and on submit are for the stylised text input

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
    justifyContent: "flex-end",
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
