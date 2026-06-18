import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { supabase } from "../../lib/subbase"
import { router,Stack } from 'expo-router'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleRegister = async () => {
    setErrorMsg('')
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
    } else {
      window.alert('Akun berhasil dibuat! Silahkan login.')
      router.replace('/(count)/login')
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, alignItems:"center" }}>
        <Stack.Screen options={{ headerShown: false }} />
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 32 }}>Register</Text>
  <View style ={{maxWidth: 500,width:"100%"}}>
         <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => { setEmail(text); setErrorMsg('') }}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 }}
      />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 8,
      }}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => { setPassword(text); setErrorMsg('') }}
          secureTextEntry={!showPassword}
          style={{ flex: 1, padding: 12 }}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ paddingHorizontal: 12 }}
        >
          <Text style={{ color: '#888', fontSize: 13 }}>
            {showPassword ? 'Sembunyikan' : 'Lihat'}
          </Text>
        </TouchableOpacity>
      </View>

      {errorMsg ? (
        <Text style={{ color: '#ff4444', marginBottom: 16, fontSize: 13 }}>⚠️ {errorMsg}</Text>
      ) : (
        <View style={{ marginBottom: 16 }} />
      )}

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{ backgroundColor: loading ? '#aaa' : '#1C1C1C', padding: 14, borderRadius: 8, marginBottom: 12 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          {loading ? 'Memproses...' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('/(count)/login')}
        style={{ padding: 14 }}
      >
        <Text style={{ textAlign: 'center', color: '#3ECF8E' }}>Sudah punya akun? Login</Text>
      </TouchableOpacity>
  </View>
    
    </View>
  )
}