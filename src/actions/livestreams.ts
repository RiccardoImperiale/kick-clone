'use server'

import { ApiResponse, Livestream } from '@/lib/apiTypes'
import { createClient } from '@/utils/supabase/server'

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

export async function deleteLivestream(username: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('livestreams').delete().eq('username', username)

    if (error) {
        console.error('Error deleting livestream:', error)
        return false
    }

    return true
}

export async function createLivestream(formData: FormData, username: string): ApiResponse<Livestream> {
    const supabase = await createClient()

    const { data: streamer, error: streamerError } = await supabase.from('streamers').select('*').eq('username', username).single()

    if (streamerError) {
        console.error('Error fetching streamer:', streamerError)
        return { success: false, data: undefined, message: streamerError.message }
    }

    const { data, error } = await supabase
        .from('livestreams')
        .insert({
            streamer_id: streamer?.id,
            category_id: formData.get('category'),
            title: formData.get('title'),
            username: username,
        })
        .select('*')
        .single()

    if (error) {
        console.error('Error fetching livestream:', error)
        return { success: false, data: undefined, message: error.message }
    }

    return { success: true, data, message: '' }
}
