import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://umegcilmduzlettoxpcy.supabase.co'
const supabaseAnonKey = 'sb_publishable_BkY6O87CvGi8ESMTlKUmrg_mIhVdofW'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
  }
})