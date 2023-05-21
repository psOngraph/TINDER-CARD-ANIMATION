import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DisplyCards from "./src/container/DisplayCard";

export default function App() {
  // const insets = useSafeAreaInsets();
  console.log("Hello I am app console");
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <DisplyCards />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
