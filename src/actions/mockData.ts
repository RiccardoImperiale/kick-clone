'use server'

import { Tables } from '@/database/database.types'
import { categories, livestreams } from '@/database/mockData'
import { createClient } from '@/utils/supabase/server'

type Category = Tables<'categories'>
type Livestream = Tables<'livestreams'>

export async function setCategoriesMockData(): Promise<Category[]> {
    const supabase = await createClient()

    await supabase.from('categories').delete().neq('id', '')
    const { data, error } = await supabase.from('categories').insert(categories).select()

    if (error) {
        console.error('Error setting categories mock data:', error)
        return []
    }

    return data || []
}

export async function setLivestreamsMockData(): Promise<Livestream[]> {
    const supabase = await createClient()

    await setCategoriesMockData()

    await supabase.from('livestreams').delete().neq('id', '')

    const { data, error } = await supabase.from('livestreams').insert(livestreams).select()

    if (error) {
        console.error('Error setting livestreams mock data:', error)
        return []
    }

    return data || []
}
