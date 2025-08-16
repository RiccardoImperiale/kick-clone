'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { SignUpSchema } from '../utils/validator'

export async function signup(formData: FormData) {
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

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
            data: {
                username: payload.username,
            },
        },
    })

    if (signUpError) {
        return { success: false, message: signUpError?.message }
    } else if (signUpData?.user?.identities?.length === 0) {
        return {
            success: false,
            message: 'User already exists',
        }
    }

    revalidatePath('/', 'layout')
    return { success: true, message: '' }
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}
