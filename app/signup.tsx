import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function SignUpScreen() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!nama || !nim || !jurusan || !email || !password) {
      Alert.alert("Error", "Semua field harus diisi.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const dataMahasiswa = { nama, nim, jurusan, email };

      await setDoc(doc(db, "mahasiswa", uid), dataMahasiswa);

      await AsyncStorage.setItem(
        "lastRegisteredUser",
        JSON.stringify({ uid, ...dataMahasiswa })
      );

      Alert.alert("You're all set!", "", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (err: any) {
      console.log("Sign up error", err);

      if (err.code === "auth/email-already-in-use") {
        Alert.alert("Email sudah terdaftar", "Silakan Log In.", [
          { text: "OK", onPress: () => router.replace("/login") },
        ]);
      } else {
        Alert.alert("Sign Up Error", err.message || "Terjadi kesalahan.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Sign Up</Text>

      <TextInput placeholder="Nama" style={styles.input} onChangeText={setNama} />
      <TextInput placeholder="NIM" style={styles.input} onChangeText={setNim} />
      <TextInput placeholder="Jurusan" style={styles.input} onChangeText={setJurusan} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subHeader: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 6 },
  button: {
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  link: { marginTop: 15, color: "#007AFF", textAlign: "center" },
});