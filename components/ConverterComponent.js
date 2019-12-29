import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Clipboard
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import { OutlinedTextField } from "react-native-material-textfield";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday"
];

var today = new Date();
var date =
  today.getDate() +
  "/" +
  parseInt(today.getMonth() + 1) +
  "/" +
  today.getFullYear() +
  ", " +
  weekDays[today.getDay() - 1];

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
    textToBinRes: "Result Here",
    binToTextRes: "Result Here",
    enToPhoneticRes: "Result Here",
    phoneticToEnRes: "Result Here",
    morseToEnglishRes: "Result Here",
    enToMorseRes: "Result Here"
  };

  render() {
    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={300}
          extraScrollHeight={20}
          navbarColor="#039BE6"
          statusBarColor="#fff"
          title="Converter"
          titleStyle={styles.titleStyle}
          // backgroundImage={images.background}
          backgroundColor="#039BE6"
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
      <Text style={styles.text}>
        Decimal to Binary To Hexadecimal Converter
      </Text>
      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#ededed",
          borderRadius: 20,
          paddingTop: 20
        }}
      >
        <OutlinedTextField
          label="Decimal"
          keyboardType="default"
          // formatText={this.formatText}
          onSubmitEditing={this.decToBinAndHex}
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
          keyboardType="default"
          // formatText={this.formatText}
          onSubmitEditing={this.binToDecAndHex}
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
          onSubmitEditing={this.hexToBinAndDec}
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
      <Text style={styles.text}>Text to Binary Converter</Text>
      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#ededed",
          borderRadius: 20,
          paddingTop: 20
        }}
      >
        <OutlinedTextField
          label="Text"
          keyboardType="default"
          // formatText={this.formatText}
          onSubmitEditing={this.textToBin}
          ref={this.fieldRef4}
        />
        <Text
          style={{
            margin: 10
          }}
        >
          {this.state.binToTextRes}
        </Text>
        <Button title="Copy Result" type="clear" onPress={this.copy5} />
      </View>
      <Text></Text>
      <Text style={styles.text}>Binary to Text Converter</Text>
      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#ededed",
          borderRadius: 20,
          paddingTop: 20
        }}
      >
        <OutlinedTextField
          label="Binary"
          keyboardType="default"
          // formatText={this.formatText}
          onSubmitEditing={this.binToText}
          ref={this.fieldRef5}
        />
        <Text
          style={{
            margin: 10
          }}
        >
          {this.state.textToBinRes}
        </Text>
        <Button title="Copy Result" type="clear" onPress={this.copy4} />
      </View>
      <Text></Text>
      <Text></Text>
      <Text style={styles.text}>Alphabets to NATO Phonetic converter</Text>
      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#ededed",
          borderRadius: 20,
          paddingTop: 20
        }}
      >
        <OutlinedTextField
          label="Normal Text"
          keyboardType="default"
          onSubmitEditing={this.enToPhoneticConversion}
          ref={this.fieldRef6}
        />
        <Text
          style={{
            margin: 10
          }}
        >
          {this.state.enToPhoneticRes}
        </Text>
        <Button title="Copy Result" type="clear" onPress={this.copy6} />
        <Text></Text>
      </View>
      <Text></Text>
      <Text style={styles.text}>NATO Phonetic to Alphabets converter</Text>

      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#ededed",
          borderRadius: 20,
          paddingTop: 20
        }}
      >
        <OutlinedTextField
          label="Phonetic Text"
          keyboardType="default"
          // formatText={this.formatText}
          onSubmitEditing={this.phoneticToEnConversion}
          ref={this.fieldRef7}
        />
        <Text
          style={{
            margin: 10
          }}
        >
          {this.state.phoneticToEnRes}
        </Text>
        <Button title="Copy Result" type="clear" onPress={this.copy7} />
      </View>

      <Text></Text>
      <Text></Text>
      <Text style={styles.text}>English to Morse Code converter</Text>
      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#ededed",
          borderRadius: 20,
          paddingTop: 20
        }}
      >
        <OutlinedTextField
          label="Normal Text"
          keyboardType="default"
          onSubmitEditing={this.enToMorseConversion}
          ref={this.fieldRef8}
        />
        <Text
          style={{
            margin: 10
          }}
        >
          {this.state.enToMorseRes}
        </Text>
        <Button title="Copy Result" type="clear" onPress={this.copy9} />
        <Text></Text>
      </View>
      <Text></Text>
      <Text style={styles.text}>Morse Code to English Converter</Text>
      <View
        style={{
          padding: 10,
          margin: 10,
          backgroundColor: "#ededed",
          borderRadius: 20,
          paddingTop: 20
        }}
      >
        <OutlinedTextField
          label="Morse Code"
          keyboardType="default"
          // formatText={this.formatText}
          onSubmitEditing={this.morseToEnConversion}
          ref={this.fieldRef9}
        />
        <Text
          style={{
            margin: 10
          }}
        >
          {this.state.morseToEnglishRes}
        </Text>
        <Button title="Copy Result" type="clear" onPress={this.copy8} />
      </View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
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

  fieldRef6 = React.createRef();

  fieldRef7 = React.createRef();

  fieldRef8 = React.createRef();

  fieldRef9 = React.createRef();

  morseToEnConversion = () => {
    let { current: field } = this.fieldRef9;

    console.log(field.value());

    var morse = field.value().toUpperCase();

    var results = "";

    var inputArray = morse.split(" ");

    for (var i = 0; i < inputArray.length; i++) {
      switch (inputArray[i]) {
        case "._":
          results = results + "A ";
          break;
        case "_...":
          results = results + "B ";
          break;
        case "_._.":
          results = results + "C ";
          break;
        case "_..":
          results = results + "D ";
          break;
        case ".":
          results = results + "E ";
          break;
        case ".._.":
          results = results + "F ";
          break;
        case "__.":
          results = results + "G ";
          break;
        case "....":
          results = results + "H ";
          break;
        case "..":
          results = results + "I ";
          break;
        case ".___":
          results = results + "J ";
          break;
        case "_._":
          results = results + "K ";
          break;
        case "._..":
          results = results + "L ";
          break;
        case "__":
          results = results + "M ";
          break;
        case "_.":
          results = results + "N ";
          break;
        case "___":
          results = results + "O ";
          break;
        case ".__.":
          results = results + "P ";
          break;
        case "__._":
          results = results + "Q ";
          break;
        case "._.":
          results = results + "R ";
          break;
        case "...":
          results = results + "S ";
          break;
        case "_":
          results = results + "T ";
          break;
        case ".._":
          results = results + "U ";
          break;
        case "..._":
          results = results + "V ";
          break;
        case ".__":
          results = results + "W ";
          break;
        case "_.._":
          results = results + "X ";
          break;
        case "_.__":
          results = results + "Y ";
          break;
        case "__..":
          results = results + "Z ";
          break;
        case " ":
          results = results + " ";
          break;
        default:
          results = results + morse.charAt(i) + " ";
      }
    }
    this.setState({ morseToEnglishRes: results });
  };

  enToMorseConversion = () => {
    let { current: field } = this.fieldRef8;

    console.log(field.value());

    var english = field.value().toUpperCase();

    var results = "";

    for (var i = 0; i < english.length; i++) {
      switch (english.charAt(i)) {
        case "A":
          results = results + "._ ";
          break;
        case "B":
          results = results + "_... ";
          break;
        case "C":
          results = results + "_._. ";
          break;
        case "D":
          results = results + "_.. ";
          break;
        case "E":
          results = results + ". ";
          break;
        case "F":
          results = results + ".._. ";
          break;
        case "G":
          results = results + "__. ";
          break;
        case "H":
          results = results + ".... ";
          break;
        case "I":
          results = results + ".. ";
          break;
        case "J":
          results = results + ".___ ";
          break;
        case "K":
          results = results + "_._ ";
          break;
        case "L":
          results = results + "._.. ";
          break;
        case "M":
          results = results + "__ ";
          break;
        case "N":
          results = results + "_. ";
          break;
        case "O":
          results = results + "___ ";
          break;
        case "P":
          results = results + ".__. ";
          break;
        case "Q":
          results = results + "__._ ";
          break;
        case "R":
          results = results + "._. ";
          break;
        case "S":
          results = results + "... ";
          break;
        case "T":
          results = results + "_ ";
          break;
        case "U":
          results = results + ".._ ";
          break;
        case "V":
          results = results + "..._ ";
          break;
        case "W":
          results = results + ".__ ";
          break;
        case "X":
          results = results + "_.._ ";
          break;
        case "Y":
          results = results + "_.__ ";
          break;
        case "Z":
          results = results + "__.. ";
          break;
        case " ":
          results = results + " " + " ";
          break;
        default:
          results = results + text.charAt(i) + " ";
      }
    }
    this.setState({ enToMorseRes: results });
  };

  phoneticToEnConversion = () => {
    let { current: field } = this.fieldRef7;

    console.log(field.value());

    var english = field.value().toUpperCase();
    var inputArray = english.split(" ");

    var resString = "";

    var firstLetter = "";

    for (var i = 0; i < inputArray.length; i++) {
      firstLetter = inputArray[i][0];
      if (firstLetter == undefined) {
        resString = resString;
      } else {
        resString = resString + firstLetter + " ";
      }
    }
    this.setState({ phoneticToEnRes: resString });
  };

  enToPhoneticConversion = () => {
    let { current: field } = this.fieldRef6;

    console.log(field.value());

    var english = field.value().toUpperCase();

    var results = "";

    for (var i = 0; i < english.length; i++) {
      switch (english.charAt(i)) {
        case "A":
          results = results + "alfa ";
          break;
        case "B":
          results = results + "bravo ";
          break;
        case "C":
          results = results + "charlie ";
          break;
        case "D":
          results = results + "delta ";
          break;
        case "E":
          results = results + "echo ";
          break;
        case "F":
          results = results + "foxtrot ";
          break;
        case "G":
          results = results + "golf ";
          break;
        case "H":
          results = results + "hotel ";
          break;
        case "I":
          results = results + "india ";
          break;
        case "J":
          results = results + "juliett ";
          break;
        case "K":
          results = results + "kilo ";
          break;
        case "L":
          results = results + "lima ";
          break;
        case "M":
          results = results + "mike ";
          break;
        case "N":
          results = results + "november ";
          break;
        case "O":
          results = results + "oscar ";
          break;
        case "P":
          results = results + "papa ";
          break;
        case "Q":
          results = results + "quebec ";
          break;
        case "R":
          results = results + "romeo ";
          break;
        case "S":
          results = results + "sierra ";
          break;
        case "T":
          results = results + "tango ";
          break;
        case "U":
          results = results + "uniform ";
          break;
        case "V":
          results = results + "victor ";
          break;
        case "W":
          results = results + "whiskey ";
          break;
        case "X":
          results = results + "xray ";
          break;
        case "Y":
          results = results + "yankee ";
          break;
        case "Z":
          results = results + "zulu ";
          break;
        case " ":
          results = results + " " + " ";
          break;
        default:
          results = results + text.charAt(i) + " ";
      }
    }
    this.setState({ enToPhoneticRes: results });
  };

  decToBinAndHex = () => {
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

  binToDecAndHex = () => {
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

  hexToBinAndDec = () => {
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

  textToBin = () => {
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
    this.setState({ binToTextRes: bin });
  };

  binToText = () => {
    let { current: field } = this.fieldRef5;

    console.log(field.value());

    var text = "";
    var input = field.value();
    input.split(" ").map(function(bin) {
      text += String.fromCharCode(parseInt(bin, 2));
    });
    this.setState({ textToBinRes: text });
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
    Clipboard.setString(this.state.textToBinRes);
  };

  copy5 = () => {
    Clipboard.setString(this.state.binToTextRes);
  };

  copy6 = () => {
    Clipboard.setString(this.state.enToPhoneticRes);
  };

  copy7 = () => {
    Clipboard.setString(this.state.phoneticToEnRes);
  };

  copy8 = () => {
    Clipboard.setString(this.state.morseToEnglishRes);
  };

  copy9 = () => {
    Clipboard.setString(this.state.enToMorseRes);
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
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    marginTop: 20
  },
  button: {
    marginLeft: 30,
    marginRight: 30
  }
});
