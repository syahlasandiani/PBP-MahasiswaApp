// screens/HomeScreen.js
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Data Mahasiswa</Text>

      <View style={styles.box}>
        <Text>Nama: -</Text>
        <Text>NIM: -</Text>
        <Text>Jurusan: -</Text>
        <Text>Email: -</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  box: { borderWidth: 1, padding: 20, borderRadius: 8 }
});