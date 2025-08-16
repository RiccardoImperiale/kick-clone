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

export const RegisterForm = ({ onLoadingChange, onClose }: ISignUpFormProps) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState<SignUpError>({})
    const [respMsg, setRespMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setErrorMsg({})
        setRespMsg('')
        const formErrors = validateSignUp({ email, username, password })
        if (Object.keys(formErrors).length > 0) {
            setErrorMsg(formErrors)
            return
        }

        const formData = new FormData()
        formData.append('email', email)
        formData.append('username', username)
        formData.append('password', password)

        onLoadingChange(true)
        const res = await signUp(formData)
        if (res.success) {
            onClose()
        } else {
            if (res.zErrors) {
                setErrorMsg(res.zErrors)
            } else {
                setRespMsg(res.message)
            }
        }
        onLoadingChange(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input id="email" label="Email" value={email} setValue={setEmail} errorMsg={errorMsg.email} autocomplete="email" />
            <Input id="username" label="Username" value={username} setValue={setUsername} errorMsg={errorMsg.username} autocomplete="username" />
            <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                setValue={setPassword}
                errorMsg={errorMsg.password}
                autocomplete="new-password"
            />
            <Checkbox name="newsletter" value="true" label="Subscribe to newsletter" />
            <ErrorMessage message={respMsg} />
            <Button text="Sign Up" color="primary" type="submit" />
        </form>
    )
}
