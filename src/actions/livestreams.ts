'use server'

import { Tables } from '@/database/database.types'
import { livestreams } from '@/database/mockData'
import { createClient } from '@/utils/supabase/server'

type Livestream = Tables<'livestreams'>

export async function getLivestreams(): Promise<Livestream[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('livestreams').select('*')

    if (error) {
        console.error('Error fetching livestreams:', error)
        return []
    }

    return data
}

export async function setLivestreamsMockData(): Promise<Livestream[]> {
    const supabase = await createClient()

    const livestreamIds = livestreams.map(l => l.id)
    const { error: deleteError } = await supabase.from('livestreams').delete().in('id', livestreamIds)

    if (deleteError) {
        console.error('Error deleting existing livestreams:', deleteError)
        return []
    }

    const { data, error } = await supabase.from('livestreams').insert(livestreams).select()

    if (error) {
        console.error('Error setting livestreams mock data:', error)
        return []
    }

    return data || []
}
