'use server'

import { Tables } from '@/database/database.types'
import { createClient } from '@/utils/supabase/server'

type Livestream = Tables<'livestreams'>

// export async function getLivestreams(): Promise<Livestream[]> {
//     const supabase = await createClient()

//     const { data, error } = await supabase.from('livestreams').select('*')

//     if (error) {
//         console.error('Error fetching livestreams:', error)
//         return []
//     }

//     return data
// }

export async function getRecommended(): Promise<Livestream[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('livestreams').select('*').limit(10)

    if (error) {
        console.error('Error fetching livestreams:', error)
        return []
    }

    return data
}

export async function getLivestreams(filters?: { categoryId?: string; limit?: number }): Promise<Livestream[]> {
    const supabase = await createClient()

    let query = supabase.from('livestreams').select('*')

    if (filters?.categoryId !== undefined) {
        query = query.eq('category_id', filters.categoryId)
    }

    if (filters?.limit !== undefined) {
        query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching livestreams:', error)
        return []
    }

    return data
}
