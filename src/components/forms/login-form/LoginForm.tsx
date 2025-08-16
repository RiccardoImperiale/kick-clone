'use client'
import { useState } from 'react'
import styles from './LoginForm.module.scss'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { signIn } from '@/actions/auth'
import { LoginError, validateLogin } from '@/utils/validator'
import { ErrorMessage } from '@/components/error-message/ErrorMessage'
import { useRouter } from 'next/navigation'

interface ILoginFormProps {
    onLoadingChange: (isLoading: boolean) => void
    onClose: () => void
}

export const LoginForm = ({ onLoadingChange, onClose }: ILoginFormProps) => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState<LoginError>({})
    const [respMsg, setRespMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setErrorMsg({})
        setRespMsg('')
        const formErrors = validateLogin({ email, password })
        if (Object.keys(formErrors).length > 0) {
            setErrorMsg(formErrors)
            return
        }

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        onLoadingChange(true)
        const res = await signIn(formData)
        if (res.success) {
            router.push('/account')
            onClose()
        } else {
            setRespMsg(res.message)
        }
        onLoadingChange(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input errorMsg={errorMsg.email} label="Email" id="email" setValue={setEmail} value={email} autocomplete="email" />
            <div className={styles.passwordWrapper}>
                <Input
                    errorMsg={errorMsg.password}
                    label="Password"
                    type="password"
                    id="password"
                    setValue={setPassword}
                    value={password}
                    autocomplete="current-password"
                    name="password"
                />
                <span>Forgot password?</span>
            </div>
            <ErrorMessage message={respMsg} />
            <Button text="Log In" color="primary" type="submit" />
        </form>
    )
}
