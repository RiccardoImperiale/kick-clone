'use server'

import { Tables } from '@/database/database.types'
import { createClient } from '@/utils/supabase/server'

type Category = Tables<'categories'>

export async function getCategories(filters?: { limit?: number }): Promise<Category[]> {
    const supabase = await createClient()

    let query = supabase.from('categories').select('*')

    if (filters?.limit !== undefined) {
        query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data
}

export async function getTopCategories(): Promise<Category[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('categories').select('*').limit(10)

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data
}
