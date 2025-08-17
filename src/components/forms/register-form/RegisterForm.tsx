'use client'
import { useState } from 'react'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { Checkbox } from '@/components/checkbox/Checkbox'
import { signUp } from '@/actions/auth'
import { SignUpError, validateSignUp } from '@/utils/validator'
import { ErrorMessage } from '@/components/error-message/ErrorMessage'

interface ISignUpFormProps {
    onLoadingChange: (isLoading: boolean) => void
    onClose: () => void
}

export const RegisterForm = (props: ISignUpFormProps) => {
    const [errorMsg, setErrorMsg] = useState<SignUpError>({})
    const [respMsg, setRespMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        setErrorMsg({})
        // setRespMsg('')
        const formErrors = validateSignUp(formData)
        if (Object.keys(formErrors).length > 0) {
            setErrorMsg(formErrors)
            return
        }

        props.onLoadingChange(true)
        const res = await signUp(formData)
        if (res.success) {
            props.onClose()
        } else {
            if (res.zErrors) {
                setErrorMsg(res.zErrors)
            } else {
                setRespMsg(res.message)
            }
        }
        props.onLoadingChange(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input id="email" label="Email" name="email" type="email" errorMsg={errorMsg.email} autocomplete="email" />
            <Input id="username" label="Username" name="username" errorMsg={errorMsg.username} autocomplete="username" />
            <Input id="password" label="Password" type="password" name="password" errorMsg={errorMsg.password} autocomplete="new-password" />
            <Checkbox name="newsletter" value="true" label="Subscribe to newsletter" />
            <ErrorMessage message={respMsg} />
            <Button text="Sign Up" color="primary" type="submit" />
        </form>
    )
}
