'use client'

import styles from './SreamView.module.scss'
import { useState } from 'react'
import { deleteLivestream } from '@/actions/livestreams'
import { Call, ParticipantView, useCallStateHooks, useDeviceList } from '@stream-io/video-react-sdk'
import { Button } from '@/components/button/Button'
import { GoLiveModal } from '@/components/popups/go-live-modal/GoLiveModal'
import { OffLineImg } from '@/assets/OffLineImg'

interface StreamerViewProps {
    call: Call
    username: string | undefined
}

export const StreamerView = (props: StreamerViewProps) => {
    const [isGoLiveModalOpen, setIsGoLiveModalOpen] = useState(false)
    const { useCameraState, useMicrophoneState, useScreenShareState, useParticipantCount, useIsCallLive, useParticipants } = useCallStateHooks()
    const { camera, isEnabled: isCamEnabled, devices, selectedDevice } = useCameraState()
    const { microphone, isEnabled: isMicEnabled } = useMicrophoneState()
    const isLive = useIsCallLive()
    const [firstParticipant] = useParticipants()

    const { screenShare, isEnabled: isScreenShareEnabled } = useScreenShareState()
    const participantCount = useParticipantCount()
    const { deviceList, selectedDeviceInfo } = useDeviceList(devices, selectedDevice)

    const handleStopLive = async () => {
        if (isLive) {
            await props.call.stopLive()
            if (props.username) {
                try {
                    const success = await deleteLivestream(props.username)
                    if (success) {
                        console.log('Successfully deleted livestream')
                    } else {
                        console.error('Failed to delete livestream')
                    }
                } catch (error) {
                    console.error('Error deleting livestream:', error)
                }
            } else {
                console.error('No current username found')
            }
        } else {
            setIsGoLiveModalOpen(true)
        }
    }

    return (
        <div className={styles.container}>
            {isGoLiveModalOpen && (
                <GoLiveModal
                    onClose={() => setIsGoLiveModalOpen(false)}
                    onGoLive={() => {
                        setIsGoLiveModalOpen(false)
                        props.call.goLive()
                    }}
                    onCancel={() => setIsGoLiveModalOpen(false)}
                />
            )}
            <div className={styles.displayLayout}>
                <div className={styles.isLive}>{isLive ? 'Online' : 'Offline'}</div>
                {firstParticipant ? (
                    <ParticipantView
                        trackType={isScreenShareEnabled ? 'screenShareTrack' : 'videoTrack'}
                        VideoPlaceholder={() => (
                            <div className={styles.placeholder}>
                                <OffLineImg />
                            </div>
                        )}
                        participant={firstParticipant}
                    />
                ) : (
                    <div className={styles.placeholder}>The host has not joined the call</div>
                )}
                <div className={styles.controls}>
                    {/* <div>Participant count: {participantCount}</div> */}
                    <Button color="disabled" text={isLive ? 'Stop Live' : 'Go Live'} onClick={handleStopLive} />
                    <Button color="primary" text={isCamEnabled ? 'Disable Camera' : 'Enable Camera'} onClick={() => camera.toggle()} />
                    <Button color="primary" text={isMicEnabled ? 'Mute' : 'Unmute'} onClick={() => microphone.toggle()} />
                </div>
            </div>
            {/* <section className={styles.section}>
                <h2>Devices</h2>
                <div className={styles.buttonGroup}>
                    {deviceList.map((device, index) => (
                        <Button key={`${device.deviceId}-${index}`} text={device.label} onClick={async () => camera.select(device.deviceId)} />
                    ))}
                </div>
            </section> */}
        </div>
    )
}
