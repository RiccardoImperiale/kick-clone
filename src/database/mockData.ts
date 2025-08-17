import type { Tables } from './database.types'

const livestreamUUIDs = [
    'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
    'c3d4e5f6-a7b8-9012-3456-7890abcdef12',
    'd4e5f6a7-b8c9-0123-4567-890abcdef123',
    'e5f6a7b8-c9d0-1234-5678-90abcdef1234',
]

export const livestreams: Tables<'livestreams'>[] = [
    {
        id: livestreamUUIDs[0],
        name: 'Livestream 1',
        categories: ['Gaming', 'Action'],
        created_at: `2024-07-20T10:00:00Z`,
        profile_image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
        username: 'BeastMaster64',
    },
    {
        id: livestreamUUIDs[1],
        name: 'Livestream 2',
        categories: ['Music', 'Vlog'],
        created_at: `2024-07-20T10:00:00Z`,
        profile_image_url: 'https://randomuser.me/api/portraits/men/2.jpg',
        username: 'GamingGuru',
    },
    {
        id: livestreamUUIDs[2],
        name: 'Livestream 3',
        categories: ['Art'],
        created_at: `2024-07-20T10:00:00Z`,
        profile_image_url: 'https://randomuser.me/api/portraits/women/3.jpg',
        username: 'StreamQueen',
    },
    {
        id: livestreamUUIDs[3],
        name: 'Livestream 4',
        categories: ['Cooking', 'Food', 'Tutorial'],
        created_at: `2024-07-20T10:00:00Z`,
        profile_image_url: 'https://randomuser.me/api/portraits/men/4.jpg',
        username: 'CodeWizard',
    },
    {
        id: livestreamUUIDs[4],
        name: 'Livestream 5',
        categories: ['Travel', 'Adventure'],
        created_at: `2024-07-20T10:00:00Z`,
        profile_image_url: 'https://randomuser.me/api/portraits/women/5.jpg',
        username: 'ArtisticSoul',
    },
]
