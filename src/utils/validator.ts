import { z } from 'zod'

export const passwordRegex = /^(?=.*[0-9])(?=.*[!?@#$%-_^&*])[a-zA-Z0-9!?-@_#$%^&*]{8,50}$/

export const SignUpSchema = z.object({
    email: z.email('Invalid email address.'),
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    password: z.string().regex(passwordRegex, 'Password must be min 8 characters, 1 special character, 1 number'),
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

export const validateSignUp = (formData: SignUpError) => {
    const formErrors: SignUpError = {}

    if (!formData.email) formErrors.email = 'Email required'

    if (!formData.username) {
        formErrors.username = 'Username required'
    } else if (formData.username.length < 3) {
        formErrors.username = 'Username must be at least 3 characters long'
    }

    if (!formData.password) {
        formErrors.password = 'Password required'
    } else if (!passwordRegex.test(formData.password)) {
        formErrors.password = 'Password must be min 8 characters, 1 special character, 1 number'
    }

    return formErrors
}

export const validateLogin = (formData: LoginError) => {
    const formErrors: LoginError = {}

    if (!formData.email) formErrors.email = 'Email required'
    if (!formData.password) formErrors.password = 'Password required'

    return formErrors
}
