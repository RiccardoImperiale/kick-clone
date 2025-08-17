'use client'
import { useEffect, useState } from 'react'
import styles from './ForgotPwdForm.module.scss'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { forgotPassword } from '@/actions/auth'
import { ErrorMessage } from '@/components/error-message/ErrorMessage'
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon'

interface IForgotPwdFormProps {
    onLoadingChange: (isLoading: boolean) => void
    onGoBack: () => void
}

const COOLDOWN_TIME = 60

export const ForgotPwdForm = ({ onLoadingChange, onGoBack }: IForgotPwdFormProps) => {
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [respMsg, setRespMsg] = useState('')
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setErrorMsg('')
        setRespMsg('')
        const formData = new FormData(e.currentTarget)

        if (!formData.get('email')) {
            setErrorMsg('Please enter your email')
            return
        }

        onLoadingChange(true)
        const res = await forgotPassword(formData)
        if (res.success) {
            setIsEmailSent(true)
            setCooldown(COOLDOWN_TIME)
        } else {
            setRespMsg(res.message)
        }
        onLoadingChange(false)
    }

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => {
                setCooldown(cooldown - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [cooldown])

    const resendEmail = async () => {
        setRespMsg('')
        const formData = new FormData()
        formData.append('email', email)
        onLoadingChange(true)
        const res = await forgotPassword(formData)
        if (res.success) {
            setCooldown(COOLDOWN_TIME)
        } else {
            setRespMsg(res.message)
        }
        onLoadingChange(false)
    }

    const title = isEmailSent ? 'Reset Password' : 'Forgot Password?'
    const subtitleMessage = isEmailSent ? 'Email with reset link has been sent to' : 'Please provide your email to reset your password'

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.iconBox} onClick={onGoBack}>
                        <ArrowLeftIcon width={16} height={16} />
                    </div>
                    <div className={styles.title}>{title}</div>
                </div>
                <p className={styles.subtitle}>{subtitleMessage}</p>
            </div>
            {isEmailSent ? (
                <>
                    <div className={styles.email}>{email}</div>
                    <p className={styles.noCode}>Didn&apos;t receive a code?</p>
                </>
            ) : (
                <Input errorMsg={errorMsg} name="email" setValue={setEmail} label="Email" id="email" autocomplete="email" />
            )}
            <ErrorMessage message={respMsg} />
            <div className={styles.btnWrapper}>
                {isEmailSent ? (
                    <Button
                        text={cooldown > 0 ? `Send Again (in ${cooldown}s)` : 'Send Again'}
                        color={cooldown > 0 ? 'disabled' : 'primary'}
                        onClick={resendEmail}
                    />
                ) : (
                    <Button text="Reset Password" color="primary" />
                )}
            </div>
        </form>
    )
}
