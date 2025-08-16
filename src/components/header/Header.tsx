import styles from './Header.module.scss'
import { createClient } from '@/utils/supabase/server'
import { Navbar } from '@/components/navbar/Navbar'

export const Header = async () => {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()

    return (
        <header className={styles.header}>
            <Navbar user={data.user} />
        </header>
    )
}
