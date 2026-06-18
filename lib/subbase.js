import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://umegcilmduzlettoxpcy.supabase.co'
const supabaseAnonKey = 'sb_publishable_WRg_hPboZNWg1wxtRcNV4g_hS4f2zj9'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
  }
})