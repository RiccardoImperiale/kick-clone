'use client'
import { useEffect, useState } from 'react'
import { StreamTheme, StreamVideo, StreamVideoClient, Call, StreamCall, User } from '@stream-io/video-react-sdk'
import { User as UserData } from '@/lib/apiTypes'
import { StreamerView } from '../stream-view/SreamView'
import { createToken } from '@/actions/streamers'
import { getClient } from '@/lib/streamClient'

interface StreamerPreviewProps {
    userData: UserData | null
}

export const StreamerPreview = (props: StreamerPreviewProps) => {
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)

    useEffect(() => {
        const enterCall = async () => {
            const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
            if (!apiKey) {
                throw new Error('NEXT_PUBLIC_STREAM_API_KEY is not set')
            }
            if (!props.userData?.id) {
                return
            }
            if (client && call) {
                return
            }
            if (!props.userData) {
                throw new Error('User data not found')
            }
            const callId = props.userData.username.toLowerCase()
            const token = await createToken(props.userData.id)
            const user: User = {
                id: props.userData.id,
                name: props.userData.username,
            }
            const streamClient = getClient({
                apiKey: apiKey,
                user: user,
                userToken: token,
            })
            const streamCall = streamClient.call('livestream', callId)
            await streamCall.join({ create: true })
            setClient(streamClient)
            setCall(streamCall)
        }
        enterCall()
    }, [props.userData, client, call])

    return (
        <>
            {client && call && (
                <StreamTheme>
                    <StreamVideo client={client}>
                        <StreamCall call={call}>
                            <StreamerView call={call} username={props.userData?.username} />
                        </StreamCall>
                    </StreamVideo>
                </StreamTheme>
            )}
        </>
    )
}
