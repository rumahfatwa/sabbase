import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { supabase } from "../../lib/subbase"
import { router,Stack} from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    setErrorMsg('')
    if (!email && !password) {
      setErrorMsg('Anda belum mendaftar, silahkan register terlebih dahulu.')
      return
    }
    if (!email) {
      setErrorMsg('Email tidak boleh kosong.')
      return
    }
    if (!password) {
      setErrorMsg('Password tidak boleh kosong.')
      return
    }

    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setErrorMsg('Email atau password salah. Jika belum mendaftar, silahkan register.')
      } else if (error.message.includes('Email not confirmed')) {
        setErrorMsg('Email belum dikonfirmasi, cek inbox email kamu.')
      } else {
        setErrorMsg(error.message)
      }
    } else {
      router.replace('/(count)/home')
    }
  }

  return (

    
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, alignItems:"center"}}>
        <Stack.Screen options={{ headerShown: false }} />
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 32 }}>Login</Text>
   <View style = {{maxWidth: 500,width:"100%"}}>
 <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => { setEmail(text); setErrorMsg('') }}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: errorMsg ? '#ff4444' : '#ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 12
        }}
      />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: errorMsg ? '#ff4444' : '#ccc',
        borderRadius: 8,
        marginBottom: 8,
      }}>
        <View style = {{}}>
            
        </View>
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
        <Text style={{ color: '#ff4444', marginBottom: 16, fontSize: 13 }}>
          ⚠️ {errorMsg}
        </Text>
      ) : (
        <View style={{ marginBottom: 16 }} />
      )}

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{ backgroundColor: loading ? '#aaa' : '#3ECF8E', padding: 14, borderRadius: 8, marginBottom: 12 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace('/(count)/register')}
        style={{ padding: 14 }}
      >
        <Text style={{ textAlign: 'center', color: '#1C1C1C' }}>Belum punya akun? Register</Text>
      </TouchableOpacity>
   </View>
     
    </View>
    
  )
}