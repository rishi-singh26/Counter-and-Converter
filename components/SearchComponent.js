import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Dimensions,
  Platform,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Card, Button } from "react-native-elements";
import { OutlinedTextField } from "react-native-material-textfield";
import { getOrientationAsync } from "expo/build/ScreenOrientation/ScreenOrientation";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const SCREEN_WIDTH = Dimensions.get("window").width;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      existingSearch: [],
      deletedSearch: [],
      showSearchInput: true
    };
  }

  static navigationOptions = {
    title: "Search",
    headerStyle: {
      backgroundColor: "#00704a"
    },
    headerTintColor: "#fff"
  };

  formatText = text => {
    return text.replace(/[^+\d]/g, "");
  };

  render() {
    renderExistingSearch = this.state.existingSearch.map(existing => {
      return (
        <View key={existing.taskNo}>
          <Card
            title={existing.day + "," + existing.date}
            titleStyle={{ fontSize: 14 }}
            containerStyle={{
              borderRadius: 20,
              borderColor: "#fff",
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 9
              // },
              // shadowOpacity: 0.0,
              // shadowRadius: 11.95,

              elevation: 0
            }}
          >
            <Text style={existing.text}>{existing.task}</Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
                justifyContent: "space-around"
              }}
            >
              <Button
                title="Details"
                titleStyle={{ fontSize: 13 }}
                type="clear"
                onPress={() =>
                  this.props.navigation.navigate("Counter", {
                    fullDataStorageKey: existing.task + "fullData",
                    currentWeekDataStorageKey:
                      existing.task + "currentWeekData1",
                    header: existing.task
                  })
                }
              />
            </View>
          </Card>
          <Text></Text>
        </View>
      );
    });

    renderDeletedSearch = this.state.deletedSearch.map(deleted => {
      return (
        <View key={deleted.taskNo}>
          <Card
            title={deleted.day + "," + deleted.date + ", (Deleted)"}
            titleStyle={{ fontSize: 14 }}
            containerStyle={{
              borderRadius: 20,
              borderColor: "#fff",
              elevation: 0
            }}
          >
            <Text>{deleted.task}</Text>
            {/* <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
                justifyContent: "space-around"
              }}
            >
              <Button
                title="Details"
                titleStyle={{ fontSize: 13 }}
                type="clear"
                onPress={() =>
                  this.props.navigation.navigate("Counter", {
                    fullDataStorageKey: deleted.task + "fullData",
                    currentWeekDataStorageKey:
                      deleted.task + "currentWeekData1",
                    header: deleted.task
                  })
                }
              />
              <Button
                title="Restore"
                titleStyle={{ fontSize: 13 }}
                type="clear"
                onPress={async () => {
                  for (var i = 0; i < this.state.deletedTaskList.length; i++) {
                    if (
                      this.state.deletedTaskList[i].taskNo == deleted.taskNo
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
                        var dataToBeSaved = JSON.stringify(this.state.taskList);

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
                          console.log("error in saving data after restoration");
                        }
                      }
                    }
                  }
                }}
              />
            </View> */}
          </Card>
          <Text></Text>
        </View>
      );
    });

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <ScrollView>
          <View style={{ margin: SCREEN_WIDTH / 30 }}>
            <this.renderShowSearchInputBtn />
            <this.renderSearchInput />
            {renderExistingSearch}
            {renderDeletedSearch}
            <this.renderShowSearchInputBtn />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  renderShowSearchInputBtn = () => {
    if (!this.state.showSearchInput) {
      return (
        <TouchableOpacity
          style={{
            margin: 10,
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
          onPress={() => {
            this.setState({
              showSearchInput: !this.state.showSearchInput,
              existingSearch: [],
              deletedSearch: []
            });
          }}
        >
          <Text
            style={{
              color: "#3d98ff",
              fontSize: 14
            }}
          >
            Search another counter
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  renderSearchInput = () => {
    if (this.state.showSearchInput) {
      return (
        <OutlinedTextField
          label="Search your counter"
          keyboardType="default"
          onSubmitEditing={this.onSubmit}
          ref={this.fieldRef}
          autoFocus={true}
        />
      );
    } else {
      return null;
    }
  };

  fieldRef = React.createRef();

  onSubmit = () => {
    this.setState({ existingSearch: [] });

    let { current: field } = this.fieldRef;

    var counterList = this.props.navigation.getParam("counterList", "");

    var deletedCounterList = this.props.navigation.getParam(
      "deletedCounterList",
      ""
    );

    if (field.value().length != 0) {
      for (var i = 0; i < counterList.length; i++) {
        if (
          counterList[i].task
            .toUpperCase()
            .includes(field.value().toUpperCase())
        ) {
          this.setState({
            existingSearch: this.state.existingSearch.push(counterList[i])
          });
          this.setState({ existingSearch: this.state.existingSearch });
        }
      }
      console.log("existing", this.state.existingSearch);

      for (var i = 0; i < deletedCounterList.length; i++) {
        if (
          deletedCounterList[i].task
            .toUpperCase()
            .includes(field.value().toUpperCase())
        ) {
          this.setState({
            deletedSearch: this.state.deletedSearch.push(deletedCounterList[i])
          });
          this.setState({ deletedSearch: this.state.deletedSearch });
        } else {
          // Alert("Not Found");
        }
      }
      console.log("deleted", this.state.deletedSearch);
    } else {
      return null;
    }
    this.setState({ showSearchInput: !this.state.showSearchInput });
  };
}

export default Search;
