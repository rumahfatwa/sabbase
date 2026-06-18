import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { supabase } from "../../lib/subbase";
import { router, Stack } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async () => {
    setErrorMsg("");
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      window.alert("Akun berhasil dibuat! Silahkan login.");
      router.replace("/(count)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.card}>
        <Text style={styles.title}>Buat Akun</Text>
        <Text style={styles.subtitle}>
          Daftar untuk mulai menggunakan aplikasi
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="contoh@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMsg("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
            style={[styles.input, errorMsg ? styles.inputError : null]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputRow, errorMsg ? styles.inputError : null]}>
            <TextInput
              placeholder="Masukkan password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrorMsg("");
              }}
              secureTextEntry={!showPassword}
              placeholderTextColor="#aaa"
              style={styles.inputFlex}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.lihatBtn}
            >
              <Text style={styles.lihatText}>
                {showPassword ? "Sembunyikan" : "Lihat"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {errorMsg ? (
          <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
        ) : (
          <View style={{ height: 16 }} />
        )}

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
        >
          <Text style={styles.btnPrimaryText}>
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>atau</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/(count)/login")}
          style={styles.btnSecondary}
        >
          <Text style={styles.btnSecondaryText}>
            Sudah punya akun? <Text style={styles.btnSecondaryBold}>Masuk</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 28,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
    color: "#1a1a1a",
    backgroundColor: "#fafafa",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  inputFlex: {
    flex: 1,
    padding: 13,
    fontSize: 14,
    color: "#1a1a1a",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  lihatBtn: {
    paddingHorizontal: 14,
  },
  lihatText: {
    color: "#3ECF8E",
    fontSize: 13,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 13,
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  btnDisabled: {
    backgroundColor: "#aaa",
  },
  btnPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#aaa",
    fontSize: 13,
  },
  btnSecondary: {
    alignItems: "center",
  },
  btnSecondaryText: {
    color: "#888",
    fontSize: 14,
  },
  btnSecondaryBold: {
    color: "#3ECF8E",
    fontWeight: "700",
  },
});
