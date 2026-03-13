import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import * as Yup from "yup";
import { globalStyles } from "../constants/styles";

// Validation schema for sign in form
const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// TODO: complete form UI
export default function SignInScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.scrollContent}>
        <Text style={globalStyles.title}>Sign In</Text>
      </View>
    </SafeAreaView>
  );
}
