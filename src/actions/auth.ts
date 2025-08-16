'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { SignUpSchema } from '@/utils/validator'

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

    revalidatePath('/', 'layout')
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

    // TODO create a use instace in profiles table
    revalidatePath('/', 'layout')
    return { success: true, message: '' }
}

export async function signOut() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    revalidatePath('/', 'layout')

    if (error) return { success: false }
    return { success: true }
}
