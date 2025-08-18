'use server'

import { Tables } from '@/database/database.types'
import { createClient } from '@/utils/supabase/server'

type Category = Tables<'categories'>

export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('categories').select('*')

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
