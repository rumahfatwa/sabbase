import { View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/subbase";
import { router } from "expo-router";

export default function HomeScreen() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(count)/login");
  };

  return (
    // Kita hapus width: "100%" karena flex: 1 sudah otomatis mengisi layar
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
      }}
    >
      {/* Menambahkan textAlign: 'center' agar teks panjang tetap rapi di tengah */}
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        mantap le sudah berhasil
      </Text>

      <Text style={{ fontSize: 16, color: "#888", marginTop: 8 }}>
        ini dasbord maaf belum ke isi cuma contoh
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 40,
          backgroundColor: "#FF3B30",
          paddingVertical: 14,
          paddingHorizontal: 30,
          borderRadius: 8,
          width: "100%",
          maxWidth: 200,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
