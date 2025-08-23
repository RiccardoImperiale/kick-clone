export type Category = {
    id: string
    image_url: string
    name: string
    tags: string[] | null
}

export type Livestream = {
    id: string
    image_url: string
    title: string
    category_id: string
    streamer_id: string
    tags: string[] | null
}

export type Streamer = {
    id?: string
    profile_image_url?: string | null
    tags?: string[]
    username: string
    category_id?: string
}

export type User = {
    id: string
    email: string
    image_url: string | null
    streamer_id: string | null
    username: string
}
