import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { auth, db } from "../firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password harus diisi.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const docRef = doc(db, "mahasiswa", uid);
      const snap = await getDoc(docRef);

      if (!snap.exists()) {
        Alert.alert("You don't have an account", "", [
          {
            text: "OK",
            onPress: () => navigation.navigate("SignUp"),
          },
        ]);
        return;
      }

      const data = snap.data();
      const nama = data?.nama || "Mahasiswa";

      await AsyncStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          uid,
          ...data,
          email: userCredential.user.email,
        })
      );

      Alert.alert(`Welcome, ${nama}!`, "", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      console.log("Login error", error);
      if (error.code === "auth/user-not-found") {
        Alert.alert("You don't have an account", "", [
          {
            text: "OK",
            onPress: () => navigation.navigate("SignUp"),
          },
        ]);
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Password salah.");
      } else {
        Alert.alert("Login Error", error.message || "Terjadi kesalahan.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Header</Text>
      <Text style={styles.subHeader}>Log In</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subHeader: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 6 },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 6, marginTop: 10 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  link: { marginTop: 15, color: "#007AFF", textAlign: "center" },
});