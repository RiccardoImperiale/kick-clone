'use client'
import { useState } from 'react'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { SignUpError } from '@/utils/validator'
import { ErrorMessage } from '@/components/error-message/ErrorMessage'
import { Category } from '@/lib/types'
import { createStreamer } from '@/actions/streamers'
import { NewStreamer } from '@/lib/apiTypes'
import router from 'next/router'
import { AppRoutes } from '@/settings/AppRoutes'

interface INewStreamerFormProps {
    username: string
    userId: string
    categories: Category[]
    onLoadingChange: (isLoading: boolean) => void
    onClose: () => void
}

export const NewStreamerForm = (props: INewStreamerFormProps) => {
    const [errorMsg, setErrorMsg] = useState<SignUpError>({})
    const [respMsg, setRespMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        setErrorMsg({})
        // setRespMsg('')
        // const formErrors = validateNewStreamer(formData)
        // if (Object.keys(formErrors).length > 0) {
        //     setErrorMsg(formErrors)
        //     return
        // }

        // TODO
        const payload: NewStreamer = {
            username: formData.get('username') as string,
            profile_image_url: '/avatar.jpeg',
        }

        props.onLoadingChange(true)
        const res = await createStreamer(payload, props.userId)
        if (res.success) {
            props.onClose()
            router.push(AppRoutes.channel)
        } else {
            setRespMsg(res.message || '')
        }

        props.onLoadingChange(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input id="username" label="Username" name="username" value={props.username} errorMsg={errorMsg.username} autocomplete="username" />
            <ErrorMessage message={respMsg} />
            <Button text="Confirm" color="primary" type="submit" />
        </form>
    )
}
