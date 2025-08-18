import type { Tables } from './database.types'

import justChatting from '../assets/categories/just-chatting.webp'
import fortnite from '../assets/categories/fortnite.webp'
import gta from '../assets/categories/gta.webp'
import irl from '../assets/categories/irl.webp'
import minecraft from '../assets/categories/minecraft.webp'
import warzone from '../assets/categories/warzone.webp'
import vtubers from '../assets/categories/vtubers.webp'
import battleGrounds from '../assets/categories/battlegrounds.webp'
import counterStrike from '../assets/categories/counter-strike.webp'
import leagueOfLegends from '../assets/categories/lol.webp'
import dota2 from '../assets/categories/dota2.webp'

const categoriesUUIDs = [
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

const livestreamUUIDs = [
    'f7c9b4f0-3f25-44d8-9a5d-22e9f4e5c9a1',
    'a6e1d2c3-4b5f-6789-abcd-1234567890ef',
    'c8d9e0f1-2345-6789-abcd-ef1234567890',
    'b7a8c9d0-1e2f-3456-7890-abcdef123456',
    'd3e4f5a6-b7c8-9012-3456-7890abcdef12',
    'e9f0a1b2-c3d4-5678-9012-34567890abcd',
    'f1a2b3c4-d5e6-7890-1234-567890abcdef',
    'a3b4c5d6-e7f8-9012-3456-7890abcdef12',
    'c1d2e3f4-a5b6-7890-1234-56789abcdef0',
    'd5e6f7a8-b9c0-1234-5678-90abcdef1234',
]

export const categories: Tables<'categories'>[] = [
    {
        id: categoriesUUIDs[0],
        created_at: '2024-07-20T10:00:00Z',
        name: 'Just Chatting',
        tags: ['IRL', 'RPG'],
        image_url: justChatting.src,
    },
    {
        id: categoriesUUIDs[1],
        created_at: '2024-07-20T10:01:00Z',
        name: 'Fortnite',
        tags: ['Live', 'Concerts'],
        image_url: fortnite.src,
    },
    {
        id: categoriesUUIDs[2],
        created_at: '2024-07-20T10:02:00Z',
        name: 'Grand Theft Auto V',
        tags: ['Football', 'Basketball'],
        image_url: gta.src,
    },
    {
        id: categoriesUUIDs[3],
        created_at: '2024-07-20T10:03:00Z',
        name: 'IRL',
        tags: ['Lifestyle', 'Vlogs'],
        image_url: irl.src,
    },
    {
        id: categoriesUUIDs[4],
        created_at: '2024-07-20T10:04:00Z',
        name: 'Minecraft',
        tags: ['Talk', 'Q&A'],
        image_url: minecraft.src,
    },
    {
        id: categoriesUUIDs[5],
        created_at: '2024-07-20T10:05:00Z',
        name: 'Warzone',
        tags: ['Science', 'Coding'],
        image_url: warzone.src,
    },
    {
        id: categoriesUUIDs[6],
        created_at: '2024-07-20T10:06:00Z',
        name: 'Vtubers',
        tags: ['Politics', 'World'],
        image_url: vtubers.src,
    },
    {
        id: categoriesUUIDs[7],
        created_at: '2024-07-20T10:07:00Z',
        name: 'Battlegrounds',
        tags: ['AI', 'Startups'],
        image_url: battleGrounds.src,
    },
    {
        id: categoriesUUIDs[8],
        created_at: '2024-07-20T10:08:00Z',
        name: 'Counter-Strike',
        tags: ['Food', 'Recipes'],
        image_url: counterStrike.src,
    },
    {
        id: categoriesUUIDs[9],
        created_at: '2024-07-20T10:09:00Z',
        name: 'League of Legends',
        tags: ['Workout', 'Health'],
        image_url: leagueOfLegends.src,
    },
    {
        id: categoriesUUIDs[10],
        created_at: '2024-07-20T10:10:00Z',
        name: 'Dota 2',
        tags: ['Adventure', 'Vlogs'],
        image_url: dota2.src,
    },
]

export const livestreams: Tables<'livestreams'>[] = [
    {
        id: livestreamUUIDs[0],
        created_at: '2024-07-20T12:00:00Z',
        name: 'Pro Gamer Showdown',
        categories: ['Gaming'],
        profile_image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
        username: 'BeastMaster64',
        is_live: true,
        category_id: categoriesUUIDs[0],
    },
    {
        id: livestreamUUIDs[1],
        created_at: '2024-07-20T12:01:00Z',
        name: 'Live Acoustic Session',
        categories: ['Music'],
        profile_image_url: 'https://randomuser.me/api/portraits/women/2.jpg',
        username: 'AcousticAmy',
        is_live: true,
        category_id: categoriesUUIDs[1],
    },
    {
        id: livestreamUUIDs[2],
        created_at: '2024-07-20T12:02:00Z',
        name: 'Football Highlights',
        categories: ['Sports'],
        profile_image_url: 'https://randomuser.me/api/portraits/men/3.jpg',
        username: 'SportyMike',
        is_live: false,
        category_id: categoriesUUIDs[2],
    },
    {
        id: livestreamUUIDs[3],
        created_at: '2024-07-20T12:03:00Z',
        name: 'Day in My Life',
        categories: ['IRL'],
        profile_image_url: 'https://randomuser.me/api/portraits/women/4.jpg',
        username: 'LifewithJen',
        is_live: true,
        category_id: categoriesUUIDs[3],
    },
    {
        id: livestreamUUIDs[4],
        created_at: '2024-07-20T12:04:00Z',
        name: 'Late Night Chat',
        categories: ['Just Chatting'],
        profile_image_url: 'https://randomuser.me/api/portraits/men/5.jpg',
        username: 'ChatKing',
        is_live: true,
        category_id: categoriesUUIDs[4],
    },
    {
        id: livestreamUUIDs[5],
        created_at: '2024-07-20T12:05:00Z',
        name: 'Learn TypeScript',
        categories: ['Education'],
        profile_image_url: 'https://randomuser.me/api/portraits/women/6.jpg',
        username: 'CodeWithAnna',
        is_live: false,
        category_id: categoriesUUIDs[5],
    },
    {
        id: livestreamUUIDs[6],
        created_at: '2024-07-20T12:06:00Z',
        name: 'Breaking World News',
        categories: ['News'],
        profile_image_url: 'https://randomuser.me/api/portraits/men/7.jpg',
        username: 'NewsGuy',
        is_live: true,
        category_id: categoriesUUIDs[6],
    },
    {
        id: livestreamUUIDs[7],
        created_at: '2024-07-20T12:07:00Z',
        name: 'Exploring AI Startups',
        categories: ['Tech'],
        profile_image_url: 'https://randomuser.me/api/portraits/women/8.jpg',
        username: 'TechieTina',
        is_live: false,
        category_id: categoriesUUIDs[7],
    },
    {
        id: livestreamUUIDs[8],
        created_at: '2024-07-20T12:08:00Z',
        name: 'Cooking Pasta Live',
        categories: ['Cooking'],
        profile_image_url: 'https://randomuser.me/api/portraits/men/9.jpg',
        username: 'ChefMario',
        is_live: true,
        category_id: categoriesUUIDs[8],
    },
    {
        id: livestreamUUIDs[9],
        created_at: '2024-07-20T12:09:00Z',
        name: 'Morning Workout',
        categories: ['Fitness'],
        profile_image_url: 'https://randomuser.me/api/portraits/women/10.jpg',
        username: 'FitLara',
        is_live: true,
        category_id: categoriesUUIDs[9],
    },
]
