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
  ScrollView
} from "react-native";
import email from "react-native-email";
import {
  SocialIcon,
  Button,
  Icon,
  Card,
  ListItem,
  Divider
} from "react-native-elements";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { OutlinedTextField } from "react-native-material-textfield";
import { AsyncStorage } from "react-native";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const SCREEN_WIDTH = Dimensions.get("window").width;

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
// class starts here

export default class CounterHome extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      taskNo: 0,
      deletedTaskList: [],
      showDeletedCounter: false,
      deletedCountersBtnTitle: "Show Deleted Counters"
    };
  }

  componentDidMount() {
    console.log("component did mount");
    this.retriveTasks();
    console.log("component did mount end");
    // this.retriveSavedData();
  }

  retriveTasks = async () => {
    try {
      const value = await AsyncStorage.getItem("allData18");
      if (value !== null) {
        // We have data!!
        var retrivedData = JSON.parse(value);
        console.log(retrivedData, "Data retrived");
        this.setState({ taskList: retrivedData });
        this.setState({ taskList: this.state.taskList });
        var taskNo = retrivedData[retrivedData.length - 1].taskNo + 2;
        this.setState({ taskNo: taskNo });
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error in retriving saved data");
    }
    if (1 === 1) {
      try {
        const value = await AsyncStorage.getItem("deletedData2");
        if (value !== null) {
          // We have data!!
          var retrivedData = JSON.parse(value);
          console.log(retrivedData, "Deleted Data retrived");
          this.setState({ deletedTaskList: retrivedData });
          this.setState({ deletedTaskList: this.state.deletedTaskList });
        }
      } catch (error) {
        // Error retrieving data
        console.log("Error in retriving deleted data");
      }
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    renderDeletedTasks = this.state.deletedTaskList
      .slice(0)
      .reverse()
      .map(tasks => {
        if (this.state.showDeletedCounter) {
          return (
            <View key={tasks.taskNo}>
              <Card
                title={tasks.date}
                containerStyle={{
                  borderRadius: 30,
                  borderColor: "#f2f7ff"
                }}
              >
                <Text style={styles.text}>{tasks.task}</Text>
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                  <Button
                    title="Restore"
                    titleStyle={{ fontSize: 13 }}
                    type="clear"
                    onPress={async () => {
                      for (
                        var i = 0;
                        i < this.state.deletedTaskList.length;
                        i++
                      ) {
                        if (
                          this.state.deletedTaskList[i].taskNo == tasks.taskNo
                        ) {
                          var restoredTask = this.state.deletedTaskList[i];
                          var newTaskList = this.state.taskList.concat(
                            restoredTask
                          );
                          this.setState({
                            taskList: newTaskList
                          });
                          // this.setState({ taskList: this.state.taskList });
                          this.state.deletedTaskList.splice(i, 1);
                          this.setState({
                            deletedTaskList: this.state.deletedTaskList
                          });

                          var deletedDataToBeSaved = JSON.stringify(
                            this.state.deletedTaskList
                          );
                          try {
                            await AsyncStorage.setItem(
                              "deletedData2",
                              deletedDataToBeSaved
                            );
                            console.log("no error in saving deleted data");
                          } catch (error) {
                            // Error saving data
                            console.log("error in saving deleted data");
                          }

                          if (1 === 1) {
                            var dataToBeSaved = JSON.stringify(
                              this.state.taskList
                            );

                            try {
                              await AsyncStorage.setItem(
                                "allData18",
                                dataToBeSaved
                              );
                              console.log(
                                "no error in saving data after restoration"
                              );
                            } catch (error) {
                              // Error saving data
                              console.log(
                                "error in saving data after restoration"
                              );
                            }
                          }
                        }
                      }
                    }}
                  />
                  <Button
                    title="Permanent Delete"
                    titleStyle={{ color: "red", fontSize: 13 }}
                    type="clear"
                    onPress={async () => {
                      for (
                        var i = 0;
                        i < this.state.deletedTaskList.length;
                        i++
                      ) {
                        if (
                          this.state.deletedTaskList[i].taskNo == tasks.taskNo
                        ) {
                          this.state.deletedTaskList.splice(i, 1);
                          this.setState({
                            deletedTaskList: this.state.deletedTaskList
                          });

                          var dataToBeSaved = JSON.stringify(
                            this.state.deletedTaskList
                          );

                          try {
                            await AsyncStorage.setItem(
                              "deletedData2",
                              dataToBeSaved
                            );
                            console.log("no error in deleting deleted data");
                          } catch (error) {
                            // Error saving data
                            console.log("error in deleting deleted data");
                          }

                          if (1 === 1) {
                            try {
                              await AsyncStorage.multiRemove([
                                tasks.task + "fullData",
                                tasks.task + "currentWeekData"
                              ]);
                              console.log("No error in permanent deletion");
                            } catch (error) {
                              console.log("Error in permanent deletion");
                            }
                          }
                        }
                      }
                    }}
                  />
                </View>
              </Card>
              <Text></Text>
            </View>
          );
        } else {
          return <View key={tasks.taskNo}></View>;
        }
      });

    renderTasks = this.state.taskList
      .slice(0)
      .reverse()
      .map(tasks => {
        return (
          <View key={tasks.taskNo}>
            <Card
              title={tasks.day + "," + tasks.date}
              titleStyle={{ fontSize: 14 }}
              containerStyle={{
                borderRadius: 30,
                borderColor: "#f2f7ff"
              }}
            >
              <Text style={styles.text}>{tasks.task}</Text>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Button
                  title="Details"
                  titleStyle={{ fontSize: 13 }}
                  type="clear"
                  onPress={() =>
                    navigate("Counter", {
                      fullDataStorageKey: tasks.task + "fullData",
                      currentWeekDataStorageKey:
                        tasks.task + "currentWeekData1",
                      header: tasks.task
                    })
                  }
                />
                <Button
                  title="Delete"
                  titleStyle={{ color: "red", fontSize: 13 }}
                  type="clear"
                  onPress={async () => {
                    for (var i = 0; i < this.state.taskList.length; i++) {
                      if (this.state.taskList[i].taskNo == tasks.taskNo) {
                        var deletedTask = this.state.taskList[i];
                        this.setState({
                          deletedTaskList: this.state.deletedTaskList.concat(
                            deletedTask
                          )
                        });
                        this.state.taskList.splice(i, 1);
                        this.setState({ taskList: this.state.taskList });

                        var dataToBeSaved = JSON.stringify(this.state.taskList);

                        try {
                          await AsyncStorage.setItem(
                            "allData18",
                            dataToBeSaved
                          );
                          console.log("no error in saving data after deletion");
                        } catch (error) {
                          // Error saving data
                          console.log("error in saving data after deletion");
                        }

                        if (1 === 1) {
                          var deletedDataToBeSaved = JSON.stringify(
                            this.state.deletedTaskList
                          );
                          try {
                            await AsyncStorage.setItem(
                              "deletedData2",
                              deletedDataToBeSaved
                            );
                            console.log("no error in saving deleted data");
                          } catch (error) {
                            // Error saving data
                            console.log("error in saving deleted data");
                          }
                        }
                      }
                    }
                  }}
                />
              </View>
            </Card>
            <Text></Text>
          </View>
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
          title="Counter"
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

  fieldRef = React.createRef();

  onSubmit = async () => {
    let { current: field } = this.fieldRef;
    if (field.value().length === 0) {
      return null;
    } else {
      var taskNo = this.state.taskNo;
      var task = {
        task: field.value(),
        taskNo: taskNo,
        date: date,
        day: day,
        isComplete: false
      };
      var newTaskList = this.state.taskList.concat(task);
      this.setState({ taskList: newTaskList });
      console.log(this.state.taskList);
      this.setState({ taskNo: this.state.taskNo + 1 });

      // storing the data in local storage

      var dataToBeSaved = JSON.stringify(newTaskList);

      try {
        await AsyncStorage.setItem("allData18", dataToBeSaved);
        console.log("no error in saving data");
      } catch (error) {
        // Error saving data
        console.log("error in saving data");
      }
    }
  };

  renderDeletedTasksBtn = () => {
    if (this.state.deletedTaskList.length != 0) {
      return (
        <Button
          title={this.state.deletedCountersBtnTitle}
          titleStyle={{ fontSize: 14 }}
          type="clear"
          onPress={() => {
            if (this.state.showDeletedCounter) {
              this.setState({
                deletedCountersBtnTitle: "Show Deleted Counters",
                showDeletedCounter: !this.state.showDeletedCounter
              });
            } else {
              this.setState({
                deletedCountersBtnTitle: "Hide Deleted Counters",
                showDeletedCounter: !this.state.showDeletedCounter
              });
            }
          }}
        />
      );
    } else {
      return null;
    }
  };

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
      <ScrollView>
        <View style={{ flex: 1, minWidth: SCREEN_WIDTH }}>
          <Text></Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.boldText}>Create a new counter below.</Text>
          <View
            style={{
              padding: 10,
              margin: 10
            }}
          >
            <Text>Name of every counter should be different.</Text>
            <Text></Text>
            <OutlinedTextField
              label="Enter counter name"
              keyboardType="default"
              title="Pressing the Enter key on th ekeyboard will create this counter."
              onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
            />
          </View>
          <Divider style={{ backgroundColor: "black" }} />
          <View>
            {/* <Text></Text>
            <Text></Text> */}
            <Text></Text>
            <Text style={styles.boldText}>Existing counters.</Text>
            <Text></Text>
            {renderTasks}
            <Text></Text>
            <this.renderDeletedTasksBtn />
            <Text></Text>
            {renderDeletedTasks}
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 13,
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
  boldText: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#000",
    marginLeft: 20,
    marginRight: 30,
    lineHeight: 30,
    letterSpacing: 1,
    fontWeight: "bold"
  },
  date: {
    fontFamily: "Roboto",
    fontSize: 17,
    color: "#000",
    marginLeft: SCREEN_WIDTH / 20,
    marginRight: 30,
    lineHeight: 30,
    letterSpacing: 1
  }
});
