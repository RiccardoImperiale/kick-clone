import type { Tables } from '../database.types'

export const categoriesUUIDs = [
    'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    'b2c3d4e5-f6a7-8901-2345-67890abcdef1',
    'c3d4e5f6-a7b8-9012-3456-7890abcdef12',
    'd4e5f6a7-b8c9-0123-4567-890abcdef123',
    'e5f6a7b8-c9d0-1234-5678-90abcdef1234',
    'f6a7b8c9-d0e1-2345-6789-0abcdef12345',
    'a7b8c9d0-e1f2-3456-7890-abcdef123456',
    'b8c9d0e1-f2a3-4567-8901-bcdef1234567',
    'c9d0e1f2-a3b4-5678-9012-cdef12345678',
    'd0e1f2a3-b4c5-6789-0123-def123456789',
    'e1f2a3b4-c5d6-7890-1234-ef1234567890',
]

export const categories: Tables<'categories'>[] = [
    {
        id: categoriesUUIDs[0],
        created_at: '2024-07-20T10:00:00Z',
        name: 'Just Chatting',
        tags: ['IRL', 'RPG'],
        image_url: '/categories/just-chatting.png',
    },
    {
        id: categoriesUUIDs[1],
        created_at: '2024-07-20T10:01:00Z',
        name: 'Fortnite',
        tags: ['Live', 'Concerts'],
        image_url: '/categories/fortnite.png',
    },
    {
        id: categoriesUUIDs[2],
        created_at: '2024-07-20T10:02:00Z',
        name: 'Grand Theft Auto V',
        tags: ['Football', 'Basketball'],
        image_url: '/categories/gta.png',
    },
    { id: categoriesUUIDs[3], created_at: '2024-07-20T10:03:00Z', name: 'IRL', tags: ['Lifestyle', 'Vlogs'], image_url: '/categories/irl.png' },
    { id: categoriesUUIDs[4], created_at: '2024-07-20T10:04:00Z', name: 'Minecraft', tags: ['Talk', 'Q&A'], image_url: '/categories/minecraft.png' },
    {
        id: categoriesUUIDs[5],
        created_at: '2024-07-20T10:05:00Z',
        name: 'Warzone',
        tags: ['Science', 'Coding'],
        image_url: '/categories/warzone.png',
    },
    {
        id: categoriesUUIDs[6],
        created_at: '2024-07-20T10:06:00Z',
        name: 'Vtubers',
        tags: ['Politics', 'World'],
        image_url: '/categories/vtubers.png',
    },
    {
        id: categoriesUUIDs[7],
        created_at: '2024-07-20T10:07:00Z',
        name: 'Battlegrounds',
        tags: ['AI', 'Startups'],
        image_url: '/categories/battlegrounds.png',
    },
    {
        id: categoriesUUIDs[8],
        created_at: '2024-07-20T10:08:00Z',
        name: 'Counter-Strike',
        tags: ['Food', 'Recipes'],
        image_url: '/categories/counter-strike.png',
    },
    {
        id: categoriesUUIDs[9],
        created_at: '2024-07-20T10:09:00Z',
        name: 'League of Legends',
        tags: ['Workout', 'Health'],
        image_url: '/categories/lol.png',
    },
    { id: categoriesUUIDs[10], created_at: '2024-07-20T10:10:00Z', name: 'Dota 2', tags: ['Adventure', 'Vlogs'], image_url: '/categories/dota2.png' },
]
