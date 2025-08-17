import styles from './page.module.scss'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AppRoutes } from '@/settings/AppRoutes'

export default async function Account() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (!data.user || error) {
        redirect(AppRoutes.home)
    }

    return <div className={styles.pageLayout}>account</div>
}
