import { redirect } from 'next/navigation'
// import AccountForm from "./account-form";
import { createClient } from '../../utils/supabase/server'

export default async function Account() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (!data.user || error) {
        redirect('/')
    }

    return (
        <div>
            <h1 style={{ color: 'red', fontSize: '100px' }}> Avcoungt</h1>
        </div>
    )
}
