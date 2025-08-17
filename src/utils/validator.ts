import { z } from 'zod'

export const passwordRegex = /^(?=.*[0-9])(?=.*[!?@#$%-_^&*])[a-zA-Z0-9!?-@_#$%^&*]{8,50}$/

export const SignUpSchema = z.object({
    email: z.email('Invalid email address.'),
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    password: z.string().regex(passwordRegex, 'Password must be min 8 characters, 1 special character, 1 number'),
})

export const ResetPwdSchema = z
    .object({
        newPassword: z.string().regex(passwordRegex, 'Password must be min 8 characters, 1 special character, 1 number'),
        confirmPassword: z.string(),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export interface SignUpError {
    email?: string
    username?: string
    password?: string
}

export interface LoginError {
    email?: string
    password?: string
}

export interface ResetPwdError {
    newPassword?: string
    confirmPassword?: string
}

export const validateSignUp = (formData: FormData) => {
    const formErrors: SignUpError = {}

    const email = formData.get('email') as string | null
    const username = formData.get('username') as string | null
    const password = formData.get('password') as string | null

    if (!email) formErrors.email = 'Email required'

    if (!username) {
        formErrors.username = 'Username required'
    } else if (username.length < 3) {
        formErrors.username = 'Username must be at least 3 characters long'
    }

    if (!password) {
        formErrors.password = 'Password required'
    } else if (!passwordRegex.test(password)) {
        formErrors.password = 'Password must be min 8 characters, 1 special character, 1 number'
    }

    return formErrors
}

export const validateLogin = (formData: FormData) => {
    const formErrors: LoginError = {}

    if (!formData.get('email')) formErrors.email = 'Email required'
    if (!formData.get('password')) formErrors.password = 'Password required'

    return formErrors
}

export const validateResetPwd = (formData: FormData) => {
    const formErrors: ResetPwdError = {}

    const password = formData.get('newPassword') as string | null
    const confirmPassword = formData.get('confirmPassword') as string | null

    if (!password) {
        formErrors.newPassword = 'Password required'
    } else if (!passwordRegex.test(password)) {
        formErrors.newPassword = 'Password must be min 8 characters, 1 special character, 1 number'
    }

    if (!confirmPassword) {
        formErrors.confirmPassword = 'Password required'
    } else if (password !== confirmPassword) {
        formErrors.confirmPassword = 'Passwords do not match'
    }

    return formErrors
}
