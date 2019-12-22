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
import { Button, Icon, Card, Overlay } from "react-native-elements";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { LineChart, YAxis, XAxis, Grid } from "react-native-svg-charts";
import { OutlinedTextField } from "react-native-material-textfield";
import { AsyncStorage } from "react-native";
// import Modal from "react-native-modal";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const screenWidth = Math.round(Dimensions.get("window").width);

const images = {
  background: require("./images/coffie.png") // Put your own image here
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
var dayNo = today.getDay();
var day = getDay(dayNo);
function getDay(dayNumber) {
  if (dayNumber === 0) {
    return "Sunday";
  } else if (dayNumber === 1) {
    return "Monday";
  } else if (dayNumber === 2) {
    return "Tuseday";
  } else if (dayNumber === 3) {
    return "Wednesday";
  } else if (dayNumber === 4) {
    return "Thrusday";
  } else if (dayNumber === 5) {
    return "Friday";
  } else if (dayNumber === 6) {
    return "Saturday";
  }
}

function getData(obj) {
  var pushArray = [];
  for (var i = 0; i < obj.length; i++) {
    pushArray.push(obj[i].data);
  }
  return pushArray;
}

// class starts here

export default class Counter extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      currentWeekData: [],
      fullData: [],
      dataArray: [],
      count: 0,
      weekCount: 0
    };
  }

  componentDidMount() {
    this.retriveData();
  }

  retriveData = async () => {
    try {
      const value = await AsyncStorage.getItem("currentWeekData1");
      if (value !== null) {
        // We have data!!
        var retrivedObj = JSON.parse(value);
        this.setState({ currentWeekData: retrivedObj });
        var count = retrivedObj[retrivedObj.length - 1].count;
        this.setState({ count: count + 1 });
        console.log("no error in retriving CurrentWeekData");
        var dataArray = getData(retrivedObj);
        this.setState({ dataArray: dataArray });
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error while retriving CurrentWeekData");
    }

    if (1 === 1) {
      try {
        const value = await AsyncStorage.getItem("fullData1");
        if (value !== null) {
          // We have data!!
          var retrivedObj1 = JSON.parse(value);
          this.setState({ fullData: retrivedObj1 });
          var weekCount = retrivedObj1[retrivedObj1.length - 1].id;
          this.setState({ weekCount: weekCount });
          console.log("no error in retriving FullData");
        }
      } catch (error) {
        // Error retrieving data
        console.log("Error while retriving FullData");
      }
    }
  };
  // this toggels the modal
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    //  this renders the saved graphs

    graphs = this.state.fullData
      .slice(0)
      .reverse()
      .map(graph => {
        return (
          <Card
            title={
              graph.startDay +
              "," +
              graph.startDate +
              "-" +
              graph.endDay +
              "," +
              graph.endDate
            }
            key={graph.id}
            style={styles.container}
            containerStyle={{ borderRadius: 10 }}
            // onPress={() => navigate("Dishdetail", { dishId: item.id })}
          >
            <View style={styles.user}>
              <View
                style={{
                  height: 200,
                  flexDirection: "row"
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
              <Text style={styles.text}>Day 1 data: {graph.data[0]}</Text>
              <Text style={styles.text}>Day 2 data: {graph.data[1]}</Text>
              <Text style={styles.text}>Day 3 data: {graph.data[2]}</Text>
              <Text style={styles.text}>Day 4 data: {graph.data[3]}</Text>
              <Text style={styles.text}>Day 5 data: {graph.data[4]}</Text>
              <Text style={styles.text}>Day 6 data: {graph.data[5]}</Text>
              <Text style={styles.text}>Day 7 data: {graph.data[6]}</Text>
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
          navbarColor="#00704a"
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
    <View style={{ minWidth: screenWidth }}>
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
          {/* <View style={styles.fixToScreen}>
            <Button title="Add This" type="clear" onPress={this.addData} />
            <SocialIcon onPress={this.addData} light type="plus" />
          </View> */}
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
            data={this.state.dataArray}
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
            data={this.state.dataArray}
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

  // saveData funtion saves the data and renders a card after completion of 7 inputs
  saveData = async () => {
    this.setState({ weekCount: this.state.weekCount + 1 });
    var data = this.state.currentWeekData;
    console.log(this.state.currentWeekData, "the current week data");
    var endDate = data[data.length - 1].date;
    var endDay = data[data.length - 1].day;
    var startDate = data[0].date;
    var startDay = data[0].day;
    var fullData = {
      id: this.state.weekCount,
      endDate: endDate,
      startDate: startDate,
      endDay: endDay,
      startDay: startDay,
      data: this.state.dataArray
    };

    var newFUllData = this.state.fullData.concat(fullData);
    this.setState({ fullData: newFUllData });
    console.log(this.state.fullData);

    var dataToBeSaved = JSON.stringify(newFUllData);
    try {
      await AsyncStorage.setItem("fullData1", dataToBeSaved);
      console.log("no error in saving Fulldata");
    } catch (error) {
      // Error saving data
      console.log("Error while saving Fulldata");
    }

    this.setState({ dataArray: [] });
    this.setState({ currentWeekData: [], count: 0 });
    if (1 === 1) {
      var arr = [];
      var dataToBeSaved = JSON.stringify(arr);
      try {
        await AsyncStorage.setItem("currentWeekData1", dataToBeSaved);
        console.log("no error in saving current Week Data");
      } catch (error) {
        // Error saving data
        console.log("Error while saving current week data");
      }
    }
    Alert.alert("Data Saved");
  };

  // the find ref and on submit are for the stylised text input

  fieldRef = React.createRef();

  onSubmit = async () => {
    let { current: field } = this.fieldRef;
    var val = field.value();

    if (this.state.count < 7) {
      var todaysData = {
        count: this.state.count,
        data: Number(val),
        date: date,
        day: day
      };
      var joined = this.state.currentWeekData.concat(todaysData);
      this.setState({ currentWeekData: joined });
      console.log(joined);
      this.setState({ count: this.state.count + 1 });
      // console.log(count);
      this.setState({ dataArray: this.state.dataArray.concat(Number(val)) });

      var dataToBeSaved = JSON.stringify(joined);
      try {
        await AsyncStorage.setItem("currentWeekData1", dataToBeSaved);
        console.log("no error in saving current Week Data");
      } catch (error) {
        // Error saving data
        console.log("Error while saving current week data");
      }
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
                "This Data is unsaved and will be PERMANENTLY DELETED!!",
                "Aew you sure?",
                [
                  {
                    text: "No, Save it",
                    onPress: this.saveData
                  },
                  {
                    text: "Yes",
                    onPress: async () => {
                      this.setState({ dataArray: [] });
                      this.setState({ currentWeekData: [], count: 0 });
                      if (1 === 1) {
                        var arr = [];
                        var dataToBeSaved = JSON.stringify(arr);
                        try {
                          await AsyncStorage.setItem(
                            "currentWeekData1",
                            dataToBeSaved
                          );
                          console.log("no error in saving current Week Data");
                        } catch (error) {
                          // Error saving data
                          console.log("Error while saving current week data");
                        }
                      }
                      Alert.alert("Data Deleted");
                    }
                  }
                ],
                { cancelable: false }
              );
            }
          },

          {
            text: "Yes",
            onPress: this.saveData
          }
        ],
        { cancelable: false }
      );
    }
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
  }
});
