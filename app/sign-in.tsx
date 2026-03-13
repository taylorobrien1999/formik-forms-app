import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import { globalStyles, colors } from "../constants/styles";

const signInSchema = Yup.object().shape({
  email: Yup.string()
  .email("Please enter a valid email address")
  .required("Email is required"),
  password: Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required"),
});

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any, { resetForm }: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("✅ Signed In", `Welcome back, ${values.email}!`, [
        { text: "OK", onPress: () => resetForm() },
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={globalStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={globalStyles.card}>
          <Text style={globalStyles.title}>Welcome Back</Text>
          <Text style={globalStyles.subtitle}>Sign in to your account</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
              resetForm,
            }) => (
              <View>
                <FormInput
                  label="Email Address"
                  iconName="mail-outline"
                  placeholder="you@example.com"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <FormInput
                  label="Password"
                  iconName="lock-closed-outline"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password}
                  touched={touched.password}
                  isPassword
                />

                <TouchableOpacity
                  style={[
                    globalStyles.button,
                    (!isValid || !dirty) && globalStyles.buttonDisabled,
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !dirty || loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={globalStyles.buttonText}>Sign In</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[globalStyles.button, { backgroundColor: "transparent", borderWidth: 1.5, borderColor: colors.primary, marginTop: 10 }]}
                  onPress={() => resetForm()}
                >
                  <Text style={[globalStyles.buttonText, { color: colors.primary }]}>Reset</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
