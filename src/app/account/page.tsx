import styles from './page.module.scss'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LogoutForm } from '@/components/forms/logout-form/LogoutForm'

export default async function Account() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (!data.user || error) {
        redirect('/')
    }

    return (
        <div className={styles.pageLayout}>
            <LogoutForm />
        </div>
    )
}
