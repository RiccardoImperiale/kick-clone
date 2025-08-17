'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { ResetPwdSchema, SignUpSchema } from '@/utils/validator'
import { headers } from 'next/headers'
import { AppRoutes } from '@/settings/AppRoutes'

export async function signUp(formData: FormData) {
    const supabase = await createClient()

    const payload = {
        email: formData.get('email') as string,
        username: formData.get('username') as string,
        password: formData.get('password') as string,
    }

    const validation = SignUpSchema.safeParse(payload)
    if (!validation.success) {
        const zErrors = Object.fromEntries(validation.error.issues.map(issue => [issue.path[0], issue.message]))
        return { success: false, message: '', zErrors }
    }

    const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
            data: {
                username: payload.username,
            },
        },
    })

    if (error) {
        return { success: false, message: error?.message }
    } else if (data?.user?.identities?.length === 0) {
        return {
            success: false,
            message: 'User already exists',
        }
    }

    revalidatePath(AppRoutes.home, 'layout')
    return { success: true, message: '' }
}

export async function signIn(formData: FormData) {
    const supabase = await createClient()

    const payload = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data, error } = await supabase.auth.signInWithPassword(payload)

    if (error) {
        return { success: false, message: error?.message }
    }

    const { data: existingUser } = await supabase.from('profiles').select('*').eq('email', payload?.email).single()

    if (!existingUser) {
        const { error: insertError } = await supabase.from('profiles').insert({
            email: data?.user.email,
            username: data?.user.user_metadata.username,
        })

        if (insertError) {
            return { success: false, message: insertError?.message }
        }
    }

    revalidatePath(AppRoutes.home, 'layout')
    return { success: true, message: '' }
}

export async function signOut() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    revalidatePath(AppRoutes.home, 'layout')

    if (error) return { success: false }
    return { success: true }
}

export async function forgotPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const origin = (await headers()).get('origin')

    const { data: profile, error: profileError } = await supabase.from('profiles').select('id').eq('email', email).single()

    if (!profile || profileError) {
        return { success: false, message: "We can't find a user with that email address." }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(formData.get('email') as string, {
        redirectTo: `${origin}?reset=password`,
    })

    if (error) return { success: false, message: error?.message }
    return { success: true, message: '' }
}

export async function resetPassword(formData: FormData, code: string) {
    const supabase = await createClient()

    const payload = {
        newPassword: formData.get('newPassword') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    }

    const validation = ResetPwdSchema.safeParse(payload)
    if (!validation.success) {
        const zErrors = Object.fromEntries(validation.error.issues.map(issue => [issue.path[0], issue.message]))
        return { success: false, message: '', zErrors }
    }

    const { error: codeError } = await supabase.auth.exchangeCodeForSession(code)

    if (codeError) {
        return { success: false, message: codeError.message }
    }

    const { error } = await supabase.auth.updateUser({
        password: formData.get('newPassword') as string,
    })

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true, message: '' }
}

// export async function verifyOtp(formData: FormData) {
//     const supabase = await createClient()
//     const email = formData.get('email') as string
//     const token = formData.get('token') as string

//     const { error } = await supabase.auth.verifyOtp({
//         email,
//         token,
//         type: 'recovery',
//     })

//     if (error) return { success: false, message: error?.message }
//     return { success: true, message: '' }
// }
