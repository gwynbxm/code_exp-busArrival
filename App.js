import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

//grab data from the URL
//url with favourite bus stop
const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

export default function App() {
  // set up a state variable: loading that determins whether
  // the bus arrival time says loading or loaded
  const [loading, setLoading] = useState(true);
  const [displayTime, setDisplayTime] = useState("");

  //can have multiple useEffect
  useEffect(() => {
    loadBusstopData();
    const interval = setInterval(loadBusstopData, 10000);

    // return function to run when unmounting
    return () => clearInterval(interval);
  }, []);

  //async await function
  async function loadBusstopData() {
    //the moment start loading the data
    setLoading(true);
    const response = await fetch(BUSSTOP_URL);
    const responseData = await response.json();
    const busData = responseData.services.filter(
      (service) => service.no === "155"
    )[0];
    setDisplayTime(busData.next.time);
    setLoading(false);
  }

  // function loadBusstopData() {
  //   //fetch ()
  //   fetch(BUSSTOP_URL)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       console.log(responseData);
  //     });
  // }

  //Set this Auto-update instead of pressing refresh button

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.time}>
        {/* Activity Indicator is a loading animation */}
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          displayTime
        )}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={loadBusstopData}>
          Refresh!
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 36,
  },

  time: {
    fontSize: 36,
    margin: 24,
  },
  button: {
    padding: 20,
    backgroundColor: "green",
  },
  buttonText: {
    fontSize: 25,
    color: "white",
  },
});
