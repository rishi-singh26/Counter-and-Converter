import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert,
  Linking,
  FlatList
} from "react-native";
import { Button, Icon, Card, Overlay, ListItem } from "react-native-elements";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { LineChart, YAxis, XAxis, Grid } from "react-native-svg-charts";
import { OutlinedTextField } from "react-native-material-textfield";
import { AsyncStorage } from "react-native";
import Dialog from "react-native-dialog";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const screenWidth = Dimensions.get("window").width;

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

function getDay1(obj) {
  var pushArray = [];
  for (var i = 0; i < obj.length; i++) {
    pushArray.push(obj[i].day);
  }
  return pushArray;
}

function getDate(obj) {
  var pushArray = [];
  for (var i = 0; i < obj.length; i++) {
    pushArray.push(obj[i].date);
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
      weekCount: 0,
      fullDataKey: "",
      currentWeekDataKey: "",
      header: "",
      dialogVisible: false,
      newData: "" //this sotres the value which the user enters in the edit most recent data dilog box
    };
  }

  // fullDataKey =
  // currentWeekDataKey =

  componentDidMount() {
    this.retriveData();
  }

  retriveData = async () => {
    var currentWeekDataStorageKey = this.props.navigation.getParam(
      "currentWeekDataStorageKey",
      ""
    );
    this.setState({
      fullDataKey: this.props.navigation.getParam("fullDataStorageKey", "")
    });
    this.setState({
      currentWeekDataKey: currentWeekDataStorageKey
    });
    this.setState({
      header: this.props.navigation.getParam("header", "")
    });
    try {
      const value = await AsyncStorage.getItem(currentWeekDataStorageKey);
      if (value !== null) {
        // We have data!!
        var retrivedObj = JSON.parse(value);
        this.setState({ currentWeekData: retrivedObj });
        var count = retrivedObj[retrivedObj.length - 1].count;
        this.setState({ count: count + 1 });
        console.log(
          "no error in retriving CurrentWeekData from key:",
          this.state.currentWeekDataKey
        );
        var dataArray = getData(this.state.currentWeekData);
        this.setState({ dataArray: dataArray });
      }
    } catch (error) {
      // Error retrieving data
      console.log(
        "Error while retriving CurrentWeekData from key: ",
        this.state.currentWeekDataKey
      );
    }

    if (1 === 1) {
      try {
        const value = await AsyncStorage.getItem(this.state.fullDataKey);
        if (value !== null) {
          // We have data!!
          var retrivedObj1 = JSON.parse(value);
          this.setState({ fullData: retrivedObj1 });
          var weekCount = retrivedObj1[retrivedObj1.length - 1].id;
          this.setState({ weekCount: weekCount + 1 });
          console.log(
            "no error in retriving FullData from key :",
            this.state.fullDataKey
          );
        }
      } catch (error) {
        // Error retrieving data
        console.log(
          "Error while retriving FullData from key :",
          this.state.fullDataKey
        );
      }
    }
  };
  // this toggels the modal
  toggleDilog = () => {
    this.setState({ dialogVisible: false });
  };

  editMostRecentData = async () => {
    if (this.state.currentWeekData.length > 0) {
      console.log(this.state.newData);
      console.log(typeof this.state.newData);
      var newData = Number(this.state.newData);
      var currentWeekData = this.state.currentWeekData;
      currentWeekData[currentWeekData.length - 1].data = newData;
      this.setState({ dialogVisible: false, currentWeekData: currentWeekData });

      var dataToBeSaved = JSON.stringify(this.state.currentWeekData);
      try {
        await AsyncStorage.setItem(
          this.state.currentWeekDataKey,
          dataToBeSaved
        );
        console.log(
          "no error in saving new most recent data the key:",
          this.state.currentWeekDataKey
        );
      } catch (error) {
        // Error saving data
        console.log("Error while saving new most recent data");
      }

      var dataArray = this.state.dataArray;
      dataArray.pop();
      dataArray.push(newData);
    }
  };

  render() {
    //  this renders the saved graphs

    list = this.state.currentWeekData
      .slice(0)
      .reverse()
      .map(item => {
        return (
          <Text style={styles.text} key={item.count}>
            {item.day + "," + item.date + ": " + item.data}
          </Text>
        );
      });

    graphs = this.state.fullData
      .slice(0)
      .reverse()
      .map(graph => {
        return (
          <Card
            title={
              graph.dayArray[0] +
              "," +
              graph.dateArray[0] +
              "-" +
              graph.dayArray[graph.dayArray.length - 1] +
              "," +
              graph.dateArray[graph.dateArray.length - 1]
            }
            key={graph.id}
            style={styles.container}
            titleStyle={{ fontSize: 14 }}
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
              <Text style={styles.text}>
                {graph.dayArray[0]}, {graph.dateArray[0]} : {graph.data[0]}
              </Text>
              <Text style={styles.text}>
                {graph.dayArray[1]}, {graph.dateArray[1]} : {graph.data[1]}
              </Text>
              <Text style={styles.text}>
                {graph.dayArray[2]}, {graph.dateArray[2]} : {graph.data[2]}
              </Text>
              <Text style={styles.text}>
                {graph.dayArray[3]}, {graph.dateArray[3]} : {graph.data[3]}
              </Text>
              <Text style={styles.text}>
                {graph.dayArray[4]}, {graph.dateArray[4]} : {graph.data[4]}
              </Text>
              <Text style={styles.text}>
                {graph.dayArray[5]}, {graph.dateArray[5]} : {graph.data[5]}
              </Text>
              <Text style={styles.text}>
                {graph.dayArray[6]}, {graph.dateArray[6]} : {graph.data[6]}
              </Text>
            </View>
          </Card>
        );
      });

    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={350}
          extraScrollHeight={20}
          navbarColor="#00704a"
          statusBarColor="#fff"
          title={this.state.header}
          titleStyle={styles.titleStyle}
          // backgroundImage={images.background}
          backgroundColor="#00704a"
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
    <View style={{ flex: 1, minWidth: screenWidth, maxWidth: screenWidth }}>
      <Text></Text>
      <Text style={styles.date}>{date}</Text>
      <this.renderTodaysDataTextField />
      <View>
        <this.renderEditMostRecentDataBtn />
      </View>
      <Text></Text>
      <View>{list}</View>
      {/* <Text></Text> */}
      <this.renderAddDataButton />
      <View>
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

  renderTodaysDataTextField = () => {
    if (this.state.count < 7) {
      return (
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
            // title="Be Careful while entering the data, it can NOT be changed."
            ref={this.fieldRef}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  renderEditMostRecentDataBtn = () => {
    if (this.state.currentWeekData.length > 0) {
      return (
        <View>
          <Button
            title="Edit The Most Recent Data"
            titleStyle={{ fontSize: 13 }}
            type="clear"
            onPress={() => {
              this.setState({ dialogVisible: true });
            }}
          />
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Edit Data</Dialog.Title>
            <Dialog.Description>
              You can edit the most recently added data.
            </Dialog.Description>
            <Dialog.Input
              label="Enter new Data"
              wrapperStyle={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                padding: 5
              }}
              keyboardType="number-pad"
              onChangeText={text => this.setState({ newData: text })}
              value={this.state.newData}
            ></Dialog.Input>
            <Dialog.Button label="Cancel" onPress={this.toggleDilog} />
            <Dialog.Button label="Submit" onPress={this.editMostRecentData} />
          </Dialog.Container>
        </View>
      );
    } else {
      return null;
    }
  };

  renderAddDataButton = () => {
    if (this.state.count >= 7) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: screenWidth / 14
          }}
        >
          <Button
            title="Delete Data"
            titleStyle={{ fontSize: 14 }}
            buttonStyle={{
              backgroundColor: "green",
              minWidth: 100,
              maxWidth: 100
            }}
            onPress={() => {
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
                            this.state.currentWeekDataKey,
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
                { cancelable: true }
              );
            }}
          />
          <Button
            title="Add Data"
            titleStyle={{ fontSize: 14 }}
            buttonStyle={{
              backgroundColor: "red",
              minWidth: 100,
              maxWidth: 100
            }}
            onPress={this.saveData}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  // saveData funtion saves the data and renders a card after completion of 7 inputs
  saveData = async () => {
    this.setState({ weekCount: this.state.weekCount + 1 });
    this.setState({ weekCount: this.state.weekCount });
    var data = this.state.currentWeekData;
    console.log(this.state.currentWeekData, "the current week data");
    var dateArray = getDate(this.state.currentWeekData);
    var dayArray = getDay1(this.state.currentWeekData);
    var fullData = {
      id: this.state.weekCount,
      dateArray: dateArray,
      dayArray: dayArray,
      data: this.state.dataArray
    };

    var newFUllData = this.state.fullData.concat(fullData);
    this.setState({ fullData: newFUllData });
    console.log(this.state.fullData);

    var dataToBeSaved = JSON.stringify(newFUllData);
    try {
      await AsyncStorage.setItem(this.state.fullDataKey, dataToBeSaved);
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
        await AsyncStorage.setItem(
          this.state.currentWeekDataKey,
          dataToBeSaved
        );
        console.log("no error in saving current Week Data");
      } catch (error) {
        // Error saving data
        console.log("Error while saving current week data");
      }
    }
    Alert.alert(
      "Data saved",
      "Your data has been saved",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };

  // the find ref and on submit are for the stylised text input

  fieldRef = React.createRef();

  onSubmit = async () => {
    let { current: field } = this.fieldRef;
    var val = field.value();

    if (field.value().length !== 0 && this.state.count < 7) {
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
        await AsyncStorage.setItem(
          this.state.currentWeekDataKey,
          dataToBeSaved
        );
        console.log(
          "no error in saving current Week Data inside the key:",
          this.state.currentWeekDataKey
        );
      } catch (error) {
        // Error saving data
        console.log("Error while saving current week data");
      }
    } else {
      return null;
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
    fontSize: 13,
    color: "#000",
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 30,
    letterSpacing: 1
    // textAlign: 'center',
  },
  date: {
    fontFamily: "Roboto",
    fontSize: 17,
    color: "#000",
    marginLeft: screenWidth / 20,
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
