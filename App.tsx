import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Input } from "./src/components/Input";
import { InputRoot } from "./src/components/InputRoot";
import { FontAwesome } from "@expo/vector-icons";
export default function App() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <InputRoot>
          <FontAwesome name="lock" />
          <Input />
        </InputRoot>
        <InputRoot>
          <FontAwesome name="lock" />
          <Input />
        </InputRoot>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    gap: 10,
  },
});
