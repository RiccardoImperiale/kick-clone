'use client'
import { useState } from 'react'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { SignUpError } from '@/utils/validator'
import { ErrorMessage } from '@/components/error-message/ErrorMessage'
import { createLivestream } from '@/actions/livestreams'

interface INewLivestreamFormProps {
    username: string
    onLoadingChange: (isLoading: boolean) => void
    onGoLive: () => void
    onCancel: () => void
    onClose: () => void
}

export const NewLivestreamForm = (props: INewLivestreamFormProps) => {
    const [errorMsg, setErrorMsg] = useState<SignUpError>({})
    const [respMsg, setRespMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        props.onLoadingChange(true)
        const res = await createLivestream(formData, props.username)
        if (res.success) {
            props.onClose()
            props.onGoLive()
        } else {
            setRespMsg(res.message || '')
        }

        props.onLoadingChange(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input id="title" label="Title" name="title" autocomplete="title" />
            <ErrorMessage message={respMsg} />
            <Button text="Go Live" color="primary" type="submit" />
        </form>
    )
}
