console.log('🌱 Seeding database...')

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

import type { Database } from '../database/database.types.ts'
import { categories } from '../database/mock-data/categories.ts'
import { streamers } from '../database/mock-data/streamers.ts'
import { livestreams } from '../database/mock-data/levestreams.ts'

const supabase = createClient<Database>(supabaseUrl!, supabaseKey!)

async function clearAll() {
    // Assuming 'id' is a UUID
    await supabase.from('livestreams').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('streamers').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    console.log('🧹 Cleared all tables')
}

async function seedCategories() {
    const { error } = await supabase.from('categories').upsert(categories, { onConflict: 'id' })
    if (error) throw error
    console.log('✅ Seeded categories')
}

async function seedStreamers() {
    const { error } = await supabase.from('streamers').upsert(streamers, { onConflict: 'id' })
    if (error) throw error
    console.log('✅ Seeded streamers')
}

async function seedLivestreams() {
    const { error } = await supabase.from('livestreams').upsert(livestreams, { onConflict: 'id' })
    if (error) throw error
    console.log('✅ Seeded livestreams')
}

async function seedAll() {
    try {
        await clearAll()
        await seedCategories()
        await seedStreamers()
        await seedLivestreams()
        console.log('🎉 Database seeding completed!')
    } catch (err) {
        console.error('❌ Error seeding database:', err)
    }
}

seedAll()
