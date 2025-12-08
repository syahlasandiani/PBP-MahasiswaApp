import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth, db } from "../firebase";

type Mahasiswa = {
  nama: string;
  nim: string;
  jurusan: string;
  email: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<Mahasiswa | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. coba ambil dari AsyncStorage dulu
        const saved = await AsyncStorage.getItem("loggedInUser");
        if (saved) {
          setData(JSON.parse(saved));
          return;
        }

        // 2. kalau tidak ada → ambil dari Firestore
        const user = auth.currentUser;
        if (user) {
          const snap = await getDoc(doc(db, "mahasiswa", user.uid));
          if (snap.exists()) {
            const d = snap.data() as any;
            setData({
              nama: d.nama,
              nim: d.nim,
              jurusan: d.jurusan,
              email: user.email || "",
            });
          }
        }
      } catch (e) {
        console.log("Error load data mahasiswa", e);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Data Mahasiswa</Text>

      <View style={styles.box}>
        <Text>Nama: {data?.nama ?? "-"}</Text>
        <Text>NIM: {data?.nim ?? "-"}</Text>
        <Text>Jurusan: {data?.jurusan ?? "-"}</Text>
        <Text>Email: {data?.email ?? "-"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  box: { borderWidth: 1, padding: 20, borderRadius: 8 },
});