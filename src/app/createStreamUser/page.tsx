// 'use client'

// import { useState } from 'react'
// import { createStreamer } from '@/actions/streamers'
// import { useRouter } from 'next/navigation'

// export default function BecomeStreamerForm({ userId }: { userId: string }) {
//     const [username, setUsername] = useState('')
//     const [profileImageUrl, setProfileImageUrl] = useState('')
//     const router = useRouter()

//     async function handleSubmit(e: React.FormEvent) {
//         e.preventDefault()

//         const newStreamer = await createStreamer({
//             id: userId, // link Supabase user id
//             username,
//             profile_image_url: profileImageUrl,
//             category_id: '',
//             tags: [],
//         })

//         if (newStreamer) {
//             router.push(`/app/${newStreamer.id}`)
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} required />
//             <input type="url" placeholder="Profile picture URL" value={profileImageUrl} onChange={e => setProfileImageUrl(e.target.value)} />
//             <button type="submit">Become a streamer</button>
//         </form>
//     )
// }
