import { Formik } from "formik";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import { colors, globalStyles } from "../constants/styles";

const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: any, { resetForm }: any) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "✅ Account Created",
        `Welcome, ${values.fullName}! Your account has been created.`,
        [{ text: "OK", onPress: () => resetForm() }],
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={globalStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={globalStyles.card}>
          <Text style={globalStyles.title}>Create Account</Text>
          <Text style={globalStyles.subtitle}>Sign up to get started</Text>

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signUpSchema}
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
                  label="Full Name"
                  iconName="person-outline"
                  placeholder="Enter your full name"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  error={errors.fullName}
                  touched={touched.fullName}
                  autoCapitalize="words"
                />

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
                  placeholder="Create a password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password}
                  touched={touched.password}
                  isPassword
                />

                <FormInput
                  label="Confirm Password"
                  iconName="shield-checkmark-outline"
                  placeholder="Re-enter your password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
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
                    <Text style={globalStyles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    globalStyles.button,
                    {
                      backgroundColor: "transparent",
                      borderWidth: 1.5,
                      borderColor: colors.primary,
                      marginTop: 10,
                    },
                  ]}
                  onPress={() => resetForm()}
                >
                  <Text
                    style={[globalStyles.buttonText, { color: colors.primary }]}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
