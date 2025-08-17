// scripts/seedLivestreams.ts
console.log('🌱 Seeding livestreams...')

import { createClient } from '@supabase/supabase-js'

import type { Database } from '../database/database.types.ts'
import { livestreams } from '@/database/mockData.js'

const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function seed() {
    await supabase.from('livestreams').delete().neq('id', '')
    const { error } = await supabase.from('livestreams').insert(livestreams)
    if (error) throw error
    console.log('✅ Seeded livestreams')
}

seed().catch(console.error)
