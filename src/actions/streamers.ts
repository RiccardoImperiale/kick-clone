'use server'

import { ApiResponse, NewStreamer, Streamer } from '@/lib/apiTypes'
import { createClient } from '@/utils/supabase/server'
import { StreamClient } from '@stream-io/node-sdk'

export async function getStreamer(id: string): Promise<Streamer | null> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('streamers').select('*').eq('id', id).single()

    if (error) {
        console.error('Error fetching streamer:', error)
        return null
    }

    return data
}

export async function getRecommended(): Promise<Streamer[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('streamers').select('*').limit(10)

    if (error) {
        console.error('Error fetching livestreams:', error)
        return []
    }

    return data
}

export async function createToken(userId: string) {
    const apiKey = process.env.STREAM_API_KEY
    const apiSecret = process.env.STREAM_SECRET
    if (!apiKey) {
        console.error('STREAM_API_KEY is not set')
        return undefined
    }
    if (!apiSecret) {
        console.error('STREAM_API_SECRET is not set')
        return undefined
    }
    console.log('Creating token for user: ', userId)
    const client = new StreamClient(apiKey, apiSecret)
    const validityInSeconds = 4 * 60 * 60 // 4 hours
    const token = client.generateUserToken({
        user_id: userId,
        validity_in_seconds: validityInSeconds,
    })
    return token
}

export async function createStreamer(payload: NewStreamer, userId: string): ApiResponse<Streamer> {
    const supabase = await createClient()

    // Check if user is already a streamer
    const { data: existingStreamer, error: fetchError } = await supabase
        .from('streamers')
        .select('username')
        .eq('username', payload.username)
        .maybeSingle()

    if (fetchError) return { success: false, message: fetchError.message }
    if (existingStreamer) return { success: false, message: 'You are already a streamer' }

    // Insert streamer
    const { data: streamer, error } = await supabase.from('streamers').insert(payload).select('*').single()
    if (error || !streamer) return { success: false, message: error?.message || 'Failed to create streamer' }

    // Update user's streamer_id
    const { error: userUpdateError } = await supabase.from('users').update({ streamer_id: streamer.id }).eq('id', userId)
    if (userUpdateError) return { success: false, message: userUpdateError.message }

    // Sync with Stream API
    const apiToken = await createToken(streamer.id)
    if (!apiToken) return { success: false, message: 'Failed to create Stream token' }

    const apiKey = process.env.STREAM_API_KEY!
    const client = new StreamClient(apiKey, process.env.STREAM_SECRET!)
    await client.upsertUsers([
        {
            id: streamer.id,
            name: streamer.username,
            image: streamer.profile_image_url,
            role: 'user',
        },
    ])

    return { success: true, data: streamer, message: '' }
}
