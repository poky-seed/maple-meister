import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Profile } from './profile'

export type User = SupabaseUser & Profile
