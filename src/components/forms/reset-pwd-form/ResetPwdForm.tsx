'use client'
import styles from './ResetPwdForm.module.scss'
import { useState } from 'react'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import { resetPassword } from '@/actions/auth'
import { ResetPwdError, validateResetPwd } from '@/utils/validator'
import { ErrorMessage } from '@/components/error-message/ErrorMessage'
import { useRouter } from 'next/navigation'

interface IResetPwdFormProps {
    onLoadingChange: (isLoading: boolean) => void
    onClose: () => void
    code: string
}

export const ResetPwdForm = ({ onLoadingChange, onClose, code }: IResetPwdFormProps) => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState<ResetPwdError>({})
    const [respMsg, setRespMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        setErrorMsg({})
        // setRespMsg('')
        const formErrors = validateResetPwd(formData)
        if (Object.keys(formErrors).length > 0) {
            setErrorMsg(formErrors)
            return
        }

        onLoadingChange(true)
        const res = await resetPassword(formData, code)
        if (res.success) {
            onClose()
            router.push('/')
        } else {
            setRespMsg(res.message)
        }
        onLoadingChange(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                errorMsg={errorMsg.newPassword}
                label="New Password"
                type="password"
                id="new-password"
                name="newPassword"
                autocomplete="current-password"
            />
            <Input
                errorMsg={errorMsg.confirmPassword}
                label="Confirm Password"
                type="password"
                id="confirm-password"
                name="confirmPassword"
                autocomplete="current-password"
            />
            <ErrorMessage message={respMsg} />
            <div className={styles.btnWrapper}>
                <Button text="Set new password" color="primary" type="submit" />
            </div>
        </form>
    )
}
