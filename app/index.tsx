import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/styles";

const screens = [
  { route: "/employee", icon: "person-outline", label: "Employee Information Form", desc: "5-field form with full Yup validation" },
  { route: "/sign-in", icon: "log-in-outline", label: "Sign In", desc: "Email & password authentication form" },
  { route: "/sign-up", icon: "person-add-outline", label: "Sign Up", desc: "Full registration with password confirmation" },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Form Demos</Text>
        <Text style={styles.subtitle}>Formik + Yup · Expo · React Native</Text>
      </View>
      <View style={styles.list}>
        {screens.map((s) => (
          <TouchableOpacity key={s.route} style={styles.card} onPress={() => router.push(s.route as any)}>
            <View style={styles.iconBox}>
              <Ionicons name={s.icon as any} size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{s.label}</Text>
              <Text style={styles.cardDesc}>{s.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24 },
  header: { marginTop: 32, marginBottom: 36 },
  title: { fontSize: 32, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  list: { gap: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 15, fontWeight: "600", color: colors.text },
  cardDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});