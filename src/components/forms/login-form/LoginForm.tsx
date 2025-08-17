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
    onForgotPwdClick: () => void
}

export const LoginForm = (props: ILoginFormProps) => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState<LoginError>({})
    const [respMsg, setRespMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        setErrorMsg({})
        // setRespMsg('')
        const formErrors = validateLogin(formData)
        if (Object.keys(formErrors).length > 0) {
            setErrorMsg(formErrors)
            return
        }

        props.onLoadingChange(true)
        const res = await signIn(formData)
        if (res.success) {
            router.push('/account')
            props.onClose()
        } else {
            setRespMsg(res.message)
        }
        props.onLoadingChange(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input errorMsg={errorMsg.email} label="Email" id="email" name="email" autocomplete="email" />
            <div className={styles.passwordWrapper}>
                <Input errorMsg={errorMsg.password} label="Password" type="password" id="password" name="password" autocomplete="current-password" />
                <span onClick={props.onForgotPwdClick}>Forgot password?</span>
            </div>
            <ErrorMessage message={respMsg} />
            <Button text="Log In" color="primary" type="submit" />
        </form>
    )
}
