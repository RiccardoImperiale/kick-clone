'use client'
import { useState } from 'react'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { Checkbox } from '@/components/checkbox/Checkbox'
import { signup } from '@/actions/auth-actions'
import { SignUpError, validateSignUp } from '../../../utils/validator'
import { ErrorMessage } from '@/components/error-message/ErrorMessage'
import { useRouter } from 'next/navigation'

interface ISignUpFormProps {
    onLoadingChange: (isLoading: boolean) => void
    onClose: () => void
}

export const SignUpForm = ({ onLoadingChange, onClose }: ISignUpFormProps) => {
    const router = useRouter()
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
        const res = await signup(formData)
        if (res.success) {
            router.push('/account')
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

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const formData = new FormData()
//     // formData.append('email', email)
//     // formData.append('username', username)
//     // formData.append('password', password)

//     // const formErrors = validateSignUp({ email, username, password })
//     // if (Object.keys(formErrors).length > 0) {
//     //     setErrorMsg(formErrors)
//     //     return
//     // }

//     // setErrorMsg({})
//     onLoadingChange(true)
//     const res = await signup(formData)
//     if (res.status === 'success') {
//         router.push('/')
//     } else {
//         setRespMsg(res.status)
//     }
//     onLoadingChange(false)

//     // try {
//     //     console.log(res)

//     //     if (!res.success) {
//     //         setErrorMsg(res.errors || {})
//     //         return
//     //     }

//     //     onClose()
//     //     // router.push('/error')
//     // } catch (err) {
//     //     setErrorMsg({ general: 'Unexpected error. Please try again.' })
//     // } finally {
//     //     onLoadingChange(false)
//     // }
// }
