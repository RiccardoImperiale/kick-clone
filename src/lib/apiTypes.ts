import { Tables, TablesInsert } from '@/database/database.types'

export type User = Tables<'users'>
export type Streamer = Tables<'streamers'>
export type Category = Tables<'categories'>
export type Livestream = Tables<'livestreams'>
export type NewStreamer = TablesInsert<'streamers'>

export type ApiResponse<T> = Promise<{
    success: boolean
    data?: T
    message?: string
}>
